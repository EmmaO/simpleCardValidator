import {LongCardNumberValidator} from '../../../services/cardValidation/longCardNumberValidation/longCardNumberValidator';

const longCardNumberValidator = new LongCardNumberValidator();

describe('validateLongCardNumber', () => {
  test('When long card number valid, passes validation', () => {
    // arrange
    const longCardNumber = '4485375259893057'

    // act
    const res = longCardNumberValidator.validateLongCardNumber(longCardNumber);

    // assert
    expect(res.passedValidation).toBeTruthy();
  });

  test('When long card number off by 1, fails validation', () => {
    // arrange
    const longCardNumber = '4485375259893056'

    // act
    const res = longCardNumberValidator.validateLongCardNumber(longCardNumber);

    // assert
    expect(res.passedValidation).toBeFalsy();
    expect(res.errors.length).toBe(1);
    expect(res.errors[0]).toBe('Invalid card number');
  });
});
