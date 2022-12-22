import UserModel from "./user.model"
import token from "../../utils/token"
import User from "./user.interface";

class Service {
    private user = UserModel;

    public async register(
        name: string,
        surname: string,
        email: string,
        password: string
    ): Promise<User | Error> {
        try {
            const json = await this.user.create({
                name,
                surname,
                email,
                password
            });
            return json
        } catch (error) {
            throw new Error("Unable to create User");

        }
    }
    public async getAll(): Promise<object[] | null | Error> {
        try {
            const users = await this.user.find()
            return users;
        } catch (error) {
            throw new Error("Unable to create User");

        }
    }
    public async findOne(data: object): Promise<User | any | Error> {
        try {
            const user = await this.user.findOne(data);
            return user
        } catch (error) {
            throw new Error("Unable to create User");

        }
    }
    public async login(
        id: string
    ): Promise<string | Error> {
        try {
            return token.createToken(id)
        } catch (error) {
            throw new Error('Unable to create user');
        }
    }
}

export default Service