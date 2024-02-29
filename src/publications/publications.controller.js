import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import Publications from './publications.model.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import jwt from 'jsonwebtoken';
import Usuario from '../users/user.model.js';

export const publicationsGet = async(req = request, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };
    const [total, publications] = await Promise.all([
        Publications.countDocuments(query),
        Publications.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        publications
    });
}

export const publicationsPost = async(req, res) => {
    const user = req.usuario;
    const { title, category, description } = req.body;

    try {
        const publication = new Publications({
            title,
            category,
            description,
            idUser: user.email
        });

        await publication.save();

        res.status(200).json({
            msg: 'Publication added successfully',
            publication
        });
    } catch (error) {
        console.error('Error creating publication:', error);
        res.status(500).json({ error: 'Error creating publication' });
    }
};

export const getPublicationsById = async(req, res) => {
    const { id } = req.params;
    const publications = await Publications.findOne({ _id: id });

    res.status(200).json({
        publications
    })
}

export const publicationsPut = async(req, res) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;

    try {
        const token = req.header("x-token");
        if (!token) {
            return res.status(401).json({ msg: "There is no token in the request" });
        }

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            return res.status(401).json({ msg: 'User does not exist in the database' });
        }

        await Publications.findByIdAndUpdate(id, resto);

        const publications = await Publications.findOne({ _id: id });

        res.status(200).json({ msg: 'Updated Publication', publications });
    } catch (error) {
        console.error('Error updating publication:', error);
        res.status(500).json({ error: 'Error updating publication' });
    }
};

export const publicationsDelete = async(req, res) => {
    const { id } = req.params;

    try {
        const token = req.header("x-token");
        if (!token) {
            return res.status(401).json({ msg: "There is no token in the request" });
        }

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            return res.status(401).json({ msg: 'User does not exist in the database' });
        }

        const publication = await Publications.findByIdAndUpdate(id, { estado: false });
        if (!publication) {
            return res.status(404).json({ msg: 'Publication not found' });
        }

        res.status(200).json({ msg: 'Publication deleted successfully', publication, usuario });
    } catch (error) {
        console.error('Error deleting publication:', error);
        res.status(500).json({ error: 'Error deleting publication' });
    }
};