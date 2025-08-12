import express from 'express';
import { getTasks, createTask, deleteTask, updateTaskPartial } from '../controllers/taskController.js';

const router = express.Router();

router.get('/', getTasks);
router.post('/', createTask);
router.delete('/:id', deleteTask);
router.patch('/:id', updateTaskPartial );

export default router;
