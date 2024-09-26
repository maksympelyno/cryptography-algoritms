import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Generator from "./components/Generator";
import MD5 from "./components/MD5";
import { Box, Container } from "@mui/material";

function App() {
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#121212",
          color: "#fff",
        }}
      >
        <Header />
        <Container
          maxWidth="lg"
          sx={{
            flexGrow: 1,
            mt: 2,
            backgroundColor: "#1e1e1e",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generator" element={<Generator />} />
            <Route path="/md5" element={<MD5 />} />
          </Routes>
        </Container>
      </Box>
    </>
  );
}

export default App;
