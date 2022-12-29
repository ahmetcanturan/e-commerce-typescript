import { Router, Request, Response, NextFunction } from 'express';
import Controller from "../../interfaces/controller.interface"
import HttpException from "../../utils/exceptions/http.exception"
// import CartValidator from "./cart.validation"
import CartService from "./cart.service"
import detectClient from "../../middlewares/detectClient.middleware"
import UserService from "../../resources/user/user.service"

class CartController implements Controller {
    public path = '/cart'
    public router = Router()
    private cartService = new CartService()

    constructor() {
        this.runRoutes();
    }

    private runRoutes(): void {
        this.router.post(
            `${this.path}/create/:productId`, detectClient,
            this.create
        )
        this.router.post(
            `${this.path}/delete/:productId`, detectClient,
            this.deleteByProductId
        )
    }
    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            if (res.locals.user.cartId === "0") {
                const cart = await this.cartService.create({ products: [req.params.productId], userId: res.locals.user._id })
                const userService = new UserService()
                await userService.updateById(res.locals.user._id, { cartId: cart._id })
                res.status(201).redirect("/products")
                return
            }
            else {
                await this.cartService.addProduct(req.params.productId, res.locals.user._id, res.locals.user.cartId)
                res.status(201).redirect("/products")
                return
            }
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            } else {
                console.log('Unexpected error', error)
            }
        }
    }
    private deleteByProductId = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            await this.cartService.deleteByProductId(res.locals.user.cartId, req.params.productId)
            res.status(201).redirect("/cart")
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            } else {
                console.log('Unexpected error', error)
            }
        }
    }
}

export default CartController;
