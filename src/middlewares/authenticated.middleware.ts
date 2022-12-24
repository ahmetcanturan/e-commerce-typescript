import { Request, Response, NextFunction } from 'express';
import token from "../utils/token"
import Token from "../interfaces/token.interface"
import HttpException from "../utils/exceptions/http.exception"
import jwt from 'jsonwebtoken';
import { admin } from "../utils/definitions/const"

async function authenticatedMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    try {
        const cookie = req?.cookies?.jwt;
        if (cookie) {
            const _token: Token | jwt.JsonWebTokenError = await token.verifyToken(cookie)
            if (_token instanceof jwt.JsonWebTokenError) {
                return res.status(201).clearCookie("jwt").redirect("/");
            }
            else {
                if (admin.includes(_token.id)) res.locals.aut = "admin"
                else res.locals.aut = "true"
                next()
            }
        }
        else {
            res.locals.aut = "false"
            next()
        }
    } catch (error) {
        return next(new HttpException(401, 'Unauthorised'));
    }
}

export default authenticatedMiddleware;