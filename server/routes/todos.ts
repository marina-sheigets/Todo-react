import { addTodo, deleteTodo, updateTodo, getTodos } from '../controllers/todosController';
import { Router } from 'express';

const router = Router();

router.get('/:userID', getTodos);
router.post('/', addTodo);
router.delete('/:id', deleteTodo);
router.patch('/:id?', updateTodo);

export default router;
