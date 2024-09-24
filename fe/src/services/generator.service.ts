import axios from "axios";
import { GeneratorParams, GeneratorResponse } from "../interfaces/generator.interface";
import { API_URL } from "../constants";

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
      responseType: "blob", // Вказуємо, що очікуємо файл (blob)
    });
    return response.data;
  } catch (error) {
    console.error("Error downloading file:", error);
    throw error;
  }
};
