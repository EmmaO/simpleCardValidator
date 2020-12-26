import {ZonedDateTime, ZoneOffset} from '@js-joda/core';
import {injectable} from 'inversify';
import DateTime from '../../../services/coreUtilities/dateTime';
import ValidationResult from '../validationResult';

export interface IExpiryDateValidator {
  validateExpiryDate(expiryMonth : number, expiryYear : number) : ValidationResult;
}

@injectable()
/**
 * Validator for the expiry date on a credit card
 */
export class ExpiryDateValidator implements IExpiryDateValidator {
  private _dateTime: any;

  /**
   * Creates an instance of ExpiryDateValidator.
   * @param {DateTime} dateTime
   */
  public constructor(dateTime : DateTime) {
    this._dateTime = dateTime;
  }

  /**
   * Verifies that the expiry date on the card means that the card is valid
   * @param {number} expiryMonth The month in which the card expires
   * @param {number} expiryYear The year in which the card expires
   * @return {ValidationResult} result to indicate whether the expiry date on the card means that the card is valid
   */
  public validateExpiryDate(expiryMonth: number, expiryYear: number): ValidationResult {
    const cardExpiryStartOfMonth = ZonedDateTime.of(expiryYear, expiryMonth, 1, 0, 0, 0, 0, ZoneOffset.UTC);
    const cardExpiry = cardExpiryStartOfMonth.plusMonths(1).plusDays(-1);

    const now = this._dateTime.now();

    if (now.isAfter(cardExpiry)) {
      return {
        passedValidation: false,
        errors: [],
      }
    }

    return {
      passedValidation: true,
      errors: [],
    };
  }
}
