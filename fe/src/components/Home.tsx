import React from "react";
import { Button, Container, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Container sx={{ mt: 4, textAlign: "center", py: 4 }}>
      <Typography variant="h3" gutterBottom sx={{ color: "#FFD700" }}>
        Вітаємо на головній сторінці!
      </Typography>
      <Typography variant="h6" paragraph sx={{ color: "#ccc" }}>
        Розпочніть свою подорож, обравши один з наступних розділів:
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {[...Array(5)].map((_, index) => (
          <Grid item xs={12} sm={4} md={2} key={index}>
            <Button
              variant="contained"
              color="warning"
              fullWidth
              onClick={() => handleNavigation(`/generator`)}
              sx={{ mb: 2, borderRadius: "20px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)" }}
            >
              Розділ {index + 1}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
