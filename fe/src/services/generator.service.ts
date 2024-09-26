import axios from "axios";
import { GeneratorParams, GeneratorResponse } from "../interfaces/generator.interface";

const API_URL = "http://localhost:3000/generator";

export const generateNumbers = async (params: GeneratorParams): Promise<GeneratorResponse> => {
  try {
    const response = await axios.post<GeneratorResponse>(API_URL, params, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error generating numbers:", error);
    throw error;
  }
};

export const downloadFile = async (fileName: string): Promise<Blob> => {
  try {
    const response = await axios.get(`${API_URL}/download/${fileName}`, {
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    console.error("Error downloading file:", error);
    throw error;
  }
};
