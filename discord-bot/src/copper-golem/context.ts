export interface ContextObject {
    id: string;
    guildId: string;
    userId: string;
    isDm: boolean;
    channelId: string;
    args: Record<string, any>;
}

/**
 * Context of a command.
 */
export class Context {
    /**
     * Id of resolution response.
     */
    id: string;

    guildId: string;

    userId: string;

    isDm: boolean;

    channelId: string | null;

    args: Record<string, any>;

    /**
     * Instantiates context for the command.
     *
     * @param {string} guildId Id of guild.
     * @param {string} userId Id of user.
     * @param {string} channelId Id of the channel.
     */
    constructor(
        id: string,
        guildId: string,
        userId: string,
        isDm: boolean,
        channelId: string | null,
        args: Record<string, any> = {},
    ) {
        this.id = id;
        this.guildId = guildId;
        this.userId = userId;
        this.isDm = isDm;
        this.channelId = channelId;
        this.args = args;
    }

    /**
     * Generates context object.
     *
     * @returns Context object.
     */
    toObject() {
        return {
            id: this.id,
            guildId: this.guildId,
            userId: this.userId,
            isDm: this.isDm,
            channelId: this.channelId,
            args: this.args,
        };
    }
}
