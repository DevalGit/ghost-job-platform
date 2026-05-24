import { Stack, Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function SocialButtons() {
  return (
    <Stack spacing={2} mt={3}>
      <Button
        fullWidth
        variant="outlined"
        startIcon={<GoogleIcon />}
        sx={{ py: 1.2, textTransform: "none", borderRadius: 3 }}
      >
        Continue with Google
      </Button>

      <Button
        fullWidth
        variant="outlined"
        startIcon={<LinkedInIcon />}
        sx={{ py: 1.2, textTransform: "none", borderRadius: 3 }}
      >
        Continue with LinkedIn
      </Button>
    </Stack>
  );
}