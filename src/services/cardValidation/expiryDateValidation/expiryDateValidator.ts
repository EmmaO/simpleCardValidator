import {ZonedDateTime, ZoneOffset} from '@js-joda/core';
import {injectable} from 'inversify';
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
   * Verifies that the expiry date on the card means that the card is valid
   * @param {number} expiryMonth The month in which the card expires
   * @param {number} expiryYear The year in which the card expires
   * @return {ValidationResult} result to indicate whether the expiry date on the card means that the card is valid
   */
  public validateExpiryDate(expiryMonth: number, expiryYear: number): ValidationResult {
    const cardExpiryStartOfMonth = ZonedDateTime.of(expiryYear, expiryMonth, 1, 0, 0, 0, 0, ZoneOffset.UTC);
    const cardExpiry = cardExpiryStartOfMonth.plusMonths(1);

    const now = ZonedDateTime.now();

    if (now.isAfter(cardExpiry)) {
      return {
        passedValidation: false,
        errors: ['Card has expired'],
      }
    }

    return {
      passedValidation: true,
      errors: [],
    };
  }
}
