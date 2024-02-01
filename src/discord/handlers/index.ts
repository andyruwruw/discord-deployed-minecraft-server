// Local Exports
import { ErrorHandler as ErrorHandlerClass } from './error-handler';
import { InteractionHandler as InteractionHandlerClass } from './interaction-handler';
import { MessageCreateHandler as MessageCreateHandlerClass } from './message-create-handler';
import { ReadyHandler as ReadyHandlerClass } from './ready-handler';

export const ErrorHandler = new ErrorHandlerClass();
export const InteractionHandler = new InteractionHandlerClass();
export const MessageCreateHandler = new MessageCreateHandlerClass();
export const ReadyHandler = new ReadyHandlerClass();
