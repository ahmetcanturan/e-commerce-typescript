import { validationResult, ValidationError } from "express-validator"
import { Router, Request, Response, NextFunction } from 'express';


// class ValidationRender {
//     private req: Request
//     private res: Response
//     private validationErrors: ValidationError | any
//     constructor(req: Request, res: Response) {
//         this.req = req
//         this.res = res
//         this.validationErrors = validationResult(req)
//     }
//     public renderRegister = (): Response | any => {
//         if (this.validationErrors.isEmpty() === false) {
//             return this.res.status(401).render("register_warn", { record: this.req.body, err: this.validationErrors.array() }
//             )
//         }
//         else return null
//     }
// }

const validationRender = (req: Request, res: Response, htmlPage: string): Response | any => {
    const validationErrors = validationResult(req)
    if (validationErrors.isEmpty() === false) {
        switch (htmlPage) {
            case "register_warn":
                res.status(400).render(htmlPage, { record: req.body, error: validationErrors.array() })
                break;
            case "login_warn":
                res.status(400).render(htmlPage, { record: req.body, error: validationErrors.array() })
                break;
            default:
                break;
        }
        return validationErrors
    }
    return null

}

export { validationRender }