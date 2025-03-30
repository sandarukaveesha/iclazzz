import { Container, Typography, Button, Box, Grid, Paper } from "@mui/material";
import { keyframes, styled } from "@mui/system";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import Head from "next/head";

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
const PageContainer = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  background: "white",
  padding: "1rem",
  boxSizing: "border-box",
});

const ContentContainer = styled(Box)({
  maxWidth: "1000px",
  width: "100%",
  padding: "0 1rem",
  animation: `${fadeIn} 0.5s ease-out`,
});

const RoleCard = styled(Paper)({
  padding: "1.5rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "transform 0.3s, box-shadow 0.3s",
  height: "100%",
  background: "white",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
  },
});

const Logo = styled("img")({
  width: "120px",
  height: "auto",
  marginBottom: "0.5rem",
});

export default function RoleSelectionPage() {
  const handleRoleSelection = (role: string) => {
    window.open(role === "student" ? "/home" : "/tutor", "_blank");
  };

  return (
    <>
      <Head>
        <title>IClazz - Choose Your Role</title>
        <meta property="og:iclazz" content="IClazz" />
      </Head>

      <PageContainer>
        <ContentContainer>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Logo src="/logo.png" alt="IClazz Logo" />
            <Typography variant="h4" fontWeight="bold">
              Welcome to IClazz
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Please select your role to continue
            </Typography>
          </Box>

          {/* Change from Grid to Box for more control */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 4, md: 2 },
            }}
          >
            <Box sx={{ flex: 1 }}>
              <RoleCard onClick={() => handleRoleSelection("student")}>
                <PersonIcon sx={{ fontSize: 50, color: "#1f3c66", mb: 1 }} />
                <Typography variant="h5" fontWeight="bold" mb={1}>
                  I am a Student
                </Typography>
                <Typography variant="body1" textAlign="center" mb={2}>
                  Find the perfect tutor to help you excel in your studies.
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    background: "linear-gradient(45deg, #ff6f61, #ffcc00)",
                    color: "white",
                    padding: "10px 24px",
                    borderRadius: "25px",
                    fontWeight: "bold",
                    "&:hover": {
                      background: "linear-gradient(45deg, #ffcc00, #ff6f61)",
                    },
                  }}
                >
                  CONTINUE AS STUDENT
                </Button>
              </RoleCard>
            </Box>
            <Box sx={{ flex: 1 }}>
              <RoleCard onClick={() => handleRoleSelection("tutor")}>
                <SchoolIcon sx={{ fontSize: 50, color: "#1f3c66", mb: 1 }} />
                <Typography variant="h5" fontWeight="bold" mb={1}>
                  I am a Tutor
                </Typography>
                <Typography variant="body1" textAlign="center" mb={2}>
                  Join our platform to connect with students.
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    background: "linear-gradient(45deg, #ff6f61, #ffcc00)",
                    color: "white",
                    padding: "10px 24px",
                    borderRadius: "25px",
                    fontWeight: "bold",
                    "&:hover": {
                      background: "linear-gradient(45deg, #ffcc00, #ff6f61)",
                    },
                  }}
                >
                  CONTINUE AS TUTOR
                </Button>
              </RoleCard>
            </Box>
          </Box>
        </ContentContainer>
      </PageContainer>
    </>
  );
}
