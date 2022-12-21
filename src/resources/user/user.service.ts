import UserModel from "./user.model"
import token from "../../utils/token"

class Service {
    private user = UserModel;

    public async register(
        name: string,
        surname:string,
        email: string,
        password: string
    ): Promise<string | Error> {
        try {
            const json = await this.user.create({
                name,
                surname,
                email,
                password
            });

            const accessToken = token.createToken(json);

            return accessToken;
        } catch (error) {
                throw new Error("Unable to create User");

        }
    }
    public async getAll(): Promise<object[] |null| Error> {
        try {
                const users=await this.user.find()
                return users;
        } catch (error) {
                throw new Error("Unable to create User");

        }
    }
    public async findOne(data:object): Promise<object|null| Error> {
        try {
                const user=await this.user.findOne(data);
                return user
        } catch (error) {
                throw new Error("Unable to create User");

        }
    }

    public async login(
        email: string,
        password: string
    ): Promise<string | Error> {
        try {
            const user = await this.user.findOne({ email });

            if (!user) {
                throw new Error('Unable to find user with that email address');
            }

            if (await user.isValidPassword(password)) {
                return token.createToken(user);
            } else {
                throw new Error('Wrong credentials given');
            }
        } catch (error) {
            throw new Error('Unable to create user');
        }
    }
}

export default Service