const mongoose = require("mongoose");

const filmSchema = new mongoose.Schema ({
    filmName: {
        type: String,
        required: true,
        trim: true,
    },

    directorName: {
        type: String,
        required: true,
        trim: true,        
    },

    leadActor: {
        type: String,
        required: true,
        trim: true, 
    },

    filmLanguage: {
        type: String,
        required: true,
        trim: true, 
    },

}, { timestamps: true })

module.exports = mongoose.model("Film", filmSchema)