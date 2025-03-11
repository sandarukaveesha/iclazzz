import { Box, Typography, Container } from "@mui/material";

export default function HeroBanner() {
  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: 250, md: 400 },
        backgroundImage: "url(/hero-banner.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
        boxShadow: 3,
        overflow: "hidden", // Ensure the overlay doesn't overflow
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Container
        sx={{
          position: "relative",
          zIndex: 2,
          animation: "fadeIn 1.5s ease-in-out", // Add a fade-in animation
        }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{
            textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
            fontSize: { xs: "2rem", md: "3rem" }, // Responsive font size
            mb: 2, // Add margin bottom
          }}
        >
          Find Your Perfect Tutor
        </Typography>
        <Typography
          variant="h5"
          sx={{
            textShadow: "1px 1px 5px rgba(0,0,0,0.6)",
            fontSize: { xs: "1.25rem", md: "1.5rem" }, // Responsive font size
            fontStyle: "italic", // Add italic style
            color: "rgba(255, 255, 255, 0.9)", // Slightly transparent text
          }}
        >
          Expert tutors ready to help you excel in your studies.
        </Typography>
      </Container>

      {/* Subtle Animation for Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(45deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)",
          zIndex: 1,
          animation: "overlayAnimation 5s infinite alternate", // Subtle overlay animation
        }}
      />

      {/* Keyframes for Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes overlayAnimation {
            from {
              opacity: 0.6;
            }
            to {
              opacity: 0.8;
            }
          }
        `}
      </style>
    </Box>
  );
}
