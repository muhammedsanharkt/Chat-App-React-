import { useState } from 'react';

function MessageInput({ addMessage }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addMessage(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex gap-2">
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        className="form-control"
        placeholder="Type a message..."
      />
      <button type="submit" className="btn btn-primary">
        Send
      </button>
    </form>
  );
}

export default MessageInput;
