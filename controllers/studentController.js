import mongoose from "mongoose";
import { Student } from "../models/studentModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createStudent = async (req, res) => {
    try {
        const { name, rollNumber, branch, cgpa } = req.body;
        const student = new Student({
            name,
            rollNumber: String(rollNumber),  // Convert to string
            branch,
            cgpa
        });
        await student.save();
        res.status(201).json(new ApiResponse(201, student));
    } catch (err) {
        throw new ApiError(400, err?.message || 'Bad Request in creating student');
    }
};

export const fetchStudents = async (req, res) => {
    try {
        const students = await Student.find({});
        res.status(200).json(new ApiResponse(200, students));
    } catch (error) {
        throw new ApiError(400, error?.message || 'Bad Request in fetching students');
    }
};

export const fetchStudentById = async (req, res) => {
    try {
        const { rollNumber } = req.params;
        if (!rollNumber || typeof rollNumber !== "string") {
            return res.status(400).json({
              error: "Invalid studentId",
            });
        }

        const student = await Student.findOne({ rollNumber: rollNumber });
        if (!student) {
            throw new ApiError(404, 'Student not found');
        }
        res.status(200).json(new ApiResponse(200, student));
    } catch (error) {
        if (error instanceof ApiError && error.statusCode === 404) {
            return res.status(404).json({
                error: error.message,
            });
        }
        res.status(400).json({
            error: error?.message || 'Bad Request in fetching student',
        });
    }
};


export const deleteStudent = async (req, res) => {
    try {
        const rollNumber = String(req.params.rollNumber);  // Convert to string
        const student = await Student.findOneAndDelete({ rollNumber });
        if (!student) {
            throw new ApiError(404, 'Student not found');
        }
        res.status(200).json(new ApiResponse(200, student));
    } catch (err) {
        throw new ApiError(400, err?.message || 'Bad Request in deleting student');
    }
};

export const updateStudent = async (req, res) => {
    try {
        const rollNumber = req.params.rollNumber; 
        const student = await Student.findOneAndUpdate(
            { rollNumber },
            { $set: req.body },
            { new: true }
        );
        if (!student) {
            throw new ApiError(404, 'Student not found');
        }
        res.status(200).json(new ApiResponse(200, student));
    } catch (error) {
        throw new ApiError(400, error?.message || 'Bad Request in updating student');
    }
};
