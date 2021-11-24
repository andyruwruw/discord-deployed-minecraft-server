// Initialize dictionary of active players


let active_players: { [username: string]: number} = {};


// Add logged in players to the dictionary. 
export function playerLogin(username: string) { 
    // if this is true, something went wrong somewhere
    if(username in active_players) {
        delete active_players[username];
    }

    active_players[username]= Date.now();
}

// Delete player from dictionary once they log out
// Return time played in MS 
// If player somehow logs out without getting added to dictionary, return 0
export function playerLogout(username: string) {
    let timePlayed = 0
    if (username in active_players ){
        const startTime = active_players[username];
        delete active_players[username]
        timePlayed = Date.now() - startTime;
    
    }
    return timePlayed;  
}

// Get current playtime of user without removing them from dict
// Not sure how this would be used but might be good to have 
export function getCurrentPlaytime(username: string) {
    return Date.now() - active_players[username];
}

