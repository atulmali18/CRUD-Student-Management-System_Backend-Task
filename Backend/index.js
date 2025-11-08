const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Student = require("./model/student.model");
const connectDB = require("./config/DB");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();


// Get all students
app.get("/api/students", async (req, res) => {
    try {
        const students = await Student.find({});
        res.json(students);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Error" });
    }
});

// Get a single student by ID
app.get("/api/students/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ error: "Student not found" });
        res.json(student);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Error" });
    }
});

// Add new student
app.post("/api/students", async (req, res) => {
    try {
        const { fullName, email, contactNumber, course, batchCode, joiningDate, remarks } = req.body;
        const newStudent = new Student({
            fullName,
            email,
            contactNumber,
            course,
            batchCode,
            joiningDate,
            remarks,
        });
        await newStudent.save();
        res.status(201).json({ message: "Student added", student: newStudent });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Error" });
    }
});

// Update student
app.put("/api/students/:id", async (req, res) => {
    try {
        const { fullName, email, contactNumber, course, batchCode, joiningDate, remarks } = req.body;
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            { fullName, email, contactNumber, course, batchCode, joiningDate, remarks },
            { new: true }
        );
        res.json({ message: "Student updated", student: updatedStudent });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Error" });
    }
});

// Delete student
app.delete("/api/students/:id", async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: "Student deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Error" });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥`));
