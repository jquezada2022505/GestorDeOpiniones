import { Router } from "express";
import { check } from "express-validator";
import {
    usuariosGet,
    usuariosPost,
    getUsuarioById,
    usuariosPut,
} from "./user.controller.js";
import {
    existenteEmail,
    esRoleValido,
    existeUsuarioById,
} from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import { tieneRole } from "../middlewares/validar-roles.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/", usuariosGet);

router.get(
    "/:id", [
        check("id", "The ID entered is not valid").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos,
    ],
    getUsuarioById
);

router.post(
    "/", [
        check("username", "The username is required").not().isEmpty(),
        check("password", "Password must be greater than 6 characters").isLength({
            min: 6,
        }),
        check("email", "The email entered is not valid ").isEmail(),
        check("email").custom(existenteEmail),
        check("role").custom(esRoleValido),
        validarCampos,
    ],
    usuariosPost
);

router.put(
    "/:id", [
        check("id", "The ID entered is not valid").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos,
    ],
    usuariosPut
);

export default router;