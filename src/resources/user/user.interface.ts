
import { Document } from 'mongoose';

export default interface User extends Document {
    email: string;
    name: string;
    surname: string;
    password: string;
    cartID: string;

    isValidPassword(password: string): Promise<Error | boolean>;
}