import {type Request, type Response} from 'express';
import {db} from '../../db/db';
import {todos, users} from '../../db/schema';
import {error_json, success_json} from '../../utility/helper';
import {and, eq, gte, lte, desc, asc, SQL} from 'drizzle-orm';


export const createTodo = async (req: Request, res: Response) => {
    console.log(req.body);
    const {name, shortDescription, dateTime} = req.body;
    const userId = req.user?.id;

    if (!userId) {
        error_json(res, "User not authenticated.", {
            url: "/logout",
        }, "redirect");
        return
    }

    try {
        const [newTodo] = await db.insert(todos).values({
            userId,
            name,
            shortDescription,
            dateTime,
            isDone: false,
        });

        success_json(res, "Todo created successfully.", {todoId: newTodo.insertId});
        return
    } catch (err) {
        console.error("Error creating todo:", err);
        error_json(res, "Failed to create todo.");
        return
    }
};

export const getTodos = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const {status, referenceDateTime, orderBy} = req.query;

    if (!userId) {
        error_json(res, "User not authenticated.", {
            url: "/logout",
        }, "redirect");
        return
    }


    try {
        const conditions: SQL<unknown>[] = [eq(todos.userId, userId)];

        if (status === 'done') {
            conditions.push(eq(todos.isDone, true));
        } else if (status === 'upcoming') {
            conditions.push(eq(todos.isDone, false));

        } else if (status === 'missed') {
            conditions.push(eq(todos.isDone, false));
        }

        if (typeof referenceDateTime === 'string' && referenceDateTime) {
            conditions.push(gte(todos.dateTime, referenceDateTime));
        }

        const whereClause = and(...conditions);


        let orderByClause = desc(todos.createdAt);

        if (orderBy === 'date_time') {
            orderByClause = asc(todos.dateTime);
        }

        const userTodos = await db.select()
            .from(todos)
            .where(whereClause) 
            .orderBy(orderByClause);

        success_json(res, "Todos retrieved successfully.", userTodos);
        return
    } catch (err) {
        console.error("Error fetching todos:", err);
        error_json(res, "Failed to retrieve todos.");
        return
    }
};

export const updateTodo = async (req: Request, res: Response) => {
    const {id, name, shortDescription, dateTime, isDone} = req.body;

    const userId = req.user?.id;

    if (!userId) {
        error_json(res, "User not authenticated.", {
            url: "/logout",
        }, "redirect");
        return
    }

    try {
        const result = await db.update(todos)
            .set({
                name,
                shortDescription,
                dateTime,
                isDone: isDone ?? false,
            })
            .where(and(eq(todos.id, parseInt(id)), eq(todos.userId, userId)));

        if (result[0].affectedRows === 0) {
            error_json(res, "Todo not found or you don't have permission to update it.");
            return
        }

        success_json(res, "Todo updated successfully.");
        return
    } catch (err) {
        console.error("Error updating todo:", err);
        error_json(res, "Failed to update todo.");
        return
    }
};

export const deleteTodo = async (req: Request, res: Response) => {
    const {id} = req.body;
    const userId = req.user?.id;

    if (!userId) {
        error_json(res, "User not authenticated.", {
            url: "/logout",
        }, "redirect");
        return
    }

    try {
        const result = await db.delete(todos)
            .where(and(eq(todos.id, parseInt(id)), eq(todos.userId, userId)));

        if (result[0].affectedRows === 0) {
            error_json(res, "Todo not found or you don't have permission to delete it.");
            return
        }

        success_json(res, "Todo deleted successfully.");
        return
    } catch (err) {
        console.error("Error deleting todo:", err);
        error_json(res, "Failed to delete todo.");
        return
    }
};