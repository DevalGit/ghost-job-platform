import { Box, Container, Grid, Typography } from "@mui/material";

const stats = [
  ["25K+", "Total Jobs"],
  ["4.8K+", "Companies"],
  ["120K+", "Candidates"],
  ["18K+", "Successful Hires"],
];

export default function StatsSection() {
  return (
    <Box sx={{ py: 8, background: "linear-gradient(135deg, #2563eb, #0ea5e9)", color: "white" }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {stats.map(([number, label]) => (
            <Grid item xs={6} md={3} textAlign="center" key={label}>
              <Typography variant="h3" fontWeight={900}>
                {number}
              </Typography>
              <Typography sx={{ opacity: 0.9 }}>{label}</Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}