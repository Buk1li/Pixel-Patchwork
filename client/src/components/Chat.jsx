import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io();

const Chat = () => {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        const userName = prompt('What is your name?');
        setName(userName);
        socket.emit('new-user', userName);
    }, []);

    useEffect(() => {
        socket.on('chat-message', (data) => {
            setChat([...chat, `${data.name}: ${data.message}`]);
        });
        socket.on('user-connected', (name) => {
            setChat([...chat, `${name} connected`]);
        });
        socket.on('user-disconnected', (name) => {
            setChat([...chat, `${name} disconnected`]);
        });
    }, [chat]);

    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit('send-chat-message', message);
        setChat([...chat, `You: ${message}`]);
        setMessage('');
    };

    return (
        <div style={{ position: 'fixed', bottom: 0, left: 0, width: '300px', border: '1px solid #ccc', background: '#fff' }}>
            <div id="message-container">
                {chat.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <form id="send-container" onSubmit={sendMessage}>
                <input
                    type="text"
                    id="message-input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" id="send-button">Send</button>
            </form>
        </div>
    );
};

export default Chat;