import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';

export const getMain = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/main`);
  return response.data;
};

// 제품 업로드 API
export const uploadProduct = async productData => {
  const response = await axios.post(
    `${API_BASE_URL}/api/product/upload`,
    productData,
  );
  return response.data;
};

// 제품 파일 업로드 API
export const uploadProductFiles = async fileData => {
  const response = await axios.post(
    `${API_BASE_URL}/api/product/file/upload`,
    fileData,
  );
  return response.data;
};
