import { Router } from 'express';
import AuthController from '../controllers/authController';
import { body } from 'express-validator';

const router = Router();

router.post(
	'/registration',
	body('email').isEmail(),
	body('password').isLength({ min: 3, max: 32 }),
	body('username').isLength({ min: 3, max: 32 }),
	AuthController.registration
);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);

router.get('/refresh', AuthController.refresh);

export default router;
