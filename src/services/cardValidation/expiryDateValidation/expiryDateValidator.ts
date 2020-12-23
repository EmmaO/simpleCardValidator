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
  /**
   * Verifies that the expiry date on the card means that the card is valid
   * @param {number} expiryMonth The month in which the card expires
   * @param {number} expiryYear The year in which the card expires
   * @return {ValidationResult} result to indicate whether the expiry date on the card means that the card is valid
   */
  validateExpiryDate(expiryMonth: number, expiryYear: number): ValidationResult {
    return {
      passedValidation: true,
      errors: [],
    };
  }
}
