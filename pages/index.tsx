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
} from "@mui/material";
import { styled } from "@mui/system";
import { keyframes } from "@emotion/react";
import SchoolIcon from "@mui/icons-material/School";
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import emailjs from "@emailjs/browser";

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

// Styled components
const HeroBox = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #1f3c66, #4a90e2)",
  color: "white",
  padding: "150px 0",
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
  animation: `${fadeIn} 1s ease-out`,
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

const ServiceCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
  },
}));

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Replace these with your EmailJS credentials
    const serviceID = "service_8cwcqo9";
    const templateID = "template_9ba793u";
    const userID = "fPg5ZFsJsF8AukSb7";

    emailjs
      .send(serviceID, templateID, formData, userID)
      .then((response) => {
        console.log("Email sent successfully!", response);
        setSnackbarMessage("Message sent successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setFormData({ name: "", email: "", message: "" }); // Clear form
      })
      .catch((error) => {
        console.error("Failed to send email:", error);
        setSnackbarMessage("Failed to send message. Please try again.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
            Welcome to IClazz
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
              mb: 5,
            }}
          >
            Find the best tutors for your needs
          </Typography>
          <GradientButton variant="contained" href="/tutors">
            View Tutors
          </GradientButton>
        </Container>
        {/* Decorative shape at the bottom */}
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

      {/* About Us Section */}
      <Container id="about" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ fontWeight: "bold" }}
        >
          About Us
        </Typography>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph>
              At IClazz, we are dedicated to helping students find the best
              tutors to achieve their academic goals. Our platform connects
              students with experienced tutors in various subjects.
            </Typography>
            <Typography variant="body1" paragraph>
              Whether you need help with math, science, or language arts, we
              have the right tutor for you. Our tutors are highly qualified and
              passionate about teaching.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src="/logo.png"
                alt="About Us"
                style={{
                  width: "80%",
                  height: "auto",
                  maxWidth: "300px",
                  display: "block",
                  margin: "auto",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Services Section */}
      <Box id="service" sx={{ backgroundColor: "#f5f5f5", py: 8 }}>
        <Container>
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{ fontWeight: "bold" }}
          >
            Our Services
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <ServiceCard>
                <CardContent sx={{ textAlign: "center" }}>
                  <SchoolIcon
                    sx={{ fontSize: "60px", color: "#1f3c66", mb: 2 }}
                  />
                  <Typography variant="h6" gutterBottom>
                    Personalized Tutoring
                  </Typography>
                  <Typography variant="body2">
                    One-on-one tutoring sessions tailored to your learning style
                    and pace.
                  </Typography>
                </CardContent>
              </ServiceCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <ServiceCard>
                <CardContent sx={{ textAlign: "center" }}>
                  <OnlinePredictionIcon
                    sx={{ fontSize: "60px", color: "#1f3c66", mb: 2 }}
                  />
                  <Typography variant="h6" gutterBottom>
                    Online Classes
                  </Typography>
                  <Typography variant="body2">
                    Flexible online classes that fit your schedule and learning
                    needs.
                  </Typography>
                </CardContent>
              </ServiceCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <ServiceCard>
                <CardContent sx={{ textAlign: "center" }}>
                  <AssignmentIcon
                    sx={{ fontSize: "60px", color: "#1f3c66", mb: 2 }}
                  />
                  <Typography variant="h6" gutterBottom>
                    Test Preparation
                  </Typography>
                  <Typography variant="body2">
                    Comprehensive test prep courses for SAT, ACT, and more.
                  </Typography>
                </CardContent>
              </ServiceCard>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Contact Us Section */}
      <Container id="contact" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ fontWeight: "bold" }}
        >
          Contact Us
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph>
              Have questions or need more information? Feel free to reach out to
              us. We are here to help!
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <EmailIcon sx={{ mr: 2, color: "#1f3c66" }} />
              <Typography variant="body1">support@tutorfinder.com</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PhoneIcon sx={{ mr: 2, color: "#1f3c66" }} />
              <Typography variant="body1">+1 (123) 456-7890</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                multiline
                rows={4}
                required
              />
              <GradientButton type="submit" variant="contained" sx={{ mt: 2 }}>
                Send Message
              </GradientButton>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
