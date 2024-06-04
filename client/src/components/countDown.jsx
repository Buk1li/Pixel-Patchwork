import Auth from '../utils/auth';
import {countDown} from '../utils/countDown';
import { useEffect, useState } from 'react';

const styles={
    countDown:{
        color: "white",
        textAlign: "center"
    }
}

export default function CountDown(){
    let [timer, setTimer] = useState("Loading...");
    
    // updates the timer every half second
    useEffect(() => {
        setInterval(() => {
            let time = countDown();
            if(!Auth.loggedIn()){
                setTimer("You must be logged in to place a pixel");
            }
            else if(time <= 0){
                setTimer("You may place a pixel");
            }
            else{
                setTimer(`You may place a pixel in ${time} seconds`);
            }
        }, 500)
    },[])

    
    return (
        <h2 style={styles.countDown}>{timer}</h2>
    )
}