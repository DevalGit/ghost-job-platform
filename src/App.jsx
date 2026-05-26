import { useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/navbar/Navbar";
import Jobs from "./pages/Jobs";
import About from "./pages/AboutPage";
import Contact from "./pages/ContactUs"
import CompaniesPage from "./pages/Companies";
import UserDashboard from "./pages/Dashboard";
import EmployerDashboard from "./pages/EmployeerDashboard";
export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: "#2563eb",
          },
          background: {
            default: darkMode ? "#020617" : "#f6f8fb",
            paper: darkMode ? "#0f172a" : "#ffffff",
          },
        },
        typography: {
          fontFamily: "Inter, Arial, sans-serif",
        },
        shape: {
          borderRadius: 14,
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Navbar
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
        isLoggedIn={true}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs/>} />
          <Route path="/companies" element={<CompaniesPage/>} />
      
        <Route path="/About" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Udashboard" element={<UserDashboard />} />
        <Route path="/Edashboard" element={<EmployerDashboard/>} />
      </Routes>
    </ThemeProvider>
  );
}