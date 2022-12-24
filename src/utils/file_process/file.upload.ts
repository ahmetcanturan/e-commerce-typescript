import { Request } from 'express'
import { UploadedFile } from 'express-fileupload'

const mimeTypes: string[] = ["image/jpeg", "image/jpg", "image/png"]
const limit: number = 10485760 // *10mb
async function fileUpload(req: Request): Promise<object> {
    const img = req.files.image as UploadedFile

    if (mimeTypes.includes(img.mimetype)) {
        if (img.size <= limit) {
            const randomName: string = `${Date.now()}_${Math.random().toString(36)}_${img.name[0]}.jpg`
            img.mv('./src/public/uploads/' + randomName)
            return { status: true, imgName: randomName, message: "Photo is uploaded." }
        }
        else {
            console.log()
            return { status: false, message: "photo transcends size limits->Limit:10MB" }
        }
    }
    else {
        return { status: false, message: "photo is not in proper format-> jpeg-jpg-png" }
    }
}

export default fileUpload