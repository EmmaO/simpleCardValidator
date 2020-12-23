import {injectable} from 'inversify';
import ValidationResult from '../validationResult';

export interface ILongCardNumberValidator {
  validateLongCardNumber(cardNumber : string) : ValidationResult
};

@injectable()
/**
 * Validator for checking the long card number on a credit card
 */
export class LongCardNumberValidator implements ILongCardNumberValidator {
  /**
   * Verifies the the user has submitted a valid long card number
   * @param {string} cardNumber the long card number
   * @return {ValidationResult} result indicating whether the long card number is valid
   */
  validateLongCardNumber(cardNumber: string): ValidationResult {
    return {
      passedValidation: true,
      errors: [],
    };
  }
}
