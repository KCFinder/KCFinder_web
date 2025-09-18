import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';

export const findMyKc = async (userCode, page) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/product/list/${userCode}/${page}`,
  );
  if (response.data.code === 1) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
};
