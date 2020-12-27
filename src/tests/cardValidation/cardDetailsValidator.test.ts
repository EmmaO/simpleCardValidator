import {ILongCardNumberValidator} from '../../services/cardValidation/longCardNumberValidation/longCardNumberValidator';
import {CardDetailsValidator} from '../../services/cardValidation/cardDetailsValidator';
import {IExpiryDateValidator} from '../../services/cardValidation/expiryDateValidation/expiryDateValidator';
import {Fixture, FixtureTypes} from '../fixture/fixture';
import CreditCardDetails from '../../services/cardValidation/creditCardDetails';

const fixture = new Fixture();

const expiryDateValidator : IExpiryDateValidator = {
  validateExpiryDate: null,
};

const longCardNumberValidator : ILongCardNumberValidator = {
  validateLongCardNumber: null,
};

const cardDetailsValidator = new CardDetailsValidator(longCardNumberValidator, expiryDateValidator);

describe('validateCreditCardDetails', () => {
  beforeEach(() => {
    setAllValidatorsToPass();
  })

  test('correct parameter passed to longCardNumber validator', () => {
    // arrange
    const longCardNumberMockCallback = jest.fn((longCardNumber) => {
      return {
        passedValidation: true,
        errors: [],
      }
    });

    longCardNumberValidator.validateLongCardNumber = longCardNumberMockCallback;

    const cardDetails = fixture.create(FixtureTypes.CreditCardDetails) as CreditCardDetails

    // act
    cardDetailsValidator.validateCreditCardDetails(cardDetails);

    // assert
    expect(longCardNumberMockCallback.mock.calls.length).toBe(1);
    expect(longCardNumberMockCallback.mock.calls[0][0]).toBe(cardDetails.longCardNumber);
  });

  test('correct parameters passed to expiry validator', () => {
    // arrange
    const expiryDateCallback = jest.fn((expiryMonth, expiryYear) => {
      return {
        passedValidation: true,
        errors: [],
      }
    });

    expiryDateValidator.validateExpiryDate = expiryDateCallback;

    const cardDetails = fixture.create(FixtureTypes.CreditCardDetails) as CreditCardDetails

    // act
    cardDetailsValidator.validateCreditCardDetails(cardDetails);

    // assert
    expect(expiryDateCallback.mock.calls.length).toBe(1);
    expect(expiryDateCallback.mock.calls[0][0]).toBe(cardDetails.expiryMonth);
    expect(expiryDateCallback.mock.calls[0][1]).toBe(cardDetails.expiryYear);
  });

  test('when both validators pass validation returns pass result', () => {
    // arrange
    setAllValidatorsToPass();

    // act
    const res = cardDetailsValidator.validateCreditCardDetails(
      fixture.create(FixtureTypes.CreditCardDetails) as CreditCardDetails,
    );

    // assert
    expect(res.passedValidation).toBeTruthy();
    expect(res.errors.length).toBe(0);
  });

  test('when long card number validation fails with one error, overall validation fails with correct error', () => {
    // arrange
    setAllValidatorsToPass();

    const longCardError = fixture.create(FixtureTypes.string) as string;
    longCardNumberValidator.validateLongCardNumber = jest.fn((longCardNumber) => {
      return {
        passedValidation: false,
        errors: [longCardError],
      }
    });

    // act
    const res = cardDetailsValidator.validateCreditCardDetails(
      fixture.create(FixtureTypes.CreditCardDetails) as CreditCardDetails,
    );

    // assert
    expect(res.passedValidation).toBeFalsy();
    expect(res.errors.length).toBe(1);
    expect(res.errors[0]).toBe(longCardError);
  });

  test('when expiry date validation fails with one error, overall validation fails with correct error', () => {
    // arrange
    setAllValidatorsToPass();

    const expiryError = fixture.create(FixtureTypes.string) as string;
    expiryDateValidator.validateExpiryDate = jest.fn((expiryMonth, expiryYear) => {
      return {
        passedValidation: false,
        errors: [expiryError],
      };
    });

    // act
    const res = cardDetailsValidator.validateCreditCardDetails(
      fixture.create(FixtureTypes.CreditCardDetails) as CreditCardDetails,
    );

    // assert
    expect(res.passedValidation).toBeFalsy();
    expect(res.errors.length).toBe(1);
    expect(res.errors[0]).toBe(expiryError);
  });

  test('when both validation checks fail, overall validation fails with two errors', () => {
    // arrange
    longCardNumberValidator.validateLongCardNumber = jest.fn((longCardNumber) => {
      return {
        passedValidation: false,
        errors: [fixture.create(FixtureTypes.string) as string],
      }
    });

    expiryDateValidator.validateExpiryDate = jest.fn((expiryMonth, expiryYear) => {
      return {
        passedValidation: false,
        errors: [fixture.create(FixtureTypes.string) as string],
      };
    });

    // act
    const res = cardDetailsValidator.validateCreditCardDetails(
      fixture.create(FixtureTypes.CreditCardDetails) as CreditCardDetails,
    );

    // assert
    expect(res.passedValidation).toBeFalsy();
    expect(res.errors.length).toBe(2);
  });
});

/**
 * Sets up all validators to pass inspection
 */
function setAllValidatorsToPass() {
  longCardNumberValidator.validateLongCardNumber = jest.fn((longCardNumber) => {
    return {
      passedValidation: true,
      errors: [],
    };
  });

  expiryDateValidator.validateExpiryDate = jest.fn((expiryMonth, expiryYear) => {
    return {
      passedValidation: true,
      errors: [],
    };
  });
}

