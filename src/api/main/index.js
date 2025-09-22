import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';

export const getMain = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/main`);
  return response.data;
};

// 제품 업로드 API
export const uploadProduct = async productData => {
  console.log('🚀 ~ uploadProduct ~ productData:', productData);
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

export const getNoticeList = async page => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/notice/list/${page}`,
  );
  if (response.data.code === 1) {
    return response.data.data;
  }
  if (response.data.code === -1) {
    return response.data;
  }
};

export const getNoticeDetail = async noticeId => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/notice/detail/${noticeId}`,
  );
  if (response.data.code === 1) {
    return response.data;
  }
  if (response.data.code === -1) {
    return response.data;
  }
};
