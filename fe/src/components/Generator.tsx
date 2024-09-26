import React, { useState } from "react";
import { Grid, TextField, Button, Paper, Typography, Box, CircularProgress } from "@mui/material";
import { downloadFile, generateNumbers } from "../services/generator.service";
import { GeneratorParams } from "../interfaces/generator.interface";
import toast, { Toaster } from "react-hot-toast";
import smallImage from "../assets/bitcoin_glasses.webp"; // Замініть шлях на ваш файл зображення

const Generator: React.FC = () => {
  const [params, setParams] = useState<GeneratorParams>({ m: -1, a: -1, c: -1, x0: -1, count: 0 });
  const [results, setResults] = useState<number[]>([]);
  const [period, setPeriod] = useState<number | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleGenerate = async () => {
    setLoading(true); // Встановлюємо стан завантаження в true
    try {
      console.log(params);
      const result = await generateNumbers(params);
      setResults(result.uniqueNumbers);
      setPeriod(result.period);
      setFileName(result.fileName);
    } catch (error) {
      console.error("Error generating numbers:", error);
      toast.error("Помилка при генерації чисел.");
    } finally {
      setLoading(false); // Скидаємо стан завантаження
    }
  };

  const handleDownload = async () => {
    if (fileName) {
      setLoading(true); // Встановлюємо стан завантаження в true
      try {
        const fileBlob = await downloadFile(fileName);
        const url = window.URL.createObjectURL(fileBlob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading file:", error);
        toast.error("Помилка при завантаженні файлу.");
      } finally {
        setLoading(false); // Скидаємо стан завантаження
      }
    } else {
      toast.error("Файл не знайдено.");
    }
  };

  const getDisplayedResults = () => {
    return results;
  };

  return (
    <>
      <Grid container spacing={4} sx={{ py: 4, position: "relative" }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={{ p: 3, backgroundColor: "#1e1e1e" }}>
            <Typography variant="h6" gutterBottom sx={{ color: "#FFD700" }}>
              Введіть параметри генератора
            </Typography>
            <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {["m", "a", "c", "x0", "count"].map((field, index) => (
                <TextField
                  key={index}
                  label={`Параметр ${field.toUpperCase()}`}
                  name={field}
                  type="number"
                  onChange={handleChange}
                  sx={{
                    borderRadius: "10px",
                    backgroundColor: "#333",
                    input: { color: "#FFD700" },
                    label: { color: "#FFD700" },
                    "& .MuiInputBase-input": {
                      color: "#FFD700",
                    },
                    "& .MuiInputBase-input:focus": {
                      color: "#FFD700",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#FFD700",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#FFD700",
                    },
                  }}
                />
              ))}
              <Button
                variant="contained"
                color="warning" // Yellow color
                onClick={handleGenerate}
                sx={{ borderRadius: "20px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)" }}
                disabled={loading} // Деактивуємо кнопку під час завантаження
              >
                Генерувати
              </Button>
              {fileName && (
                <Button
                  variant="contained"
                  color="success" // Green color
                  onClick={handleDownload}
                  sx={{ borderRadius: "20px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)" }}
                  disabled={loading} // Деактивуємо кнопку під час завантаження
                >
                  Завантажити файл
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={{ p: 3, backgroundColor: "#1e1e1e", position: "relative", zIndex: 1 }}>
            <Typography variant="h6" gutterBottom sx={{ color: "#FFD700" }}>
              Результати
            </Typography>
            {period !== null && (
              <Typography variant="subtitle1" gutterBottom sx={{ color: "#ccc" }}>
                Період: {period === -1 ? "Не знайдено" : period}
              </Typography>
            )}
            <Box sx={{ maxHeight: "400px", overflowY: "auto", p: 2 }}>
              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                  <CircularProgress color="warning" />
                </Box>
              ) : getDisplayedResults().length > 0 ? (
                <Typography sx={{ color: "#fff" }}>{getDisplayedResults().join(", ")}</Typography>
              ) : (
                <Typography sx={{ color: "#ccc" }}>Поки немає результатів</Typography>
              )}
            </Box>
          </Paper>
        </Grid>
        <Box
          component="img"
          src={smallImage}
          alt="Small decorative image"
          sx={{
            position: "absolute",
            bottom: 20,
            right: 0,
            height: 140, // Налаштуйте розмір зображення за потребою
            width: 200,
            borderRadius: "8px",
            m: 2, // Можна змінити відступи, якщо потрібно
            zIndex: -0,
          }}
        />
      </Grid>
      <Toaster
        position="bottom-right" // Налаштування позиції тостів
        toastOptions={{
          style: {
            background: "#333",
            color: "#FFD700",
            borderRadius: "8px",
            padding: "10px",
            fontSize: "14px",
          },
          success: {
            style: {
              background: "#28a745",
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "#dc3545",
              color: "#fff",
            },
          },
        }}
      />
    </>
  );
};

export default Generator;
