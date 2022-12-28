import { Router, Request, Response, NextFunction } from 'express';
import Controller from "../interfaces/controller.interface"
import HttpException from "../utils/exceptions/http.exception"
import adminMiddleware from '../middlewares/admin.middleware';
import ProductService from "../resources/product/product.service"
import detectClient from "../middlewares/detectClient.middleware"
import CartService from "../resources/cart/cart.service"
const productService = new ProductService()
class PageController implements Controller {
    public path = ''
    public router = Router()

    constructor() {
        this.runRoutes();
    }

    private runRoutes(): void {
        this.router.get(
            `${this.path}/`,
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
        this.router.get(
            `${this.path}/cart`, detectClient,
            this.cart
        );
        this.router.get(
            `${this.path}/product/create`, adminMiddleware,
            this.productCreate
        );
    }
    private home = async (req: Request, res: Response, next: NextFunction)
        : Promise<Response | void> => {
        try {
            res.status(201).render("index");
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            } else {
                console.log('Unexpected error', error)
            }
        }
    }
    private products = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const bestSeller = await productService.findBestSeller()
            const lastProducts = await productService.lastProducts()
            const getAll = await productService.getAll()
            res.status(201).render("products", { bestSeller, lastProducts, getAll })
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            } else {
                console.log('Unexpected error', error)
            }
        }
    }
    private about = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            res.status(201).render("about")
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            } else {
                console.log('Unexpected error', error)
            }
        }
    }
    private contact = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            res.status(201).render("contact")
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            } else {
                console.log('Unexpected error', error)
            }
        }
    }
    private register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            res.status(201).render("register")
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            } else {
                console.log('Unexpected error', error)
            }
        }
    }
    private login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            res.status(201).render("login")
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            } else {
                console.log('Unexpected error', error)
            }
        }
    }
    private productCreate = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            res.status(201).render("p_create")
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            } else {
                console.log('Unexpected error', error)
            }
        }
    }
    private cart = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const cartService = new CartService()
            const json = await cartService.findOnePopulate({ userId: res.locals.user._id })
            res.status(201).render("cart", { products: json.products })
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            } else {
                console.log('Unexpected error', error)
            }
        }
    }


}

export default PageController;