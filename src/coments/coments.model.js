import mongoose from 'mongoose';

const ComentsSchema = mongoose.Schema({
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
    },
    google: {
        type: Boolean,
        default: true,
    },
});

export default mongoose.model('Coments', ComentsSchema);