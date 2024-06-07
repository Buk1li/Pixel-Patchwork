import React, { useState, useEffect, useRef } from 'react';
import Auth from '../utils/auth';
import {socket} from '../socket';
import { useQuery} from '@apollo/client';

import {COMMENTS} from '../utils/queries';

import {List, ListItemText, Divider, Collapse, Grid, TextField, Button} from '@mui/material';


const chatStyle ={
    backgroundColor: "#2d3e50",
    overflow: "auto",
    maxHeight: "500px",
    padding: "0rem"
}

const chatTabStyle={
    backgroundColor: "#2d3e50",
    padding: 0,
    alignItems: "center",
    justifyContent: "center"
}

const Chat = ({socket}) => {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [name, setName] = useState('');
    const [showChat, setShowChat] = useState(false);
    const scrollRef = useRef(null);
    const {loading, error, data} = useQuery(COMMENTS);

    if(!Auth.loggedIn()){
        return null;
    }

    useEffect(() => {
        if(data){
            let oldChat = [];
            for(let i = 0; i < data.comments.length; i++){
                oldChat.push(`${data.comments[i].commentAuthor}: ${data.comments[i].commentText}`)
            }
            oldChat.reverse();
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
        if(!message) return;
        socket.emit('send-chat-message', message);
        setChat([...chat, `You: ${message}`]);
        setMessage('');
    };

    //scrolls the chat down whenever a new message is added
    useEffect(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [chat, showChat]);

    const toggleChat = () =>{
        setShowChat(!showChat);
    }

    return (
        <div style={{ position: 'fixed', bottom: 0, left: 0, width: '300px', border: '1px solid #ccc', background: '#2d3e50' }}>
            <Button sx={{width: "100%", padding: 0, backgroundColor: "#2d3e50", color: "white"}} onClick={toggleChat}>{showChat ? "Close Chat": "Open Chat"}</Button>
            <List sx={chatStyle}>
                <Collapse in={showChat} timeout={0} onEntered={() => scrollRef.current.scrollIntoView({behavior: "instant"})}>
                    {chat.map((msg, index) => (
                        <div key={index}>
                            <ListItemText sx={{margin: "0.5rem"}}>{msg}</ListItemText>
                            <Divider></Divider>
                        </div>
                    ))}
                    <li ref={scrollRef}/>
                </Collapse>
            </List>
            <Grid container id="send-container" sx={chatTabStyle}>
                <Grid item xs={9}>
                    <TextField
                        sx={chatStyle}
                        id="message-input"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        size="small">
                    </TextField>
                </Grid>
                <Grid item xs={3}>
                    <Button sx={{backgroundColor: "#2d3e50", margin: "0.2rem", color:"white"}} onClick={sendMessage}>Send</Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default Chat;