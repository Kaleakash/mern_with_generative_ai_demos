import React, { useState, useEffect } from 'react';
import { addStudent, getDepartments } from './apiService';

const AddStudent = () => {
  const [studentName, setStudentName] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      const data = await getDepartments();
      setDepartments(data);
    };
    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newStudent = { studentName, departmentId: parseInt(departmentId) };
    await addStudent(newStudent);
    setStudentName('');
    setDepartmentId('');
  };

  return (
    <div>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Student Name"
          required
        />
        <select
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}
          required
        >
          <option value="">Select Department</option>
          {departments.map(department => (
            <option key={department.id} value={department.id}>
              {department.departmentName}
            </option>
          ))}
        </select>
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
