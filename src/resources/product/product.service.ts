import Product from "./product.interface"
import ProductModel from './product.model';
class Service {
    private product = ProductModel

    public async create(data:{title:string,body:string}): Promise<Product> {
        try {
            const json = await this.product.create(data);
            return json;
        } catch (error) {
            throw new Error('Unable to create Product');
        }
    }
    public async getAll():Promise<Product[]>{
        try {
            const json=await this.product.find()
            return json
        } catch (error) {
            throw new Error('Unable to find Product');
        }
    }
}

export default Service