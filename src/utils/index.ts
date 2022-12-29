import { validationResult, ValidationError } from "express-validator"
import { Router, Request, Response, NextFunction } from 'express';




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
            case "p_create_warn":
                res.status(400).render(htmlPage, { record: req.body, error: validationErrors.array() })
                break;
            case "adress_create_warn":
                res.status(400).render(htmlPage, { record: req.body, error: validationErrors.array() })
                break;
            default:
                break;
        }
        return validationErrors
    }
    return null

}
const validateTcNumber = (value: number | string) => {
    value = String(value);

    // T.C. identity number should have 11 digits and first should be non-zero.
    if (!(/^[1-9]\d{10}$/).test(value)) return false;

    const digits = value.split('');
    // store last 2 digits (10th and 11th) which are actually used for validation
    const d10 = Number(digits[9]);
    const d11 = Number(digits[10]);
    // we'll also need the sum of first 10 digits for validation
    let sumOf10: number | string = 0;
    let evens: number | string = 0;
    let odds: number | string = 0;

    digits.forEach((d: any, index) => {
        d = Number(d);
        if (index < 10) sumOf10 += d;
        if (index < 9) {
            if ((index + 1) % 2 === 0) {
                evens += d;
            } else {
                odds += d;
            }
        }
    });

    // check if the unit-digit of the sum of first 10 digits equals to the 11th digit.
    if (sumOf10 % 10 !== d11) return false;

    // check if unit-digit of the sum of odds * 7 and evens * 9 is equal to 10th digit.
    if (((odds * 7) + (evens * 9)) % 10 !== d10) return false;

    // check if unit-digit of the sum of odds * 8 is equal to 11th digit.
    if ((odds * 8) % 10 !== d11) return false;

    return true;
}
export { validationRender, validateTcNumber }