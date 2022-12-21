import 'dotenv/config';
import validateEnv from './utils/valideEnv'
import App from './app';
import PageController from "./controllers/page.controller"
import UserController from './controllers/user.controller'

validateEnv();

const app = new App([
    new PageController(), new UserController()
],Number(process.env.PORT)
);

app.listen();