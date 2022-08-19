import TodosController from '../controllers/todosController';
import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.get('/:userID', authMiddleware, TodosController.getTodos);
router.post('/', authMiddleware, TodosController.addTodo);
router.delete('/:id', authMiddleware, TodosController.deleteTodo);
router.patch('/:id?', authMiddleware, TodosController.updateTodo);

export default router;
