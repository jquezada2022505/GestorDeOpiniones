import bcryptjs from 'bcryptjs';
import Usuario from '../users/user.model.js'
import { generarJWT } from '../helpers/generate-jwt.js';
import validator from 'validator';

export const login = async(req, res) => {
    const { emailOrUsername, password } = req.body;

    try {
        let usuario;
        if (validator.isEmail(emailOrUsername)) {
            usuario = await Usuario.findOne({ email: emailOrUsername });
        } else {
            usuario = await Usuario.findOne({ username: emailOrUsername });
        }

        if (!usuario) {
            return res.status(400).json({
                msg: "Incorrect credentials, email or username does not exist in the database",
            });
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "Password is incorrect",
            });
        }

        const token = await generarJWT(usuario.id);

        res.status(200).json({
            msg: 'Successful login',
            usuario,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Contact the administrator",
        });
    }
}