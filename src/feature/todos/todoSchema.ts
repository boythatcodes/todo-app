import { z } from "zod";
import { lowercaseErrorMessage, maxLengthErrorMessage, minLengthErrorMessage, numberErrorMessage, specialCharacterErrorMessage, uppercaseErrorMessage } from "../../utility/messages/errors";

export const createTodoValidationSchema = z.object({
    name: z.string(),
    shortDescription: z.string(),
    dateTime: z.string().date("yyyy-MM-dd" ),
})



export const getTodoValidationSchema = z.object({
    status: z.enum(["done", "upcoming", "missed", "all"]).optional(),
    referenceDateTime: z.string().date("yyyy-MM-dd" ).optional(),
    orderBy: z.enum(["created_at", "date_time"]).optional(),
});

export const updateTodoValidationSchema = z.object({
    id: z.number(),
    name: z.string().optional(),
    shortDescription: z.string().optional(),
    dateTime: z.string().date("yyyy-MM-dd" ).optional(),
    isDone: z.boolean().optional(),
});


export const deleteTodoValidationSchema = z.object({
    id: z.number(),
})