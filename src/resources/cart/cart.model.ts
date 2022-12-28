import { Schema, model } from 'mongoose';
import Cart from "./cart.interface"

const MongoSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            unique: true,
            required: true
        },
        products:
            [{
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true
            }],
        totally: {
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

export default model<Cart>('Cart', MongoSchema);