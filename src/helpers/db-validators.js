import Role from '../roles/roles.model.js';
import User from '../users/user.model.js';
import Publications from '../publications/publications.model.js';

export const esRoleValido = async(role = '') => {
    const existRol = await Role.findOne({ role });
    if (!existRol) {
        throw new Error(`The role ${role} does not exist in the database`);
    }
}

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