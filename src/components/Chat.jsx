import React, { useState, useEffect } from 'react';
import s from './Chat.module.css';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const userName = localStorage.getItem('userName') || 'You';  // Pegando o nome do usuário ou "You" como fallback

    useEffect(() => {
        const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
        setMessages(storedMessages);
    }, []);

    const handleSendMessage = () => {
        if (input.trim()) {
            const newMessage = { sender: userName, text: input.trim() };
            const updatedMessages = [...messages, newMessage];

            setMessages(updatedMessages);
            setInput('');

            localStorage.setItem('messages', JSON.stringify(updatedMessages));
        }
    };

    return (
        <div className={s.chatContainer}>
            <h3>Chat with Admin</h3>
            <div className={s.chatBox}>
                {messages.map((msg, index) => (
                    <p key={index}><strong>{msg.sender}:</strong> {msg.text}</p>
                ))}
            </div>
            <div className={s.chatInput}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chat;
