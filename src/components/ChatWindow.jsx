import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { ref, push, onValue } from "firebase/database";
import { uploadToCloudinary } from "../utils/UploadToCloudinary";
import EmojiPicker from "emoji-picker-react"; // ✅ Emoji Picker

function ChatWindow({ currentUser: propUser }) {
  const { withUser } = useParams();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [preview, setPreview] = useState(null); // ✅ Local preview
  const [fullImage, setFullImage] = useState(null); // ✅ Full image view
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // ✅ Emoji picker toggle

  const currentUser = propUser || localStorage.getItem("currentUser");
  const chatId = [currentUser, withUser].sort().join("_");

  useEffect(() => {
    if (!currentUser || !withUser) return;

    const chatRef = ref(db, `chats/${chatId}`);
    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val() || {};
      const msgs = Object.values(data);
      msgs.sort((a, b) => a.timestamp - b.timestamp);
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [currentUser, withUser]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const chatRef = ref(db, `chats/${chatId}`);
    push(chatRef, {
      from: currentUser,
      to: withUser,
      text: text.trim(),
      timestamp: Date.now(),
    });

    setText("");
    setShowEmojiPicker(false);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview({ url: reader.result, file });
    };
    reader.readAsDataURL(file);
  };

  const handleUploadConfirm = async () => {
    if (!preview) return;

    try {
      const result = await uploadToCloudinary(preview.file);

      const chatRef = ref(db, `chats/${chatId}`);
      await push(chatRef, {
        from: currentUser,
        to: withUser,
        fileUrl: result.secure_url,
        fileName: preview.file.name,
        timestamp: Date.now(),
      });

      setPreview(null);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isImage = (fileName) => {
    return /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(fileName);
  };

  const handleEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="container-fluid h-100 position-relative">
      <div className="row h-100">
        <div className="col-12 col-md-8 col-lg-6 mx-auto">
          <div className="card h-100 shadow-sm">
            {/* Header */}
            <div className="card-header bg-primary text-white py-3">
              <div className="d-flex align-items-center">
                <div
                  className="rounded-circle bg-light text-primary d-flex align-items-center justify-content-center me-3"
                  style={{ width: "40px", height: "40px" }}
                >
                  <i className="fas fa-user"></i>
                </div>
                <div>
                  <h5 className="mb-0">Chat with {withUser}</h5>
                  <small className="text-light opacity-75">
                    <i
                      className="fas fa-circle text-success me-1"
                      style={{ fontSize: "0.5rem" }}
                    ></i>
                    Online
                  </small>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div
              className="card-body p-0 d-flex flex-column"
              style={{ height: "400px" }}
            >
              <div
                className="flex-grow-1 overflow-auto p-3"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                {messages.length === 0 ? (
                  <div className="text-center text-muted py-5">
                    <i
                      className="fas fa-comments mb-3"
                      style={{ fontSize: "3rem" }}
                    ></i>
                    <p>No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`d-flex mb-3 ${
                        msg.from === currentUser
                          ? "justify-content-end"
                          : "justify-content-start"
                      }`}
                    >
                      <div
                        className={`message-bubble ${
                          msg.from === currentUser
                            ? "own-message"
                            : "other-message"
                        }`}
                      >
                        <div className="message-content">
                          {msg.text && <p className="mb-1">{msg.text}</p>}

                          {msg.fileUrl && (
                            isImage(msg.fileName) ? (
                              <img
                                src={msg.fileUrl}
                                alt="Uploaded"
                                style={{
                                  maxWidth: "200px",
                                  borderRadius: "8px",
                                  cursor: "pointer",
                                }}
                                className="mb-1"
                                onClick={() => setFullImage(msg.fileUrl)}
                              />
                            ) : (
                              <a
                                href={msg.fileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="d-block mb-1 text-primary"
                              >
                                📎 {msg.fileName}
                              </a>
                            )
                          )}

                          <small className="message-time">
                            {formatTime(msg.timestamp)}
                          </small>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Input */}
              <div className="border-top p-3 bg-white position-relative">
                <form onSubmit={handleSend}>
                  <div className="input-group position-relative">
                    <input
                      type="text"
                      className="form-control border-0 shadow-none"
                      placeholder="Type your message..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      style={{ backgroundColor: "#f8f9fa" }}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                      😊
                    </button>
                    <button
                      className="btn btn-primary px-4"
                      type="submit"
                      disabled={!text.trim()}
                    >
                      <i className="fas fa-paper-plane"></i>
                    </button>

                    <input
                      type="file"
                      id="fileUpload"
                      onChange={handleFileUpload}
                      style={{ display: "none" }}
                    />
                    <label
                      htmlFor="fileUpload"
                      className="btn btn-outline-secondary ms-2"
                    >
                      <i className="fas fa-paperclip"></i>
                    </label>

                    {showEmojiPicker && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "60px",
                          zIndex: "10",
                        }}
                      >
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Local Image Preview */}
      {preview && (
        <div className="preview-overlay">
          <div className="preview-content">
            <img src={preview.url} alt="Preview" />
            <div className="mt-3">
              <button
                className="btn btn-primary me-2"
                onClick={handleUploadConfirm}
              >
                Send
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => setPreview(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Image View */}
      {fullImage && (
        <div className="preview-overlay">
          <div className="preview-content">
            <img src={fullImage} alt="Full View" />
            <div className="mt-3">
              <button
                className="btn btn-secondary"
                onClick={() => setFullImage(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`

        .message-content {
  font-family: "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", sans-serif;
}

        .message-bubble {
          max-width: 70%;
          padding: 12px 16px;
          border-radius: 18px;
          position: relative;
        }
        .own-message {
          background-color: #007bff;
          color: white;
          margin-left: auto;
        }
        .other-message {
          background-color: white;
          color: #333;
          border: 1px solid #e9ecef;
          margin-right: auto;
        }
        .message-content p {
          margin: 0;
          word-wrap: break-word;
        }
        .message-time {
          opacity: 0.7;
          font-size: 0.75rem;
        }
        .own-message .message-time {
          color: rgba(255, 255, 255, 0.8);
        }
        .other-message .message-time {
          color: #6c757d;
        }
        .preview-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .preview-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          max-width: 90%;
          max-height: 90%;
        }
        .preview-content img {
          max-width: 100%;
          max-height: 70vh;
        }
      `}</style>
    </div>
  );
}

export default ChatWindow;