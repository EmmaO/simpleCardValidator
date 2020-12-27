import {injectable} from 'inversify';

export interface ILogger {
  log(message : string) : void;
}

@injectable()
/**
 * Used for logging
 * @export
 * @class Logger
 * @implements {ILogger}
 */
export class Logger implements ILogger {
  /**
   * Logs the passed in message to the console
   * @param {string} message
   */
  public log(message : string) : void {
    console.log(message);
  }
}
