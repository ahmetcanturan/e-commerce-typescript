import express, { Application, Router } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import path from "path"
import Controller from "./interfaces/controller.interface"
import ErrorMiddleware from "./middlewares/error.middleware"
import cookie from "cookie-parser"
import authenticated from "./middlewares/authenticated.middleware"
import fileUpload from "express-fileupload"

class App {
    public app: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.app = express();
        this.port = port;
        this.runDatabaseConnection();
        this.runMiddleware();
        this.runControllers(controllers);
        this.runErrorHandling();
    }
    private runMiddleware(): void {
        this.app.set('view engine', 'ejs')
        this.app.set("views", path.join(__dirname, "views"))
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(compression());
        this.app.use(cookie())
        this.app.use(fileUpload())// * Form üzerinden dosya indirilmek istendiğinde body bilgisini alabilmek için
        this.app.use(authenticated)
    }

    private runControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.app.use('', controller.router);
        });
    }

    private runErrorHandling(): void {
        this.app.use(ErrorMiddleware);
    }

    private runDatabaseConnection(): void {
        const { DB_URI } = process.env;
        mongoose.set('strictQuery', false);
        mongoose.connect(DB_URI, { dbName: "typescript" }
        ).then(() => {
            console.log("Mongodb is Connected..")
        })
            .catch((err) => {
                console.log("DB connection err: ", err)
            })
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;
