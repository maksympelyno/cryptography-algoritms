import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#333", // Dark grey background
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
        py: 1,
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#FFD700" }}>
          Безпека Даних
        </Typography>
        <Button color="inherit" component={Link} to="/" sx={{ ml: 2, color: "#FFD700" }}>
          Головна
        </Button>
        <Button color="inherit" component={Link} to="/generator" sx={{ ml: 2, color: "#FFD700" }}>
          Генератор
        </Button>
        <Button color="inherit" component={Link} to="/md5" sx={{ ml: 2, color: "#FFD700" }}>
          MD5
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
