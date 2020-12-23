import 'reflect-metadata';
import {Container} from 'inversify';
import {ExpiryDateValidator} from '../services/cardValidation/expiryDateValidation/expiryDateValidator';
import {IExpiryDateValidator} from '../services/cardValidation/expiryDateValidation/expiryDateValidator';
import {LongCardNumberValidator} from '../services/cardValidation/longCardNumberValidation/longCardNumberValidator';
import {ILongCardNumberValidator} from '../services/cardValidation/longCardNumberValidation/longCardNumberValidator';
import {CardDetailsValidator, ICardDetailsValidator} from '../services/cardValidation/cardDetailsValidator';
import SERVICE_IDENTIFIERS from './serviceIdentifiers';

const container = new Container();
container
    .bind<ICardDetailsValidator>(SERVICE_IDENTIFIERS.CARD_DETAILS_VALIDATOR)
    .to(CardDetailsValidator);

container
    .bind<ILongCardNumberValidator>(SERVICE_IDENTIFIERS.LONG_CARD_NUMBER_VALIDATOR)
    .to(LongCardNumberValidator);

container
    .bind<IExpiryDateValidator>(SERVICE_IDENTIFIERS.EXPIRY_DATE_VALIDATOR)
    .to(ExpiryDateValidator);

export default container;
