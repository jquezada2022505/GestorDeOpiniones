import User from '../users/user.model.js';
import Publications from '../publications/publications.model.js';
import Coments from '../coments/coments.model.js';

export const existenteEmail = async(email = '') => {
    const existeEmail = await User.findOne({ email });
    if (existeEmail) {
        throw new Error(`The email ${email} has already been registered`);
    }
}

export const existeUsuarioById = async(id = '') => {
    const existUser = await User.findById(id);
    if (!existUser) {
        throw new Error(`The ID: ${email} Does not exist`);
    }
}

export const existePublicationsById = async(id = '') => {
    const existPublication = await Publications.findById(id);
    if (!existPublication) {
        throw new Error(`The ID: ${title} Does not exist`);
    }
}

export const existeComentsById = async(id = '') => {
    const existComents = await Coments.findById(id);
    if (!existComents) {
        throw new Error(`The ID: ${descriptionComent} Does not exist`);
    }
}