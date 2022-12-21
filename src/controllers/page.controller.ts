import { Router, Request, Response, NextFunction } from 'express';
import Controller from "../interfaces/controller.interface"
import HttpException from "../utils/exceptions/http.exception"
// import validationMiddleware from '@/middleware/validation.middleware';
// import validate from '@/resources/post/post.validation';
import ProductService from "../resources/product/product.service"

class PageController implements Controller {
    public path = ''
    public router = Router()
    private productService = new ProductService()

    constructor() {
        this.runRoutes();
    }

    private runRoutes(): void {
        this.router.get(
            `${this.path}/`,
            // validationMiddleware(validate.create),
            this.home
        );
        this.router.get(
            `${this.path}/products`,
            this.products
        );

        this.router.get(
            `${this.path}/about`,
            this.about
        );
        this.router.get(
            `${this.path}/contact`,
            this.contact
        );
        this.router.get(
            `${this.path}/register`,
            this.register
        );
        this.router.get(
            `${this.path}/login`,
            this.login
        );
    }
    private home=async(req:Request,res:Response,next:NextFunction)
    :Promise<Response|void>=>{
        try {
            res.status(201).render("index");
        } catch (error) {
             if (error instanceof Error){
                next(new HttpException(400, error.message));
            } else {
                console.log('Unexpected error', error)
            }
        }
    }
     private products=async(
        req:Request,
        res:Response,
        next:NextFunction
    ):Promise<Response|void> =>{
        try {
            res.status(201).render("products")
        } catch (error) {
            if (error instanceof Error){
                next(new HttpException(400, error.message));
            } else {
                console.log('Unexpected error', error)
            }
        }
    }
    private about=async(
        req:Request,
        res:Response,
        next:NextFunction
    ):Promise<Response|void> =>{
        try {
            res.status(201).render("about")
        } catch (error) {
            if (error instanceof Error){
                next(new HttpException(400, error.message));
            } else {
                console.log('Unexpected error', error)
            }
        }
    }
     private contact=async(
        req:Request,
        res:Response,
        next:NextFunction
    ):Promise<Response|void> =>{
        try {
            res.status(201).render("contact")
        } catch (error) {
            if (error instanceof Error){
                next(new HttpException(400, error.message));
            } else {
                console.log('Unexpected error', error)
            }
        }
    }
    private register=async(
        req:Request,
        res:Response,
        next:NextFunction
    ):Promise<Response|void> =>{
        try {
            res.status(201).render("register")
        } catch (error) {
            if (error instanceof Error){
                next(new HttpException(400, error.message));
            } else {
                console.log('Unexpected error', error)
            }
        }
    }
    private login=async(
        req:Request,
        res:Response,
        next:NextFunction
    ):Promise<Response|void> =>{
        try {
            res.status(201).render("login")
        } catch (error) {
            if (error instanceof Error){
                next(new HttpException(400, error.message));
            } else {
                console.log('Unexpected error', error)
            }
        }
    }

    // private create = async (
    //     req: Request,
    //     res: Response,
    //     next: NextFunction
    // ): Promise<Response | void> => {
    //     try {
    //         const {title,body}=req.body
    //         const post = await this.productService.create({title,body});
    //         res.status(201).json(post);
    //     } catch (error) {
    //        if (error instanceof Error){
    //             next(new HttpException(400, error.message));
    //         } else {
    //             console.log('Unexpected error', error)
    //         }
    //     }
    // };


}

export default PageController;