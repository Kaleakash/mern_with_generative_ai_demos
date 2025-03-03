// filepath: /src/apiService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getDepartments = async () => {
  const response = await axios.get(`${API_URL}/departments`);
  return response.data;
};

export const getStudents = async () => {
  const response = await axios.get(`${API_URL}/students`);
  return response.data;
};

export const addDepartment = async (department) => {
  const response = await axios.post(`${API_URL}/departments`, department);
  return response.data;
};

export const addStudent = async (student) => {
  const response = await axios.post(`${API_URL}/students`, student);
  return response.data;
};