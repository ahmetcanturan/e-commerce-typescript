import { Router, Request, Response, NextFunction } from 'express';
import Controller from "../interfaces/controller.interface"
import HttpException from "../utils/exceptions/http.exception"
// import validationMiddleware from '@/middleware/validation.middleware';
// import validate from '@/resources/post/post.validation';
import UserService from "../resources/user/user.service"

class UserController implements Controller {
    public path = ''
    public router = Router()
    private userService = new UserService()

    constructor() {
        this.runRoutes();
    }

    private runRoutes(): void {
        this.router.post(
            `${this.path}/register`,
            this.register
        );
    }
    private register=async(
        req:Request,
        res:Response,
        next:NextFunction
    ):Promise<Response|void> =>{
        try {
            console.log(req.body)
            res.status(201).redirect("/")
        } catch (error) {
            if (error instanceof Error){
                next(new HttpException(400, error.message));
            } else {
                console.log('Unexpected error', error)
            }
        }
    }

}

export default UserController;