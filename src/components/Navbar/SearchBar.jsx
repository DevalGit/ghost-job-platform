import { useState } from "react";
import {
  Box,
  InputBase,
  Paper,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const suggestions = [
  "Frontend Developer",
  "React Developer",
  "UI/UX Designer",
  "Remote Jobs",
];

export default function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <Box sx={{ position: "relative", width: { md: 280, lg: 340 } }}>
      <Paper
        elevation={0}
        sx={{
          px: 1.5,
          py: 0.8,
          display: "flex",
          alignItems: "center",
          borderRadius: 999,
          border: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.paper",
          transition: "0.25s",
          "&:focus-within": {
            borderColor: "primary.main",
            boxShadow: "0 0 0 4px rgba(37, 99, 235, 0.1)",
          },
        }}
      >
        <SearchIcon color="action" />

        <InputBase
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search jobs..."
          inputProps={{ "aria-label": "search jobs" }}
          sx={{ ml: 1, fontSize: 14 }}
        />
      </Paper>

      {query && (
        <Paper
          elevation={6}
          sx={{
            position: "absolute",
            top: 52,
            left: 0,
            right: 0,
            borderRadius: 3,
            overflow: "hidden",
            zIndex: 1300,
          }}
        >
          <List dense>
            {suggestions
              .filter((item) =>
                item.toLowerCase().includes(query.toLowerCase())
              )
              .map((item) => (
                <ListItemButton key={item}>
                  <ListItemText primary={item} />
                </ListItemButton>
              ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}