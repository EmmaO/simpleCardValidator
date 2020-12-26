import 'reflect-metadata';
import {ZonedDateTime} from '@js-joda/core';
import {ExpiryDateValidator} from '../../../../src/services/cardValidation/expiryDateValidation/expiryDateValidator';
import DateTime from '../../../services/coreUtilities/dateTime';
import {Fixture, FixtureTypes as FixtureType} from '../../fixture/fixture';

const fixture = new Fixture();
const dateTime = new DateTime();

const expiryDateValidator = new ExpiryDateValidator(
    dateTime,
);

describe('validateExpiryDate', () => {
  test('passes validation when expiry is in the future', () => {
    // arrange
    const now = fixture.create(FixtureType.ZonedDateTime) as ZonedDateTime;
    const expiryDate = now.plusDays(fixture.create(FixtureType.number) as number);

    dateTime.now = jest.fn().mockImplementation(() => {
      return now;
    })

    // act
    const result = expiryDateValidator.validateExpiryDate(expiryDate.monthValue(), expiryDate.year());

    // assert
    expect(result).toBeTruthy();
  });
});

