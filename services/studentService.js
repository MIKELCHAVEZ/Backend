import * as studentModel from '../models/studentModel.js';
import ValidationError from '../utils/ValidationError.js';

export const fetchAllStudents = async () => {
    const students = await studentModel.fetchAllStudents();

    return students;
}

const doesStudentExist = async (student) => {
    let existing;
    if(Object.hasOwn(student, "id")){
        existing = await studentModel.findStudentById(student.id);
    }else {
        existing = await studentModel.findStudentByNameAndSrcode(student);
    }

    if (existing.length > 0){
        return true;
    }

    return false;
}

export const createStudent = async (student) => {
    if(!student.name || !student.srcode || !student.program){
        throw new ValidationError(404, "Name, Srcode and Program are required!");
    }
    const existing = await doesStudentExist(student);
    if (existing) {
        throw new ValidationError(409, "Student already exist");
    }
        const studentId = await studentModel.insert(student);
        return studentId;
}

export const updateStudent = async (student) => {
    if(!student.name || !student.srcode || !student.program){
        throw new ValidationError(404, "Name, Srcode and Program are required!");
    }
    const existing = await doesStudentExist(student);
    if (!existing) {
        throw new ValidationError(404, "Student does not exist");
    }
    const updatedStudent = await studentModel.update(student);
    return updatedStudent;
}

export const deleteStudent = async (id) => {
    const existing = await studentModel.findStudentById(id);

    if (existing.length === 0) {
        throw new ValidationError(404, "Student does not exist");
    }
    const deletedStudent = await studentModel.deleteStudent(id);
    return deletedStudent;
}