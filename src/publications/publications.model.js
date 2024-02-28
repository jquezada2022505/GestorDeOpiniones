import mongoose from 'mongoose';

const PublicationsSchema = mongoose.Schema({
    idUser: {
        type: Schema.Types.ObjectId,
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

export default mongoose.model('Publications', PublicationsSchema);