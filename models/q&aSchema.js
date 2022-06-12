const mongoose = require("mongoose");

const qaSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        details: {
            type: String,
            required: false,
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("Q&A", qaSchema);
