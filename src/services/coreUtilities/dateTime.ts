import {ZonedDateTime} from '@js-joda/core';

/**
 * Wraps datetime functions
 */
export default class DateTime {
  /**
   * Returns the current date time
   * @return {ZonedDateTime} current date time
   */
  public now() : ZonedDateTime {
    return ZonedDateTime.now();
  }
}
