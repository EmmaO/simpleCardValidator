import {inject, injectable} from 'inversify';
import SERVICE_IDENTIFIERS from '../../../config/serviceIdentifiers';
import {ILogger} from '../../../services/logging/logger';
import ValidationResult from '../validationResult';

export interface ILongCardNumberValidator {
  validateLongCardNumber(cardNumber : string) : ValidationResult
};

@injectable()
/**
 * Validator for checking the long card number on a credit card
 */
export class LongCardNumberValidator implements ILongCardNumberValidator {
  private _logger: ILogger;

  /**
   * Creates an instance of LongCardNumberValidator.
   * @param {ILogger} logger
   */
  public constructor(@inject(SERVICE_IDENTIFIERS.LOGGER) logger : ILogger) {
    this._logger = logger;
  }

  /**
   * Verifies the the user has submitted a valid long card number
   * @param {string} cardNumber the long card number
   * @return {ValidationResult} result indicating whether the long card number is valid
   */
  public validateLongCardNumber(cardNumber: string): ValidationResult {
    let result : number = 0;

    const reversed = cardNumber.split('').reverse().join('');

    for (let i = 0; i < reversed.length; i += 2) {
      result += parseInt(reversed[i]);
      result += this.modulusDouble(reversed[i + 1]);
    }

    if (result % 10 == 0) {
      return {
        passedValidation: true,
        errors: [],
      };
    }

    this._logger.log('Invalid card number');

    return {
      passedValidation: false,
      errors: ['Invalid card number'],
    };
  }

  /**
   * Doubles a value before adding the individual digits that make up the doubled value together
   * Eg 7 => 14 => 1 + 4 => 5
   * Eg 3 => 6
   * @param {string} digit to double
   * @return {number} doubled value or
   */
  private modulusDouble(digit : string) : number {
    const doubled = parseInt(digit) * 2;

    return doubled % 10 + Math.trunc(doubled / 10);
  }
}
