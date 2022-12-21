import { Document } from 'mongoose';

export default interface Product extends Document {
    title: string;
    body: string;
}