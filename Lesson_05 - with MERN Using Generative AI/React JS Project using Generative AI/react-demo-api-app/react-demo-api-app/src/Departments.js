// filepath: /src/Departments.js
import React, { useEffect, useState } from 'react';
import { getDepartments } from './apiService';

const Departments = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      const data = await getDepartments();
      setDepartments(data);
    };
    fetchDepartments();
  }, []);

  return (
    <div>
      <h2>Departments</h2>
      <ul>
        {departments.map(department => (
          <li key={department.id}>{department.departmentName}</li>
        ))}
      </ul>
    </div>
  );
};

export default Departments;