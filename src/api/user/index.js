import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';

export const signUp = async formData => {
  const response = await axios.post(
    `${API_BASE_URL}/api/user/signup`,
    formData,
  );
  console.log('🚀 ~ signUp ~ response:', response);
  return response.data;
};

export const signIn = async formData => {
  const response = await axios.post(
    `${API_BASE_URL}/api/user/signin`,
    formData,
  );
  return response.data;
};

export const checkId = async userId => {
  const response = await axios.get(
    `${API_BASE_URL}/api/user/dup-check/${userId}`,
  );
  console.log('🚀 ~ checkId ~ response:', response.data);
  if (response.data.code === 1) {
    return response.data;
  }
  if (response.data.code === -1) {
    return response.data;
  }
};
