import 'dotenv/config';
import validateEnv from './utils/valideEnv'
import App from './app';
import PageController from "./controllers/page.controller"
import UserController from './resources/user/user.controller'
import ProductController from './resources/product/product.controller';

validateEnv();

const app = new App([
    new PageController(), new UserController(), new ProductController()
], Number(process.env.PORT)
);

app.listen();