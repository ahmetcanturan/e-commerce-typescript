import { Schema, model } from 'mongoose';
import Product from "./product.interface"

const MongoSchema = new Schema(
    {
        name: {
            type: Schema.Types.String,
            required: true,
        },
        desc: {
            type: Schema.Types.String,
            required: true,
        },
        img_path: {
            type: Schema.Types.String,
            default: "noFoto"
        },
        stock: {
            type: Schema.Types.Number,
            required: true
        },
        price: {
            type: Schema.Types.Number,
            required: true
        },
        sold_quantity: {
            type: Schema.Types.Number,
            default: 0
        },
        click: {
            type: Schema.Types.Number,
            default: 0
        }
    },
    {
        minimize: true,
        timestamps: true,
        autoIndex: true
    }
);

export default model<Product>('Product', MongoSchema);