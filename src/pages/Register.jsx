import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Divider } from "@mui/material";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";
import SocialButtons from "../components/auth/SocialButtons";

export default function Register() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";

    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Enter a valid email";

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!form.confirmPassword)
      newErrors.confirmPassword = "Confirm your password";
    else if (form.confirmPassword !== form.password)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Registration successful");
    }, 1200);
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Join JobPortal and start applying today."
    >
      <Box component="form" onSubmit={handleSubmit}>
        <AuthInput
          label="Full Name"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          error={errors.fullName}
          helperText={errors.fullName}
        />

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

        <AuthInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          helperText={errors.confirmPassword}
        />

        <AuthButton loading={loading}>Create Account</AuthButton>

        <Divider sx={{ my: 3 }}>or</Divider>

        <SocialButtons />

        <Typography textAlign="center" mt={4}>
          Already have an account?{" "}
          <Typography
            component={Link}
            to="/login"
            color="primary"
            fontWeight={700}
            sx={{ textDecoration: "none" }}
          >
            Login
          </Typography>
        </Typography>
      </Box>
    </AuthLayout>
  );
}