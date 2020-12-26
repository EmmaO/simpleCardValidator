import 'reflect-metadata';
import {ZonedDateTime} from '@js-joda/core';
import {ExpiryDateValidator} from '../../../../src/services/cardValidation/expiryDateValidation/expiryDateValidator';
import {Fixture, FixtureTypes as FixtureType} from '../../fixture/fixture';

const fixture = new Fixture();

const expiryDateValidator = new ExpiryDateValidator();

describe('validateExpiryDate', () => {
  test('passes validation when expiry is next month', () => {
    // arrange
    const now = fixture.create(FixtureType.ZonedDateTime) as ZonedDateTime;
    const expiryMonth = now.plusMonths(1).monthValue();
    const expiryYear = now.plusMonths(1).year();

    ZonedDateTime.now = jest.fn().mockImplementation(() => {
      return now;
    })

    // act
    const result = expiryDateValidator.validateExpiryDate(expiryMonth, expiryYear);

    // assert
    expect(result.passedValidation).toBeTruthy();
  });

  test('passes validation when expiry is this month', () => {
    // arrange
    const now = fixture.create(FixtureType.ZonedDateTime) as ZonedDateTime;
    const expiryMonth = now.monthValue();
    const expiryYear = now.year();

    ZonedDateTime.now = jest.fn().mockImplementation(() => {
      return now;
    })

    // act
    const result = expiryDateValidator.validateExpiryDate(expiryMonth, expiryYear);

    // assert
    expect(result.passedValidation).toBeTruthy();
  });

  test('fails validation when expiry is last month', () => {
    // arrange
    const now = fixture.create(FixtureType.ZonedDateTime) as ZonedDateTime;
    const expiryMonth = now.plusMonths(-1).monthValue();
    const expiryYear = now.plusMonths(-1).year();

    ZonedDateTime.now = jest.fn().mockImplementation(() => {
      return now;
    })

    // act
    const result = expiryDateValidator.validateExpiryDate(expiryMonth, expiryYear);

    // assert
    expect(result.passedValidation).toBeFalsy();
    expect(result.errors.length).toBe(1);
    expect(result.errors[0]).toBe('Card has expired');
  });
});

