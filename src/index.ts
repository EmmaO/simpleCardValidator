import container from './config/iocConfig';
import SERVICE_IDENTIFIERS from './config/serviceIdentifiers';
import {CardDetailsValidator} from './services/cardValidation/cardDetailsValidator';

const cardDetailsValidator = container.get<CardDetailsValidator>(SERVICE_IDENTIFIERS.CARD_DETAILS_VALIDATOR);
console.log(cardDetailsValidator.validateCreditCardDetails({
  longCardNumber: '',
  expiryMonth: 1,
  expiryYear: 2000,
}).passedValidation);
