import { ObjectId } from "mongoose";
import Product from "./cart.interface";
import Cart from "./cart.interface"
import CartModel from './cart.model';
import { deleteAnId } from "../../utils/dbUtils"
class Service {
    private cart = CartModel

    public async create(data: { products: string[], userId: string }): Promise<Cart> {
        const json = await this.cart.create(data);
        return json;
    }
    public async getAll(): Promise<Cart[]> {
        const json = await this.cart.find()
        return json
    }
    public async addProduct(productId: any, userId: string, cartId: string): Promise<Cart> {
        const json = await this.cart.findById(cartId)
        json.products.push(productId)
        await json.save()
        return json;
    }
    public async getById(id: ObjectId): Promise<Cart> {
        const json = await this.cart.findById(id)
        return json
    }
    public async findOnePopulate(data: object): Promise<Cart> {
        const json = await this.cart.findOne(data).populate({
            path: "products",
            select: ["name", "price"]
        })
        return json
    }
    public async calculateCartTotally(products: Product[] | any): Promise<number> {
        let totally = 0
        for (const item of products) {
            totally += item.price
        }
        return totally
    }
    public async deleteByProductId(cartId: ObjectId, productId: ObjectId | string): Promise<void> {
        const cart = await this.cart.findById(cartId)
        cart.products = deleteAnId(cart.products, productId)
        await cart.save()
        return
    }
}

export default Service
