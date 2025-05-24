import { randomBytes } from 'crypto';
import { type Response } from 'express';
import { BAD_REQUEST, SUCCESS_REQUEST } from './httpStatusCodes';


export function generateRandomString(length:number):string {
    return randomBytes(length/2 < 1? 1: length/2).toString('hex')
}



export function success_json(c: Response<any, Record<string, any>>, message: string,data?: any, name?: string): Response<any, Record<string, any>> {
    return c.status(SUCCESS_REQUEST).json({
        data,
        message,
        name: name??"custom_success",
        success: true,
    })
}

export function error_json(c: Response<any, Record<string, any>>, message: string,data?: any, name?: string): Response<any, Record<string, any>> {
    return c.status(BAD_REQUEST).json({
        data,
        message,
        name: name??"custom_error",
        success: false,
    })
}
