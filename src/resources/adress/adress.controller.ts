import { Router, Request, Response, NextFunction } from 'express';
import Controller from "../../interfaces/controller.interface"
import HttpException from "../../utils/exceptions/http.exception"
import adressValidator from "./adress.validation"
import adressService from "./adress.service"
import { validationRender } from '../../utils/index';
import detectClient from '../../middlewares/detectClient.middleware';

class AdressController implements Controller {
    public path = '/adress'
    public router = Router()
    private adressService = new adressService()

    constructor() {
        this.runRoutes();
    }
    private runRoutes(): void {
        this.router.post(
            `${this.path}/create/:userId`, detectClient, adressValidator.create(),
            this.create
        )
    }
    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            if (validationRender(req, res, "adress_create_warn") !== null) return
            const { name, surname, adressName, country, city, adress, zipCode, tc, phone } = req.body
            const userId = req.params.userId
            const recordAdress: any = await this.adressService.adressControls(userId)
            if (recordAdress) {
                await this.adressService.findByIdAndUpdate(recordAdress._id,
                    { name, surname, adressName, country, city, adress, zipCode, tc, phone, userId }
                )
            }
            else {
                await this.adressService.register(name,
                    surname,
                    userId,
                    adressName,
                    country,
                    city,
                    adress,
                    zipCode,
                    tc,
                    phone)
            }
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

export default AdressController;
