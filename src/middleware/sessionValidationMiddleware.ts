import { type Request, type Response, type NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { error_json } from '../utility/helper';
import { validateSession } from '../utility/sessionUtility';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                name: string;
                email: string;
                emailVerified: boolean | null;
                status: "admin" | "user" | "blocked";
            };
        }
    }
}

export function validateSessionMiddleware() {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        if (!token) {
            error_json(res, "No session token provided", {
                url: "/logout"
            }, "redirect");
            return;
        }

        try {
            const user = await validateSession(token);

            if (!user) {
                error_json(res, "Invalid or expired session", {
                    url: "/logout"
                }, "redirect");
                return
            }

            req.user = user;
            next();

        } catch (error) {
            error_json(res, "Internal Server Error", {}, "server_error");
	        return;
        }
    }
}