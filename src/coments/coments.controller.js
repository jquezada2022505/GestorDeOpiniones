import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import Coments from './coments.model.js';

export const comentsGet = async(req = request, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };
    const [total, coments] = await Promise.all([
        Coments.countDocuments(query),
        Coments.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        coments
    });
}

export const comentsPost = async(req, res) => {
    const { descriptionComent } = req.body;
    const coments = new coments({ descriptionComent });

    await coments.save();

    res.status(200).json({
        coments
    });
}

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