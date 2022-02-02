const mongoose = require("mongoose");
const validator = require("validator");

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter Category name"],
    }


});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;