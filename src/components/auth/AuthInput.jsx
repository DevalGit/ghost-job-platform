import { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

export default function AuthInput({
  label,
  name,
  type = "text",
  value,
  error,
  helperText,
  onChange,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <TextField
      fullWidth
      label={label}
      name={name}
      type={isPassword && !showPassword ? "password" : "text"}
      value={value}
      onChange={onChange}
      error={Boolean(error)}
      helperText={helperText}
      margin="normal"
      variant="outlined"
      InputProps={{
        endAdornment: isPassword ? (
          <InputAdornment position="end">
            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
    />
  );
}