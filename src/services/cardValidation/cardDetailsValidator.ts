import CreditCardDetails from './creditCardDetails';
import ValidationResult from './validationResult';
import {inject, injectable} from 'inversify';
import SERVICE_IDENTIFIERS from '../../config/serviceIdentifiers';
import {ILongCardNumberValidator} from './longCardNumberValidation/longCardNumberValidator';
import {IExpiryDateValidator} from './expiryDateValidation/expiryDateValidator';

export interface ICardDetailsValidator {
  validateCreditCardDetails(creditCardDetails : CreditCardDetails) : ValidationResult;
};

@injectable()
/**
 * Used to validate credit card details
 */
export class CardDetailsValidator implements ICardDetailsValidator {
  private _longCardNumberValidator: ILongCardNumberValidator;
  private _expiryDateValidator: IExpiryDateValidator;

  /**
   * @param {ILongCardNumberValidator} longCardNumberValidator service for validating the long card number
   * @param {IExpiryDateValidator} expiryDateValidator service for validating the expiry date
   */
  public constructor(
    @inject(SERVICE_IDENTIFIERS.LONG_CARD_NUMBER_VALIDATOR) longCardNumberValidator : ILongCardNumberValidator,
    @inject(SERVICE_IDENTIFIERS.EXPIRY_DATE_VALIDATOR) expiryDateValidator : IExpiryDateValidator,
  ) {
    this._longCardNumberValidator = longCardNumberValidator;
    this._expiryDateValidator = expiryDateValidator;
  }


  /**
   * Validates the submitted credit card details
   * @param {CreditCardDetails} creditCardDetails the user submitted credit card details
   * @return {ValidationResult} result indicating whether the credit card details are valid
   */
  public validateCreditCardDetails(creditCardDetails: CreditCardDetails): ValidationResult {
    const longCardNumberValidationResult =
      this._longCardNumberValidator.validateLongCardNumber(creditCardDetails.longCardNumber);

    const expiryDateValidationResult =
      this._expiryDateValidator.validateExpiryDate(creditCardDetails.expiryMonth, creditCardDetails.expiryYear);

    if (longCardNumberValidationResult.passedValidation && expiryDateValidationResult.passedValidation) {
      return {
        passedValidation: true,
        errors: [],
      };
    } else {
      const errors = longCardNumberValidationResult.errors.concat(expiryDateValidationResult.errors);

      return {
        passedValidation: false,
        errors: errors,
      };
    }
  }
}
