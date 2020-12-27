import express, {Request, Response} from 'express'
import {body, validationResult} from 'express-validator'
import {ICardDetailsValidator} from '../services/cardValidation/cardDetailsValidator';
import CreditCardDetails from '../services/cardValidation/creditCardDetails';
import container from '../config/iocConfig';
import SERVICE_IDENTIFIERS from '../config/serviceIdentifiers';

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', [
  body('longCardNumber').exists().withMessage('longCardNumber is required'),
  body('expiryMonth').exists().withMessage('expiryMonth is required'),
  body('expiryYear').exists().withMessage('expiryYear is required'),
],
(req : Request, res : Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({error: errors.array()[0].msg});
  }

  const cardDetailsValidator = container.get<ICardDetailsValidator>(SERVICE_IDENTIFIERS.CARD_DETAILS_VALIDATOR);
  const validationResponse = cardDetailsValidator.validateCreditCardDetails(req.body as CreditCardDetails);

  res.status(validationResponse.passedValidation ? 200 : 400).json(validationResponse);
});

export default router;
