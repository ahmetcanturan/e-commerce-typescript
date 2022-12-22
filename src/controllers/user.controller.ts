import { Router, Request, Response, NextFunction } from 'express';
import Controller from "../interfaces/controller.interface"
import HttpException from "../utils/exceptions/http.exception"
import userValidator from "../resources/user/user.validation"
import UserService from "../resources/user/user.service"
import { validationRender } from '../utils/index';


class UserController implements Controller {
    public path = ''
    public router = Router()
    private userService = new UserService()

    constructor() {
        this.runRoutes();
    }

    private runRoutes(): void {
        this.router.post(
            `${this.path}/register`, userValidator.create(),
            this.register
        );
    }
    private register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            if (validationRender(req, res, "register_warn") !== null) return
            const { name, surname, email, password } = req.body
            await this.userService.register(name, surname, email, password)
            res.status(201).redirect("/login")
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            } else {
                console.log('Unexpected error', error)
            }
        }
    }

}

export default UserController;