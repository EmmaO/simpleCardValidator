/* eslint-disable no-unused-vars */
import {IllegalArgumentException, ZonedDateTime} from '@js-joda/core';
import CreditCardDetails from '../../services/cardValidation/creditCardDetails';

export enum FixtureTypes {
  ZonedDateTime, /** Random date 20 years either side of now */
  CreditCardDetails, /** Random credit card details */
  number, /** Random number between 1 and 10000 */
  string /** Random string */
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
  public create(type : FixtureTypes) :
    ZonedDateTime |
    CreditCardDetails |
    number |
    string {
    if (type === FixtureTypes.ZonedDateTime) {
      return this.createZonedDateTime();
    } else if (type == FixtureTypes.number) {
      return this.createNumber();
    } else if (type == FixtureTypes.string) {
      return this.createString();
    } else if (type == FixtureTypes.CreditCardDetails) {
      return this.createCreditCardDetails();
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
        .plusDays(this.getRandom(0, 365 * 20) * (forwardInTime ? 1 : -1))
        .plusSeconds(this.getRandom(0, secondsInDay))
        .plusNanos(this.getRandom(0, 1000 * 1000 * 1000));
  }

  /**
   * Creates a random set of credit card details
   *
   * @private
   * @return {CreditCardDetails}
   */
  private createCreditCardDetails() : CreditCardDetails {
    let longCardNumber = '';
    for (let i = 0; i < 16; i++) {
      longCardNumber += this.getRandom(0, 10);
    }

    return {
      longCardNumber: longCardNumber,
      expiryMonth: this.getRandom(1, 13),
      expiryYear: this.getRandom(2000, 2050),
    };
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
   * Returns a randomised string
   * @private
   * @return {string}
   */
  private createString() : string {
    const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    let res = '';

    for (let i = 0; i < 40; i++) {
      res += charSet[this.getRandom(0, charSet.length)];
    }

    return res;
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
