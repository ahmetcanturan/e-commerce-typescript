import { Schema, model } from 'mongoose';
import Product from "./product.interface"

const MongoSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default model<Product>('Product', MongoSchema);