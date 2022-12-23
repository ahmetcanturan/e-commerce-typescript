import { Request, Response, NextFunction } from 'express';
import token from "../utils/token"
import Token from "../interfaces/token.interface"
import HttpException from "../utils/exceptions/http.exception"
import jwt from 'jsonwebtoken';

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
                return res.status(201).clearCookie("jwt").redirect("/login");
            }
            else {
                res.locals.isLogin = true
                next()
            }
        }
        else {
            res.locals.isLogin = false
            next()
        }
    } catch (error) {
        return next(new HttpException(401, 'Unauthorised'));
    }
}

export default authenticatedMiddleware;