import { Router } from 'express';
import {
  signInController,
  tokenController,
} from '../controllers/auth-controller';
import { signInValidator, tokenValidator } from '../validators/auth-validator';

const authRouter = Router();

authRouter.post('/sign-in', signInValidator, signInController);
authRouter.get('/me', tokenValidator, tokenController);
authRouter.get('/token', tokenValidator, tokenController);

export default authRouter;
