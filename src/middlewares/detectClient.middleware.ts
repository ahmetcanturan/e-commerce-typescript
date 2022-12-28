import { Request, Response, NextFunction } from 'express';
import token from "../utils/token"
import HttpException from "../utils/exceptions/http.exception"
import UserService from "../resources/user/user.service"
const userService = new UserService()
async function detectClient(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    try {
        const cookie = req?.cookies?.jwt;
        if (res.locals.aut !== "false") {
            const _token: any = await token.verifyToken(cookie)
            const user = await userService.findById(_token.id)
            res.locals.user = user
            next()
        }
        else {
            return res.status(401).redirect("/login")
        }
    } catch (error) {
        return next(new HttpException(401, 'Unauthorised'));
    }
}

export default detectClient;