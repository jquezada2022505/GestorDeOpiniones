import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "The username is required"],
    },
    email: {
        type: String,
        required: [true, "Email is mandatory"],
        unique: true,
    },
    nuevoEmail: {
        type: String,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    nuevoPassword: {
        type: String,
    },
    img: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true,
    }
});

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

export default mongoose.model('User', UserSchema);