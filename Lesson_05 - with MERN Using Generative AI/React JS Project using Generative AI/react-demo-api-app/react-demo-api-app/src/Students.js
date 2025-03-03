// filepath: /src/Students.js
import React, { useEffect, useState } from 'react';
import { getStudents } from './apiService';

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const data = await getStudents();
      setStudents(data);
    };
    fetchStudents();
  }, []);

  return (
    <div>
      <h2>Students</h2>
      <ul>
        {students.map(student => (
          <li key={student.id}>{student.studentName}</li>
        ))}
      </ul>
    </div>
  );
};

export default Students;