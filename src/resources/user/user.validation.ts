import { body, query, param } from 'express-validator'
import UserService from "./user.service"

const userService = new UserService()
const userValidator = {
    create() {
        return [
            body('name')
                .notEmpty({ ignore_whitespace: true }).withMessage("You must write an username")
                .isLength({ min: 2, max: 30 }).withMessage("Username must include 2-30 characters"),
            body('surname')
                .notEmpty({ ignore_whitespace: true }).withMessage("You must write an surname")
                .isLength({ min: 2, max: 30 }).withMessage("Surname must include 2-30 characters"),
            body('email').isEmail().withMessage("Invalid email.")
                .custom(async (value: string | number): Promise<boolean | Error> => {
                    const result = await userService.findOne({ email: value })
                    if (result) throw new Error('This username is already in use')
                    return true
                }),
            body('password')
                .notEmpty({ ignore_whitespace: true }).withMessage("You must write a password")
                .isLength({ min: 7, max: 30 }).withMessage("Password must include 7-30 characters"),
        ]
    },
    login() {
        return [
            body('email').isEmail().withMessage("Invalid email.")
                .custom(async (value: string | number, { req }): Promise<boolean | Error> => {
                    const result = await userService.findOne({ email: value })
                    const pass = req?.body?.password
                    if (!result) throw new Error("You entered a wrong email")
                    else if (pass === undefined) throw new Error("You didn't enter a password")
                    else if (await result.isValidPassword(pass)) {
                        req.localId = result._id
                        return true
                    }
                    else throw new Error("You entered a wrong password")
                })
        ]
    }
}

export default userValidator