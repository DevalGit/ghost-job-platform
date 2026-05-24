import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  Divider,
} from "@mui/material";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";
import SocialButtons from "../components/auth/SocialButtons";

export default function Login() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Enter a valid email";

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Login successful");
    }, 1200);
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Login to continue your job search."
    >
      <Box component="form" onSubmit={handleSubmit}>
        <AuthInput
          label="Email Address"
          name="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          helperText={errors.email}
        />

        <AuthInput
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          helperText={errors.password}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 1,
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                name="remember"
                checked={form.remember}
                onChange={handleChange}
              />
            }
            label="Remember me"
          />

          <Typography
            component="a"
            href="#"
            sx={{ textDecoration: "none", color: "primary.main" }}
          >
            Forgot password?
          </Typography>
        </Box>

        <AuthButton loading={loading}>Login</AuthButton>

        <Divider sx={{ my: 3 }}>or</Divider>

        <SocialButtons />

        <Typography textAlign="center" mt={4}>
          Don&apos;t have an account?{" "}
          <Typography
            component={Link}
            to="/register"
            color="primary"
            fontWeight={700}
            sx={{ textDecoration: "none" }}
          >
            Register
          </Typography>
        </Typography>
      </Box>
    </AuthLayout>
  );
}