import { validationResult } from 'express-validator';

const createValidator = (validator, status = 400) => [
  ...validator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(status).send({ errors: errors.array() });
      return;
    }
    next();
  },
];

export default createValidator;
