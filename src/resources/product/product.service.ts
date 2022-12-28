import Product from "./product.interface"
import ProductModel from './product.model';
class Service {
    private product = ProductModel

    public async create(data: { name: string, desc: string, stock: number, price: number, img_path: string }): Promise<Product> {
        const json = await this.product.create(data);
        return json;
    }
    public async getAll(): Promise<Product[]> {
        const json = await this.product.find()
        return json
    }
    public async findBestSeller(): Promise<Product[]> {
        let json = await this.product.find()
        json = json.sort((a, b) => (a.sold_quantity < b.sold_quantity ? 1 : -1)).slice(0, 3)
        return json
    }
    public async lastProducts(): Promise<Product[]> {
        let json = await this.product.find().sort({ $natural: -1 })
        json = json.slice(0, 3)
        return json
    }
}

export default Service