import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';

import {COMMENTS} from '../utils/queries';

const Chat = ({socket}) => {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [name, setName] = useState('');
    const {loading, error, data} = useQuery(COMMENTS);

    if(!Auth.loggedIn()){
        return null;
    }

    useEffect(() => {
        if(data){
            let oldChat = [];
            for(let i = 0; i < data.comments.length; i++){
                oldChat.unshift(`${data.comments[i].commentAuthor}: ${data.comments[i].commentText}`)
            }
            setChat(oldChat);
        }
    }, [data])

    useEffect(() => {
        setName(Auth.getProfile().data.username);
        socket.emit('new-user', Auth.getProfile().data.username);
    },[])

    useEffect(() => {
        socket.on('chat-message', (data) => {
            setChat(chat => [...chat, `${data.name}: ${data.message}`])
        });
        socket.on('user-connected', (name) => {
            setChat(chat => [...chat, `${name} connected`]);
        });
        socket.on('user-disconnected', (name) => {
            setChat(chat => [...chat, `${name} disconnected`]);
        });
    }, []);

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