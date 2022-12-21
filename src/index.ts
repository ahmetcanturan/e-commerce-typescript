import 'dotenv/config';
import 'module-alias/register';
import validateEnv from './utils/valideEnv'
import App from './app';
import PageController from "./controllers/page/page.controller"

validateEnv();

const app = new App([
    new PageController()
],Number(process.env.PORT)
);

app.listen();