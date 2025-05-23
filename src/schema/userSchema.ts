import { z } from "zod";
import { lowercaseErrorMessage, maxLengthErrorMessage, minLengthErrorMessage, numberErrorMessage, specialCharacterErrorMessage, uppercaseErrorMessage } from "../helper/messages/errors";

export const userLoginValidationSchema = z.object({
    email: z.string().email(),
    password: z.string()
        .min(8, { message: minLengthErrorMessage })
        .max(20, { message: maxLengthErrorMessage })
        .refine((password) => /[A-Z]/.test(password), {
            message: uppercaseErrorMessage,
        })
        .refine((password) => /[a-z]/.test(password), {
            message: lowercaseErrorMessage,
        })
        .refine((password) => /[0-9]/.test(password), { message: numberErrorMessage })
        .refine((password) => /[!@#$%^&*]/.test(password), {
            message: specialCharacterErrorMessage,
        }),
})

export const userCreationValidationSchema = z.object({
    auth: userLoginValidationSchema,
    name: z.string(),
})


export const userUpdateValidationSchema = z.object({
    name: z.string(),
    email: z.string().email()
});


export const userVerificationValidationSchema = z.object({
    e: z.string().email(),
    v: z.string(),
})