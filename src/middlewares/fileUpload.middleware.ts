import { Router, Request, Response, NextFunction } from 'express';
import { fileStorage, fileFilter } from "../utils/file_process/file.upload"
import multer from "multer"
async function fileUpload(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> {
    try {
        multer({ storage: fileStorage, fileFilter }).single("image")(req, res, async (err) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log(req.file.path)
                console.log(req.body.path)
                next()
            }
        })
    } catch (error) {
        // return next(new HttpException(401, 'Unauthorised'));
    }
}

export default fileUpload;

