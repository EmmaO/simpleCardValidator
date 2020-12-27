import {ILongCardNumberValidator} from '../../services/cardValidation/longCardNumberValidation/longCardNumberValidator';
import {CardDetailsValidator} from '../../services/cardValidation/cardDetailsValidator';
import {IExpiryDateValidator} from '../../services/cardValidation/expiryDateValidation/expiryDateValidator';
import {Fixture, FixtureTypes} from '../fixture/fixture';
import CreditCardDetails from '../../services/cardValidation/creditCardDetails';

const fixture = new Fixture();

const expiryDateValidator : IExpiryDateValidator = {
  validateExpiryDate: jest.fn((expiryMonth, expiryYear) => {
    return {
      passedValidation: true,
      errors: [],
    };
  }),
};

const longCardNumberValidator : ILongCardNumberValidator = {
  validateLongCardNumber: jest.fn((cardNumber : string) => {
    return {
      passedValidation: true,
      errors: [],
    };
  }),
};

const cardDetailsValidator = new CardDetailsValidator(longCardNumberValidator, expiryDateValidator);

describe('validateCreditCardDetails', () => {
  test('when both validators pass validation returns pass result', () => {
    // arrange
    longCardNumberValidator.validateLongCardNumber = jest.fn((longCardNumber) => {
      return {
        passedValidation: true,
        errors: [],
      }
    });

    expiryDateValidator.validateExpiryDate = jest.fn((expiryMonth, expiryYear) => {
      return {
        passedValidation: true,
        errors: [],
      };
    });

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
    const longCardError = fixture.create(FixtureTypes.string) as string;
    longCardNumberValidator.validateLongCardNumber = jest.fn((longCardNumber) => {
      return {
        passedValidation: false,
        errors: [longCardError],
      }
    });

    expiryDateValidator.validateExpiryDate = jest.fn((expiryMonth, expiryYear) => {
      return {
        passedValidation: true,
        errors: [],
      };
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
    longCardNumberValidator.validateLongCardNumber = jest.fn((longCardNumber) => {
      return {
        passedValidation: true,
        errors: [],
      }
    });

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
