import { Router, Request, Response, NextFunction } from 'express';
import Controller from "../../interfaces/controller.interface"
import HttpException from "../../utils/exceptions/http.exception"
import ProductValidator from "./product.validation"
import ProductService from "./product.service"
import { validationRender } from '../../utils/index';


class ProductController implements Controller {
    public path = '/product'
    public router = Router()
    private productService = new ProductService()

    constructor() {
        this.runRoutes();
    }

    private runRoutes(): void {
        this.router.post(
            `${this.path}/create`, ProductValidator.create(),
            this.create
        )
    }
    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            if (validationRender(req, res, "p_create_warn") !== null) return
            await this.productService.create(req.body)
            res.status(201).redirect("/products")
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            } else {
                console.log('Unexpected error', error)
            }
        }
    }
}

export default ProductController;
