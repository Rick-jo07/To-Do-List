import express  from "express";
import { Router } from "express";
import * as todoController from '../controller/TodoController.js'
import { validateCreateTodo, validateUpdateTodo } from "../middleware/TodoValidator.js";
import { validateRequest } from "../middleware/ValidateRequest.js";
import { IsAuthenticated } from "../middleware/authMiddleWare.js";



const router = Router();
router.get('/', IsAuthenticated, todoController.getAllTodos);
router.post('/', validateCreateTodo, validateRequest, todoController.createTodos);
router.put('/:id', validateUpdateTodo,  todoController.UpdateTodos);
router.delete('/:id', todoController.DeleteTodos);

export default router