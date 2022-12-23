import { Document } from 'mongoose';

export default interface Product extends Document {
    name: string;
    desc: string;
    img_path: string;
    stock: number;
    price: number;
    sold_quantity: number;
    click: number;
}