import { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import { keyframes } from "@emotion/react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PeopleIcon from "@mui/icons-material/People";

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ServiceCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
  },
}));

// Styled components
const HeroBox = styled(Box)(({ theme }) => ({
  position: "relative",
  color: "white",
  padding: "150px 0",
  textAlign: "center",
  overflow: "hidden",
  animation: `${fadeIn} 1s ease-out`,
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
      url('/tutors.jpeg') center/cover no-repeat
    `,
    zIndex: -1,
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #ff6f61, #ffcc00)",
  color: "white",
  padding: "12px 40px",
  borderRadius: "25px",
  fontWeight: "bold",
  fontSize: "16px",
  textTransform: "uppercase",
  "&:hover": {
    background: "linear-gradient(45deg, #ffcc00, #ff6f61)",
  },
}));

export default function Tutor() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    experience: "",
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  // Replace with your actual WhatsApp Business number (with country code, no + or 0)
  const WHATSAPP_BUSINESS_NUMBER = "94714279001";
  const BUSINESS_NAME = "iclazz";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendToWhatsAppBusiness = async () => {
    try {
      setLoading(true);

      const message = `*New Tutor Application for ${BUSINESS_NAME}*\n\n
        *Name:* ${formData.name}\n
        *Email:* ${formData.email}\n
        *Phone:* ${formData.phone}\n
        *Subject:* ${formData.subject}\n
        *Experience:* ${formData.experience}\n\n
        _Submitted via IClazz Website_`;

      // Create WhatsApp Business API link
      const whatsappUrl = `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(
        message
      )}`;

      // Open in new tab
      const newWindow = window.open(whatsappUrl, "_blank");

      if (
        !newWindow ||
        newWindow.closed ||
        typeof newWindow.closed === "undefined"
      ) {
        throw new Error("Popup blocked. Please allow popups for this site.");
      }

      setSnackbar({
        open: true,
        message:
          "WhatsApp is opening with your application details. Please complete the submission there.",
        severity: "success",
      });

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        experience: "",
      });
    } catch (error) {
      console.error("Error sending to WhatsApp:", error);
      setSnackbar({
        open: true,
        message:
          error instanceof Error
            ? error.message
            : "Failed to open WhatsApp. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendToWhatsAppBusiness();
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box>
      {/* Hero Section */}
      <HeroBox>
        <Container>
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "2.5rem", sm: "4rem" },
              lineHeight: "1.2",
              mb: 3,
            }}
          >
            Become a Tutor
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
              mb: 5,
            }}
          >
            Share your knowledge and earn with IClazz
          </Typography>
          <GradientButton variant="contained" href="#apply">
            Apply Now
          </GradientButton>
        </Container>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "100px",
            background: "white",
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 80%)",
          }}
        />
      </HeroBox>

      {/* Benefits Section (unchanged from your original) */}
      <Box sx={{ py: 8, backgroundColor: "#f5f5f5" }}>
        <Container>
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{
              fontWeight: "bold",
              mb: 6,
              fontSize: { xs: "2rem", sm: "2.5rem" },
              color: "#1f3c66",
            }}
          >
            Why Join IClazz as a Tutor?
          </Typography>

          <Grid container spacing={3}>
            {/* Box 1 */}
            <Grid item xs={12} md={6} lg={4}>
              <ServiceCard sx={{ height: "100%" }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: "#1f3c66" }}
                  >
                    🎯 Reach More Students
                  </Typography>
                  <Typography variant="body2">
                    Expand Your Teaching Network – Get discovered by students
                    looking for your expertise. No more searching—students come
                    to you!
                  </Typography>
                </CardContent>
              </ServiceCard>
            </Grid>

            {/* Box 2 */}
            <Grid item xs={12} md={6} lg={4}>
              <ServiceCard sx={{ height: "100%" }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: "#1f3c66" }}
                  >
                    🔍 Personalized Student Matching
                  </Typography>
                  <Typography variant="body2">
                    Right Students, Right Fit – We connect you with students
                    based on your subject, location, and availability, ensuring
                    the best matches.
                  </Typography>
                </CardContent>
              </ServiceCard>
            </Grid>

            {/* Box 3 */}
            <Grid item xs={12} md={6} lg={4}>
              <ServiceCard sx={{ height: "100%" }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: "#1f3c66" }}
                  >
                    ⭐ Build Your Reputation
                  </Typography>
                  <Typography variant="body2">
                    Grow with Ratings & Feedback – Receive student reviews and
                    ratings to showcase your expertise and attract more
                    learners.
                  </Typography>
                </CardContent>
              </ServiceCard>
            </Grid>

            {/* Box 4 */}
            <Grid item xs={12} md={6} lg={4}>
              <ServiceCard sx={{ height: "100%" }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: "#1f3c66" }}
                  >
                    🕒 Flexible Teaching, Your Way
                  </Typography>
                  <Typography variant="body2">
                    Set Your Own Schedule – Choose when, where, and how you want
                    to teach—whether online or in person.
                  </Typography>
                </CardContent>
              </ServiceCard>
            </Grid>

            {/* Box 5 */}
            <Grid item xs={12} md={6} lg={4}>
              <ServiceCard sx={{ height: "100%" }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: "#1f3c66" }}
                  >
                    🚀 Profile Promotion & Visibility
                  </Typography>
                  <Typography variant="body2">
                    We Market You! – Your qualifications and skills are
                    showcased on iClazz, increasing your chances of getting more
                    students.
                  </Typography>
                </CardContent>
              </ServiceCard>
            </Grid>

            {/* Box 6 */}
            <Grid item xs={12} md={6} lg={4}>
              <ServiceCard sx={{ height: "100%" }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: "#1f3c66" }}
                  >
                    🔒 Secure & Hassle-Free
                  </Typography>
                  <Typography variant="body2">
                    Smooth & Reliable Process – Our platform ensures transparent
                    student connections and hassle-free interactions so you can
                    focus on teaching.
                  </Typography>
                </CardContent>
              </ServiceCard>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Application Form */}
      <Container id="apply" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ fontWeight: "bold", mb: 4 }}
        >
          Apply to Become a Tutor
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            maxWidth: "700px",
            mx: "auto",
            p: 4,
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Subject(s) You Teach"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Teaching Experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center", mt: 2 }}>
              <GradientButton
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                startIcon={
                  loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : null
                }
              >
                {loading ? "Processing..." : "Submit via WhatsApp"}
              </GradientButton>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
