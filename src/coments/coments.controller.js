import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import Comentario from '../coments/coments.model.js';
import jwt from 'jsonwebtoken';
import Usuario from '../users/user.model.js';
import Publications from '../publications/publications.model.js';

export const comentsGet = async(req = request, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };
    const [total, coments] = await Promise.all([
        Comentario.countDocuments(query),
        Comentario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        coments
    });
}

export const comentsPost = async(req, res) => {
    const user = req.usuario;
    const { descriptionComent } = req.body;

    try {
        if (!descriptionComent) {
            return res.status(400).json({
                msg: 'The description of the comment is required'
            });
        }

        const comentario = new Comentario({
            descriptionComent,
            idUser: user.email,
            idPublication: req.idPublication,
        });

        await comentario.save();

        res.status(200).json({
            msg: 'Comment added successfully',
            comentario
        });
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(400).json({ error: 'Error creating comment' });
    }
};




export const getComentsById = async(req, res) => {
    const { id } = req.params;
    const comentario = await Comentario.findOne({ _id: id });

    res.status(200).json({
        comentario
    })
}

export const comentsPut = async(req, res = response) => {
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

        const comentario = await Comentario.findById(id);
        if (!comentario) {
            return res.status(404).json({ msg: 'Comment not found' });
        }

        await Comentario.findByIdAndUpdate(id, resto);

        const updatedComment = await Comentario.findOne({ _id: id });

        res.status(200).json({
            msg: 'Comment updated successfully',
            comentario: updatedComment
        });
    } catch (error) {
        console.error('Error updating comment:', error);
        res.status(400).json({ error: 'Error updating comment' });
    }
};



export const comentsDelete = async(req, res) => {
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

        const comentario = await Comentario.findByIdAndUpdate(id, { estado: false });
        if (!comentario) {
            return res.status(404).json({ msg: 'Comment not found' });
        }

        res.status(200).json({ msg: 'Comment deleted successfully', comentario, usuario });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(40).json({ error: 'Error deleting comment' });
    }
};