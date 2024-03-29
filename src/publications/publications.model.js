import mongoose, { model } from 'mongoose';
const Schema = mongoose.Schema;

const PublicationsSchema = mongoose.Schema({
    idUser: {
        type: String,
        ref: "User",
        required: [true, "The User is obligatory"],
    },
    title: {
        type: String,
        required: [true, "The title is obligatory"],
    },
    category: {
        type: String,
        required: [true, "The category is obligatory"],
    },
    description: {
        type: String,
        required: [true, "The description is obligatory"],
    },
    idComent: {
        type: String,
        ref: "Coment",
    },
    img: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true,
    }
});

export default mongoose.model('Publications', PublicationsSchema);