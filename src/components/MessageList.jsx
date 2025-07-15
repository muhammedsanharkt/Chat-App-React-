function MessageList({ messages }) {
  return (
    <div className="mb-3">
      {messages.map(msg => (
        <div key={msg.id} className="border p-2 mb-1">
          {msg.text}
        </div>
      ))}
    </div>
  );
}

export default MessageList;
