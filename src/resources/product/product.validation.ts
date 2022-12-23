import { body, query, param } from 'express-validator'
const ProductValidator = {
    create() {
        return [
            body('name')
                .notEmpty({ ignore_whitespace: true }).withMessage("You must write a product name")
                .isLength({ min: 2, max: 30 }).withMessage("Product name must include 2-30 characters"),
            body('desc')
                .notEmpty({ ignore_whitespace: true }).withMessage("You must write a description")
                .isLength({ min: 2, max: 120 }).withMessage("Description must include 2-120 characters"),
            body('stock')
                .notEmpty({ ignore_whitespace: true }).withMessage("You must write a stock amount")
                .isNumeric().withMessage("Stock must be number"),
            body('price')
                .notEmpty({ ignore_whitespace: true }).withMessage("You must write a price")
                .isNumeric().withMessage("Price must be number")
        ]
    }
}

export default ProductValidator