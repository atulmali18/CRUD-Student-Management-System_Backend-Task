const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stuedentSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    batchCode: {
        type: String,
        required: true
    },
    joiningDate: {
        type: Date,
        default: Date.now
    },
    remarks: {
        type: String

    }
});

module.exports = student = mongoose.model("student", stuedentSchema);