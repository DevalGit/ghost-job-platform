import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function Footer() {
  return (
    <Box sx={{ py: 6, bgcolor: "#0f172a", color: "white" }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" fontWeight={900}>
              JobPortal
            </Typography>
            <Typography sx={{ mt: 2, opacity: 0.75 }}>
              A premium platform connecting talent with verified companies.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography fontWeight={800}>Quick Links</Typography>
            <Typography sx={{ mt: 2, opacity: 0.75 }}>Home</Typography>
            <Typography sx={{ opacity: 0.75 }}>Jobs</Typography>
            <Typography sx={{ opacity: 0.75 }}>Companies</Typography>
            <Typography sx={{ opacity: 0.75 }}>Contact</Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography fontWeight={800}>Contact</Typography>
            <Typography sx={{ mt: 2, opacity: 0.75 }}>
              support@jobportal.com
            </Typography>
            <Typography sx={{ opacity: 0.75 }}>Berlin, Germany</Typography>

            <Box sx={{ mt: 2 }}>
              <IconButton sx={{ color: "white" }}>
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ color: "white" }}>
                <LinkedInIcon />
              </IconButton>
              <IconButton sx={{ color: "white" }}>
                <TwitterIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Typography textAlign="center" sx={{ mt: 5, opacity: 0.6 }}>
          © 2026 JobPortal. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}