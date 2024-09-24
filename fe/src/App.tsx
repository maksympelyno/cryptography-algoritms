import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Generator from "./components/Generator";
import { Box, Container } from "@mui/material";

function App() {
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#121212", // Dark background
          color: "#fff", // White text color
        }}
      >
        <Header />
        <Container
          maxWidth="lg"
          sx={{
            flexGrow: 1,
            mt: 2,
            backgroundColor: "#1e1e1e", // Slightly lighter background
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generator" element={<Generator />} />
          </Routes>
        </Container>
      </Box>
    </>
  );
}

export default App;
