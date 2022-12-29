import { body, query, param } from 'express-validator'
import AdressService from "./adress.service"
import { validateTcNumber } from "../../utils/index"
const adressValidator = {
    create() {
        return [
            body('name')
                .isLength({ min: 2, max: 30 }).withMessage("adressname must include 2-30 characters"),
            body('surname')
                .isLength({ min: 2, max: 30 }).withMessage("Surname must include 2-30 characters"),
            body("adressName")
                .isLength({ min: 1, max: 35 }).withMessage("Adres Başlığı 35 karakteri aşamaz"),
            body("country")
                .isLength({ min: 1, max: 35 }).withMessage("Ülke adı 35 karakteri aşamaz"),
            body("city")
                .isLength({ min: 1, max: 35 }).withMessage("Ülke adı 35 karakteri aşamaz"),
            body("adress")
                .isLength({ min: 1, max: 200 }).withMessage("Adres adı 200 karakteri aşamaz"),
            body("zipCode")
                .isLength({ min: 5, max: 5 }).withMessage("Posta Kodu 5 basamaklı olmak zorunda")
                .custom(async (value: number, { req }) => {
                    if (value >= 82000) {
                        throw new Error('Hatalı Bir Posta Kodu Girdiniz')
                    }
                    return true
                }),
            body('tc')
                .custom(async (value, { req }) => {
                    if (validateTcNumber(value) === false) {
                        throw new Error('Geçersiz TC Numarası')
                    }
                    return true
                }),
            body('phone')
                .notEmpty({ ignore_whitespace: true }).withMessage("Telefon numarası alanı boş bırakılamaz!")
                .custom(async (value, { req }) => {
                    const pattern = /^(5)([0-9]{2})\s?([0-9]{3})\s?([0-9]{2})\s?([0-9]{2})$/
                    if (!String(value).match(pattern)) { throw new Error("Telefon numarası bu şekilde olmalı: 5xxxxxxxxx") }
                    return true
                }),

        ]
    }
}

export default adressValidator