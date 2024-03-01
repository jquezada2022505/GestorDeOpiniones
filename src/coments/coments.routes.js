import { Router } from "express";
import { check, validationResult } from "express-validator";
import {
    comentsGet,
    comentsPost,
    getComentsById,
    comentsPut,
    comentsDelete
} from "./coments.controller.js";
import {
    existeComentsById,
} from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import express from 'express';
import { validarJWTC } from '../middlewares/validar-jwt.js';
import jwt from 'jsonwebtoken';

const router = Router();

router.get("/", comentsGet);

router.get(
    "/:id", [
        check("id", "The ID entered is not valid").isMongoId(),
        check("id").custom(existeComentsById),
        validarCampos,
    ],
    getComentsById
);

router.post(
    "/:idPublication", [
        check("descriptionComent", "The description is obligatory").not().isEmpty(),
        validarJWTC,
        validarCampos,
    ],
    comentsPost
);

router.put(
    "/:id", [
        check("id", "The ID entered is not valid").isMongoId(),
        check("id").custom(existeComentsById),
        validarCampos,
    ],
    comentsPut
);

router.delete(
    "/:id", [
        check("id", "The ID entered is not valid").isMongoId(),
        check("id").custom(existeComentsById),
        validarCampos,
    ],
    comentsDelete
);

export default router;