import express, { Application ,Router } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import expressLayouts from 'express-ejs-layouts';
import path from "path"
import Controller from "./interfaces/controller.interface"
import ErrorMiddleware from "./middlewares/error.middleware"

class App {
    public app: Application;
    public port: number;

    constructor(controllers: Controller[],port: number) {
        this.app = express();
        this.port = port;
        // this.runDatabaseConnection();
        this.runMiddleware();
        this.runControllers(controllers);
        this.runErrorHandling();
    }
    private runMiddleware(): void {
        this.app.use(expressLayouts)
        this.app.set('layout','layouts/layout');
        this.app.set('view engine', 'ejs')
        this.app.set("views",path.join(__dirname,"views"))
        this.app.use(express.static(path.join(__dirname,'public')));
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(compression());
    }

    private runControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.app.use('', controller.router);
        });
    }

    // private runControllers():void{
    //     this.app.get("/",(req,res)=>{
    //         res.render("index")
    //     })
    //       this.app.get("/electronic",(req,res)=>{
    //         res.render("electronic")
    //     })
    //        this.app.get("/fashion",(req,res)=>{
    //         res.render("fashion")
    //     })
    //        this.app.get("/jewellery",(req,res)=>{
    //         res.render("jewellery")
    //     })
    // }

    private runErrorHandling(): void {
        this.app.use(ErrorMiddleware);
    }

    // private initialiseDatabaseConnection(): void {
    //     const { MONGODB_PATH } = process.env;

    //     mongoose.connect(
    //         `mongodb://${MONGODB_PATH}`
    //     );
    // }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;
