// Initialize dictionary of active players
let activePlayers: { [username: string]: number} = {};

/**
 * Tracks the time a player logs in.
 *
 * @param {string} username Player's username.
 */ 
export const playerLogin = (username: string) => { 
    activePlayers[username]= Date.now();
};

/**
 * Removes a player from active players and records their time.
 *
 * @param {string} username Player's username.
 * @returns {number} The time the player was online.
 */
export const playerLogout = (username: string) => {
    if (username in activePlayers){
        const startTime = activePlayers[username];
        delete activePlayers[username]

        return Date.now() - startTime;
    }
    return 0;
}

/**
 * Get current playtime of user without stopping tracking them. 
 *
 * @param {string} username Player's username.
 * @returns {number} The time the player was online.
 */
export const getCurrentPlaytime = (username: string) => {
    return Date.now() - activePlayers[username];
}
