import { Command } from "./commands";

/**
 * Commands awaiting data from the server or user confirmation.s
 */
export class PendingCommand {
    command: Command;

    /**
     * Instantiates a new pending command.
     */
    constructor(
        command: Command,
    ) {
        this.command = command;
    }
}
