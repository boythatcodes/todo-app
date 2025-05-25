import {Router} from 'express';
import {createTodo, getTodos, updateTodo, deleteTodo} from '../feature/todos/todoController';
import {validateSessionMiddleware} from '../middleware/sessionValidationMiddleware';
import {
    createTodoValidationSchema, deleteTodoValidationSchema,
    getTodoValidationSchema,
    updateTodoValidationSchema
} from "../feature/todos/todoSchema.ts";
import {validateBodyData, validateQueryData} from "../middleware/validationMiddleware.ts";

const router = Router();

router.use(validateSessionMiddleware());

router.post('/', validateBodyData(createTodoValidationSchema), createTodo);

router.get('/', validateQueryData(getTodoValidationSchema), getTodos);

router.put('/', validateBodyData(updateTodoValidationSchema), updateTodo);


router.delete('/', validateBodyData(deleteTodoValidationSchema), deleteTodo);

export default router;