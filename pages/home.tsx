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
  Link,
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
  position: "relative",
  color: "white",
  padding: "150px 0",
  textAlign: "center",
  overflow: "hidden",
  animation: `${fadeIn} 1s ease-out`,

  // Background image with dark overlay
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
      url('/home.jpg') center/cover no-repeat
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
          sx={{
            mb: 6,
            fontSize: {
              xs: "2.25rem", // ~36px on mobile
              sm: "2.5rem", // ~40px on small tablets
              md: "2.75rem", // ~44px on desktop
            },
            lineHeight: 1.2,
          }}
        >
          About Us
        </Typography>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph>
              iClazz is a professional platform designed to connect students
              with the best tutors for individual home or online classes.
            </Typography>
            <Typography variant="body1" paragraph>
              We specialize in providing highly talented university students
              with extensive teaching experience, ensuring top-quality
              education. Our platform is user-friendly, trustworthy, and
              committed to excellence, making it easy for students to find the
              perfect tutor while guaranteeing a reliable and efficient learning
              experience.
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
      {/* Services Section */}{" "}
      <Box id="service" sx={{ backgroundColor: "#f5f5f5", py: 8 }}>
        <Container>
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{
              mb: 6, // Increased bottom margin
              fontSize: { xs: "2.125rem", sm: "2.5rem" }, // Slightly larger than default h4
            }}
          >
            Our Services
          </Typography>

          {/* Why Choose iClazz Section */}
          <Box sx={{ mb: 6, textAlign: "center" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={4}>
                <ServiceCard sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ color: "#1f3c66" }}
                    >
                      🎯 Find the Perfect Teacher
                    </Typography>
                    <Typography variant="body2">
                      We match you with the best tutor based on your subject,
                      location, availability, and preferred learning medium
                      (online/in-person).
                    </Typography>
                  </CardContent>
                </ServiceCard>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <ServiceCard sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ color: "#1f3c66" }}
                    >
                      🎓 Learn from High-Achievers
                    </Typography>
                    <Typography variant="body2">
                      All our teachers are university students or top achievers
                      with extensive tutoring experience—learn their success
                      strategies!
                    </Typography>
                  </CardContent>
                </ServiceCard>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <ServiceCard sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ color: "#1f3c66" }}
                    >
                      💰 Affordable & Standardized Fees
                    </Typography>
                    <Typography variant="body2">
                      High-quality education at student-friendly rates—no
                      overpriced classes, just the best learning at a fair cost.
                    </Typography>
                  </CardContent>
                </ServiceCard>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <ServiceCard sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ color: "#1f3c66" }}
                    >
                      📊 Personalized Learning
                    </Typography>
                    <Typography variant="body2">
                      We track your progress until your class is completed,
                      ensuring you get the most out of every lesson.
                    </Typography>
                  </CardContent>
                </ServiceCard>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <ServiceCard sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ color: "#1f3c66" }}
                    >
                      ⏳ Flexible Scheduling
                    </Typography>
                    <Typography variant="body2">
                      Learn at your convenient time—choose the best schedule,
                      subject, and location that fits your routine.
                    </Typography>
                  </CardContent>
                </ServiceCard>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <ServiceCard sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ color: "#1f3c66" }}
                    >
                      📚 Wide Range of Subjects
                    </Typography>
                    <Typography variant="body2">
                      From academic subjects to professional courses, find the
                      perfect teacher for anything you want to learn.
                    </Typography>
                  </CardContent>
                </ServiceCard>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <ServiceCard sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ color: "#1f3c66" }}
                    >
                      📖 Custom Syllabus
                    </Typography>
                    <Typography variant="body2">
                      Choose full syllabus or specific lessons—you'll only pay
                      for what you need within a set time.
                    </Typography>
                  </CardContent>
                </ServiceCard>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <ServiceCard sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ color: "#1f3c66" }}
                    >
                      👥 Individual & Group Classes
                    </Typography>
                    <Typography variant="body2">
                      Choose between one-on-one tutoring for personalized
                      learning or group classes for interactive experience.
                    </Typography>
                  </CardContent>
                </ServiceCard>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <ServiceCard sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ color: "#1f3c66" }}
                    >
                      📢 Online & In-Person
                    </Typography>
                    <Typography variant="body2">
                      Study online or find teachers near you—learn the way
                      you're most comfortable with.
                    </Typography>
                  </CardContent>
                </ServiceCard>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      {/* Contact Us Section */}
      <Container id="contact" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{
            mb: 6,
            fontSize: {
              xs: "2.25rem", // ~36px on mobile
              sm: "2.5rem", // ~40px on small tablets
              md: "2.75rem", // ~44px on desktop
            },
            lineHeight: 1.2,
          }}
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
              <Typography variant="body1">iclazzeducation@gmail.com</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PhoneIcon sx={{ mr: 2, color: "#1f3c66" }} />
              <Typography variant="body1">
                <Link href="tel:+94714279001" color="inherit" underline="hover">
                  +94 71 747 4228
                </Link>
              </Typography>
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
