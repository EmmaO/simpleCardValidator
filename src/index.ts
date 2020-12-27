import express from 'express';
import CardValidationRouter from './routers/cardValidationRouter'

const app = express();
app.use(express.json());

const port = process.env.Port || '8000';

app.use('/cardValidation', CardValidationRouter)

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
})
    .on('error', (err) => {
      return console.error(err);
    });
