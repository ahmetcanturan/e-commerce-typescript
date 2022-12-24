import { Request, Response, NextFunction } from 'express';
import HttpException from "../utils/exceptions/http.exception"

async function adminMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    try {
        if (res.locals.aut === "admin") next()
        else return res.status(201).clearCookie("jwt").redirect("/");
    } catch (error) {
        return next(new HttpException(401, 'Unauthorised'));
    }
}
export default adminMiddleware;