import { Router } from "express";
import { check } from "express-validator";
import {
    publicationsGet,
    publicationsPost,
    getPublicationsById,
    publicationsPut,
    publicationsDelete
} from "./publications.controller.js";
import {
    existePublicationsById,
} from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import express from 'express';
import { validarJWT } from '../middlewares/validar-jwt.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/publications', validarJWT, publicationsPost);

router.get("/", publicationsGet);

router.get(
    "/:id", [
        check("id", "The ID entered is not valid").isMongoId(),
        check("id").custom(existePublicationsById),
        validarCampos,
    ],
    getPublicationsById
);

router.post(
    "/", [
        check("title", "The title is obligatory").not().isEmpty(),
        check("category", "The category is obligatory").not().isEmpty(),
        check("description", "The description is obligatory").not().isEmpty(),
        validarJWT,
        validarCampos,
    ],
    publicationsPost
);

router.put(
    "/:id", [
        check("id", "The ID entered is not valid").isMongoId(),
        check("id").custom(existePublicationsById),
        validarJWT,
        validarCampos,
    ],
    publicationsPut
);

router.delete(
    "/:id", [
        check("id", "The ID entered is not valid").isMongoId(),
        check("id").custom(existePublicationsById),
        validarCampos,
    ],
    publicationsDelete
);

export default router;