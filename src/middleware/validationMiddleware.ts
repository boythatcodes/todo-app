import { type Request, type Response, type NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { error_json } from '../utility/helper';

export function validateBodyData(schema: z.ZodObject<any, any>) {
    return (req: Request, res: Response, next: NextFunction)  => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map((issue: any) => ({
                    message: `${issue.path.join('.')} is ${issue.message}`,
                }));

                error_json(res, `Incorrect Data: ${error.errors[0].path.join('.')} is ${error.errors[0].message}`, { details: errorMessages }, "zod_error");
            } else {
                error_json(res, "Internal Server Error", {}, "server_error");
            }
        }
    };
}

export function validateQueryData(schema: z.ZodObject<any, any>) {
    return (req: Request, res: Response, next: NextFunction)  => {
        try {
            schema.parse(req.query);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map((issue: any) => ({
                    message: `${issue.path.join('.')} is ${issue.message}`,
                }));

                error_json(res, `Incorrect Data: ${error.errors[0].path.join('.')} is ${error.errors[0].message}`, { details: errorMessages }, "zod_error");
            } else {
                error_json(res, "Internal Server Error", {}, "server_error");
            }
        }
    };
}

export function validateHeaderData(schema: z.ZodObject<any, any>) {
    return (req: Request, res: Response, next: NextFunction)  => {
        try {
            schema.parse(req.headers);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map((issue: any) => ({
                    message: `${issue.path.join('.')} is ${issue.message}`,
                }));

                error_json(res, `Incorrect Data: ${error.errors[0].path.join('.')} is ${error.errors[0].message}`, { details: errorMessages }, "zod_error");
            } else {
                error_json(res, "Internal Server Error", {}, "server_error");
            }
        }
    };
}