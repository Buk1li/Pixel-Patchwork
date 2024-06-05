import Auth from './auth';

const timeLimit = 3000;

// returns the time in seconds until another pixel can be placed.
// can return negative numbers
// returns null if no user is logged in
function countDown(){
    if(!Auth.loggedIn()){
        return null;
    }

    const pixelTime = Auth.getProfile().data.lastUpdate + timeLimit;
    let waitTime = pixelTime - Date.now();
    return Math.round(waitTime / 1000);
}

export {countDown}