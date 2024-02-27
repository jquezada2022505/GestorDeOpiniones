import { Router } from "express";
import { check } from "express-validator";
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
    "/", [
        check("descriptionComent", "The description is obligatory").not().isEmpty(),
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