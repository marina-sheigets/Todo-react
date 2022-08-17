import { Router } from 'express';
import authController from '../controllers/authController';
import { body } from 'express-validator';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.post(
	'/registration',
	body('email').isEmail(),
	body('password').isLength({ min: 3, max: 32 }),
	body('username').isLength({ min: 3, max: 32 }),
	authController.registration
);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.get('/users', authMiddleware, authController.getUsers);
router.get('/refresh', authController.refresh);

export default router;
