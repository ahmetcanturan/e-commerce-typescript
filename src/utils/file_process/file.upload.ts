import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'
type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void


export const fileStorage = multer.diskStorage({
    destination: (
        request: Request,
        file: Express.Multer.File | undefined,
        callback: DestinationCallback
    ): void => {
        callback(null, './src/public/uploads')
    },

    filename: (
        req: Request,
        file: Express.Multer.File | undefined,
        callback: FileNameCallback
    ): void => {
        const randomName = `${Date.now()}_${Math.random().toString(36)}_${file.fieldname}_${file.originalname[0]}.png`
        callback(null, randomName)
    }
})
export const fileFilter = (
    request: Request,
    file: Express.Multer.File | undefined,
    callback: FileFilterCallback
): void => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        callback(null, true)
    } else {
        callback(null, false)
    }
}
// const mimeTypes = ['image/png', 'image/jpg', 'image/jpeg']
// const storage = multer.diskStorage({// ? diskStore diske depolanacak anlamına gelir
//     destination(req, file, cb) {
//         console.log(file.mimetype)
//         cb(null, './public/uploads')
//     },
//     filename(req, file, cb) {// ? isim çakışmalarını önlemek için aşağısı yapılıyor
//         const randomName = `${Date.now()}_${Math.random().toString(36)}_${file.fieldname}_${file.originalname[0]}.png`
//         cb(null, randomName)
//     }
// })

// const fileFilter = (req: Request, file: Express.Multer.File | undefined, cb: any) => {// ?  Alacağımız dosyaların filtrelenmesi için middeleware
//     if (mimeTypes.includes(file.mimetype)) {
//         cb(null, true)
//         return
//     }
//     return cb(({ message: "Sadece image olan 'jpg','jpeg' ve 'png' formatları desteklenir!" }), false)
// }
// const upload = multer({ storage, fileFilter, limits: { fileSize: 10 } }).single('image')
// export default upload