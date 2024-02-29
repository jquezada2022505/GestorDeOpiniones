import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ComentsSchema = mongoose.Schema({
    idUser: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "The User is obligatory"],
    },
    idPublication: {
        type: Schema.Types.ObjectId,
        ref: "Publications",
        required: [true, "The publication is obligatory"],
    },
    descriptionComent: {
        type: String,
        required: [true, "The description is obligatory"],
    },
    img: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true,
    }
});

export default mongoose.model('Coments', ComentsSchema);