import React, { useState } from 'eact';

const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

const ChatThread = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    const username = user_list[Math.floor(Math.random() * user_list.length)];
    setMessages([...messages, { text: newMessage, username, likes: 0 }]);
    setNewMessage('');
  };

  return (
    <div className="chat-thread">
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <strong>{message.username}:</strong> {message.text} 
            <button onClick={() => setMessages(messages.map((m, i) => (i === index? {...m, likes: m.likes + 1 } : m)))}>
              Like ({message.likes})
            </button>
          </li>
        ))}
      </ul>
      <input value={newMessage} onChange={e => setNewMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatThread;
