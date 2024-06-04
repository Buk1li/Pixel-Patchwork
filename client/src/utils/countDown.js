import Auth from './auth';

const timeLimit = 30000;

function countDown(){
    if(!Auth.loggedIn()){
        return null;
    }

    const pixelTime = Auth.getProfile().data.lastUpdate + timeLimit;
    let waitTime = pixelTime - Date.now();
    return Math.round(waitTime / 1000);
}

export {timeLimit, countDown}