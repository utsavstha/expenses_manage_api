const mongoose = require("mongoose");
const validator = require("validator");

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter ticket name"],
    },
    description: {
        type: String,
        required: [true, "Please enter ticket description"],
    },


});