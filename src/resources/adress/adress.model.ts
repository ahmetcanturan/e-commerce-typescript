import { Schema, model } from 'mongoose';
import Adress from "./adress.interface"

const MongoSchema = new Schema(
    {
        name: {
            type: Schema.Types.String,
            required: true
        },
        surname: {
            type: Schema.Types.String,
            required: true
        },
        adressName: {
            type: Schema.Types.String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        country: {
            type: Schema.Types.String,
            required: true
        },
        city: {
            type: Schema.Types.String,
            required: true
        },
        adress: {
            type: Schema.Types.String,
            required: true
        },
        zipCode: {
            type: Schema.Types.Number,
            required: true
        },
        tc: {
            type: Schema.Types.Number,
        },
        phone: {
            type: Schema.Types.Number,
        },
    },
    { timestamps: true }
);


export default model<Adress>('Adress', MongoSchema);