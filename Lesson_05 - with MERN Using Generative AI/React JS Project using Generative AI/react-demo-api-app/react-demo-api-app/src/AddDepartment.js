// filepath: /src/AddDepartment.js
import React, { useState } from 'react';
import { addDepartment } from './apiService';

const AddDepartment = () => {
  const [departmentName, setDepartmentName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDepartment = { departmentName };
    await addDepartment(newDepartment);
    setDepartmentName('');
  };

  return (
    <div>
      <h2>Add Department</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
          placeholder="Department Name"
          required
        />
        <button type="submit">Add Department</button>
      </form>
    </div>
  );
};

export default AddDepartment;