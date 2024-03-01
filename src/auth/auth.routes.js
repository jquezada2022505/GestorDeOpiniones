import { Router } from "express";
import { check } from "express-validator";
import validator from 'validator';
import bcryptjs from 'bcryptjs';
import { login } from "./auth.controller.js";
import { validarCampos } from "../middlewares/validarCampos.js";

const router = Router()

router.post(
    '/login', [
        check('emailOrUsername')
        .notEmpty().withMessage('Email or username is required')
        .custom((value, { req }) => {
            if (!validator.isEmail(value)) {

            }
            return true;
        }),
        check('password', 'Password is obligatory').notEmpty(),
        validarCampos,
    ], login
);
export default router;