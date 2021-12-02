// Packages
import { Client } from 'discord.js';
import { IGuild } from 'src/database/types';
import { connection as WebSocketConnection } from 'websocket';

// Local Imports
import { Database } from '../../database/database';
import { WebSocketMessageData } from '../types';

/**
 * The base class for all websocket callback.
 */
export class WebSocketCallback {
    /**
     * Name of the websocket response.
     */
    name: string;

    /**
     * Callback to run when response is called.
     */
    callback: Function;

    /**
     * Function for generating response.
     */
    response: Function | null;

    /**
     * Instantiates a websocket response.
     *
     * @param {string} name Name of the response.
     * @param {Function} callback Callback to run when response is called.
     */
    constructor(
        name: string,
        callback: Function,
        response: Function | null = null,
    ) {
        this.name = name;
        this.callback = callback;
        this.response = response;
    }

    /**
     * Executes websocket response callback.
     *
     * @param {Message} message The message that was sent.
     * @param {Client} client The Discord bot client.
     * @param {WebSocketConnection} connection Connection to guild's server.
     * @param {IGuild} guild Guild object.
     */
    async execute(
        message: WebSocketMessageData,
        client: Client,
        connection: WebSocketConnection,
        guild: IGuild,
    ): Promise<void> {
        this.callback(
            message,
            client,
            connection,
            guild,
        );
    }
}
