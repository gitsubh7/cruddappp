

import express from 'express';
import {createStudent,fetchStudents,fetchStudentById,updateStudent,deleteStudent} from '../controllers/studentController.js';

const router=express.Router();
router.route("/create").post(createStudent);
router.route("/fetch").get(fetchStudents);
router.route("/fetchs/:rollNumber").get(fetchStudentById);
router.route("/update/:rollNumber").put(updateStudent);
router.route("/delete/:rollNumber").delete(deleteStudent);


export default router;