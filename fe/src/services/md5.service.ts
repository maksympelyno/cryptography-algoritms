// md5Service.ts
import axios from "axios";

const API_URL = "http://localhost:3000/md5";

export const hashString = async (input: string) => {
  const response = await axios.get(`${API_URL}/hash?input=${input}`);
  return response.data;
};

export const hashFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await axios.post(`${API_URL}/file-hash`, formData);
  return response.data;
};

export const verifyFile = async (file: File, expectedHash: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("expectedHash", expectedHash);
  const response = await axios.post(`${API_URL}/verify-file`, formData);
  return response.data;
};
