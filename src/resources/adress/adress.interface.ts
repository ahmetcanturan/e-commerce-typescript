
import { Document, ObjectId } from 'mongoose';

export default interface Adress extends Document {
    name: string;
    surname: string;
    adressName: string;
    userId: string | ObjectId;
    country: string;
    city: string;
    adress: string;
    zipCode: number;
    tc: number;
    phone: number;
}