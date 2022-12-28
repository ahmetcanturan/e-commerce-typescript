import { Document, ObjectId } from 'mongoose';

export default interface Product extends Document {
    userId: ObjectId;
    products: ObjectId[];
    totally: number;
}