// import { Box, Container, Grid, Link, Typography } from '@mui/material';

// export default function Footer() {
//   return (
//     <Box sx={{ bgcolor: '#1f3c66', color: 'white', py: 2, mt: 1 }}>
//         <Typography variant="body2" align="center" sx={{ mt: 3 }}>
//           © {new Date().getFullYear()} IClazz. All rights reserved.
//         </Typography>
//     </Box>
//   );
// }

import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TikTokIcon from "@mui/icons-material/MusicNote"; // TikTok icon is not available in MUI, using MusicNote as a placeholder
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "#1f3c66", color: "white", py: 4, mt: "auto" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Social Media Section */}
          <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <IconButton
                href="https://facebook.com"
                target="_blank"
                rel="noopener"
                sx={{ color: "white" }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                href="https://instagram.com"
                target="_blank"
                rel="noopener"
                sx={{ color: "white" }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                href="https://tiktok.com"
                target="_blank"
                rel="noopener"
                sx={{ color: "white" }}
              >
                <TikTokIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Contact Numbers Section */}
          <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <PhoneIcon />
              <Typography variant="body1">
                <Link href="tel:+94123456789" color="inherit" underline="hover">
                  +94 123 456 789
                </Link>
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                mt: 1,
              }}
            >
              <PhoneIcon />
              <Typography variant="body1">
                <Link href="tel:+94123456789" color="inherit" underline="hover">
                  +94 987 654 321
                </Link>
              </Typography>
            </Box>
          </Grid>

          {/* Location Section */}
          <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              Location
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <LocationOnIcon />
              <Typography variant="body1">
                123 Main Street, Colombo, Sri Lanka
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <Typography variant="body2" align="center" sx={{ mt: 4 }}>
          © {new Date().getFullYear()} IClazz. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
