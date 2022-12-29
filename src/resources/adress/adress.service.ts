import AdressModel from "./adress.model"
import Adress from "./adress.interface";
import { ObjectId } from "mongoose";

class Service {
    private adress = AdressModel;

    public async register(
        name: string,
        surname: string,
        userId: ObjectId | string,
        adressName: string,
        country: string,
        city: string,
        adress: string,
        zipCode: number,
        tc: number,
        phone: number,
    ): Promise<Adress | Error> {
        try {
            const json = await this.adress.create({
                name,
                surname,
                adressName,
                country,
                city,
                userId,
                adress,
                zipCode,
                tc,
                phone
            });
            return json
        } catch (error) {
            throw new Error("Unable to create User");

        }
    }
    public async adressControls(
        userId: ObjectId | string
    ): Promise<Adress | Error> {
        try {
            const json = await this.adress.findOne({ userId })
            return json
        } catch (error) {
            throw new Error("Unable to create User");

        }
    }
    public async findByIdAndUpdate(
        id: ObjectId | string,
        data: object
    ): Promise<Adress | Error> {
        try {
            const json = await this.adress.findByIdAndUpdate(id, data)
            return json
        } catch (error) {
            throw new Error("Unable to create User");

        }
    }
}


export default Service