import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    age: {
        type: Number,
        required: true,
        min: 0
    },

    address: {
        type: String,
        required: true,
    },

    class: {
        type: String,
        required: true,
    }

});

const Student = mongoose.model("Student", studentSchema, "students");

export default Student;