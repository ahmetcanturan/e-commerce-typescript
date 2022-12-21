// import { Request} from 'express';
// import { body, query, param } from 'express-validator'
// import UserService from "../resources/user/user.service"

// const userService=new UserService()
// const userValidator = {
//     create() {
//         return [
//             body('name')
//                 .notEmpty({ ignore_whitespace: true }).withMessage("You must write an username")
//                 .isLength({ min: 2, max: 20 }).withMessage("Username must include 2-20 characters"),
//             body('surname')
//                 .notEmpty({ ignore_whitespace: true }).withMessage("You must write an username")
//                 .isLength({ min: 3, max: 20 }).withMessage("Username must include 3-20 characters"),
//             body('email').isEmail().withMessage("Invalid email.")
//                  .custom(async (value:string|number):Promise<boolean|Error>=> {
//                     const result = await userService.findOne({ email: value })
//                     if (result) throw new Error('This username is already in use')
//                     return true
//                 }),
//             body('password')
//                 .notEmpty({ ignore_whitespace: true }).withMessage("You must write a password")
//                 .isLength({ min: 7, max: 30 }).withMessage("Password must include 7-30 characters"),
//         ]
//     }
// }

// export default userValidator