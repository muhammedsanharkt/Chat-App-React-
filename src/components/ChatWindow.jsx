import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { ref, push, onValue } from "firebase/database";

function ChatWindow({ currentUser: propUser }) {
  const { withUser } = useParams();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  // Fallback: get from localStorage if needed
  const currentUser = propUser || localStorage.getItem('currentUser');

  useEffect(() => {
    if (!currentUser || !withUser) return;

    const chatId = [currentUser, withUser].sort().join("_");
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
    if (!text.trim() || !currentUser || !withUser) return;

    const chatId = [currentUser, withUser].sort().join("_");
    const chatRef = ref(db, `chats/${chatId}`);

    push(chatRef, {
      from: currentUser,
      to: withUser,
      text: text.trim(),
      timestamp: Date.now(),
    });

    setText("");
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <div className="col-12 col-md-8 col-lg-6 mx-auto">
          <div className="card h-100 shadow-sm">
            {/* Chat Header */}
            <div className="card-header bg-success text-white py-3">
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-light text-success d-flex align-items-center justify-content-center me-3" 
                     style={{ width: '40px', height: '40px' }}>
                  <i className="fas fa-user"></i>
                </div>
                <div>
                  <h5 className="mb-0">Chat with {withUser}</h5>
                  <small className="text-light opacity-75">
                    <i className="fas fa-circle text-success me-1" style={{ fontSize: '0.5rem' }}></i>
                    Online
                  </small>
                </div>
              </div>
            </div>

            {/* Messages Container */}
            <div className="card-body p-0 d-flex flex-column" style={{ height: '400px' }}>
              <div className="flex-grow-1 overflow-auto p-3" style={{ backgroundColor: '#f8f9fa' }}>
                {messages.length === 0 ? (
                  <div className="text-center text-muted py-5">
                    <i className="fas fa-comments mb-3" style={{ fontSize: '3rem' }}></i>
                    <p>No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`d-flex mb-3 ${msg.from === currentUser ? 'justify-content-end' : 'justify-content-start'}`}
                    >
                      <div className={`message-bubble ${msg.from === currentUser ? 'own-message' : 'other-message'}`}>
                        <div className="message-content">
                          <p className="mb-1">{msg.text}</p>
                          <small className="message-time">
                            {formatTime(msg.timestamp)}
                          </small>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Message Input */}
              <div className="border-top p-3 bg-white">
                <form onSubmit={handleSend}>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control border-0 shadow-none"
                      placeholder="Type your message..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      style={{ backgroundColor: '#f8f9fa' }}
                    />
                    <button 
                      className="btn btn-success px-4" 
                      type="submit"
                      disabled={!text.trim()}
                    >
                      <i className="fas fa-paper-plane"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .message-bubble {
          max-width: 70%;
          padding: 12px 16px;
          border-radius: 18px;
          position: relative;
        }
        
        .own-message {
          background-color: #022b58ff;
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

        /* Scrollbar styling */
        .overflow-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        .overflow-auto::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }
        
        .overflow-auto::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
    </div>
  );
}

export default ChatWindow;