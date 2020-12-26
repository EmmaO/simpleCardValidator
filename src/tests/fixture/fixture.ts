/* eslint-disable no-unused-vars */
import {IllegalArgumentException, ZonedDateTime} from '@js-joda/core';

export enum FixtureTypes {
  ZonedDateTime,
  number
}

/**
 * Automates the arrange phase of unit tests
 */
export class Fixture {
  /**
   * Creates a ZonedDateTime with randomised values
   * @param {FixtureTypes} type type of object to retrieve
   * @return {any} pseudorandomised value
   */
  public create(type : FixtureTypes) : ZonedDateTime | number {
    if (type === FixtureTypes.ZonedDateTime) {
      return this.createZonedDateTime();
    } else if (type == FixtureTypes.number) {
      return this.createNumber();
    } else {
      throw new IllegalArgumentException('FixtureType not recognised')
    }
  }

  /**
   * Creates a zoned date time with random values
   * @private
   * @return {ZonedDateTime} Randomised ZonedDateTime
   */
  private createZonedDateTime() : ZonedDateTime {
    const secondsInDay = 86400;
    const forwardInTime = this.getRandom(0, 2) == 0;

    return ZonedDateTime
        .now()
        .plusDays(this.getRandom(0, 365 * 0) * (forwardInTime ? 1 : -1))
        .plusSeconds(this.getRandom(0, secondsInDay))
        .plusNanos(this.getRandom(0, 1000 * 1000 * 1000));
  }

  /**
   * Creates a random positive number
   *
   * @template T
   * @return {number} random positive number
   */
  private createNumber() : number {
    return this.getRandom(1, 10000)
  }

  /**
   * Creates a random number in range
   *
   * @private
   * @param {number} from inclusive
   * @param {number} to exclusive
   * @return {number} random value in range
   */
  private getRandom(from : number, to : number) : number {
    return (Math.floor(Math.random() * (to - from))) + from;
  }
}
