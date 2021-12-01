// Packages
import { Client } from 'discord.js';
import { connection as WebSocketConnection } from 'websocket';

// Local Imports
import { Database } from '../../database/database';
import { WebSocketMessageData } from '../types';

/**
 * The base class for all websocket responses.
 */
export class WebSocketReponse {
    /**
     * Name of the websocket response.
     */
    name: string;

    /**
     * Callback to run when response is called.
     */
    callback: Function;

    /**
     * Instantiates a websocket response.
     *
     * @param {string} name Name of the response.
     * @param {Function} callback Callback to run when response is called.
     */
    constructor(
        name: string,
        callback: Function,
    ) {
        this.name = name;
        this.callback = callback;
    }

    /**
     * Executes websocket response callback.
     *
     * @param {Message} message The message that was sent.
     * @param {Client} client The Discord bot client.
     * @param {WebSocketConnection} connection Connection to guild's server.
     * @param {Database} database Connection to the bot's database.
     */
    async execute(
        message: WebSocketMessageData,
        client: Client,
        connection: WebSocketConnection,
        database: Database,
    ): Promise<void> {
        this.callback(
            message,
            client,
            connection,
            database,
        );
    }
}
