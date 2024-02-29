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

// export const comentsPost = async(req, res) => {
//     const { descriptionComent } = req.body;
//     const coments = new coments({ descriptionComent });

//     await coments.save();

//     res.status(200).json({
//         coments
//     });
// }

export const comentsPost = async(req, res) => {
    const { descriptionComent } = req.body;

    try {
        if (!descriptionComent) {
            return res.status(400).json({
                msg: 'The description of the comment is required'
            });
        }

        const comentario = new Comentario({
            descriptionComent,
            idUser: req.usuario._id,
            idPublication: req.idPublication
        });
        s
        await comentario.save();

        res.status(200).json({
            msg: 'Comment added successfully',
            comentario
        });
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Error creating comment' });
    }
};




export const getComentsById = async(req, res) => {
    const { id } = req.params;
    const coments = await Coments.findOne({ _id: id });

    res.status(200).json({
        coments
    })
}

export const comentsPut = async(req, res = response) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;

    await Coments.findByIdAndUpdate(id, resto);

    const coments = await Coments.findOne({ _id: id });

    res.status(200).json({
        msg: 'Updated Publication',
        coments
    });
}


export const comentsDelete = async(req, res) => {
    const { id } = req.params;

    const coments = await Coments.findByIdAndUpdate(id, { estado: false });
    const comentsAutentic = req.coments;

    res.status(200).json({ msg: 'Coment to delete', coments, comentsAutentic });
}