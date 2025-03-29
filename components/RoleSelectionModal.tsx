// components/RoleSelectionModal.tsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledButton = styled(Button)(({ theme }) => ({
  padding: "12px 24px",
  fontSize: "18px",
  margin: "8px",
  width: "200px",
  "&:hover": {
    transform: "scale(1.05)",
    transition: "transform 0.2s",
  },
}));

interface RoleSelectionModalProps {
  open: boolean;
  onClose: () => void;
  onRoleSelect: (role: "student" | "tutor") => void;
}

export default function RoleSelectionModal({
  open,
  onClose,
  onRoleSelect,
}: RoleSelectionModalProps) {
  return (
    <Dialog open={open} maxWidth="sm" fullWidth onClose={onClose}>
      <DialogTitle>
        <Typography variant="h4" align="center" fontWeight="bold">
          Welcome to iClazz
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Please select your role:
          </Typography>
          <Box
            sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
          >
            <StyledButton
              variant="contained"
              onClick={() => onRoleSelect("student")}
              sx={{ backgroundColor: "#4CAF50" }}
            >
              I'm a Student
            </StyledButton>
            <StyledButton
              variant="contained"
              onClick={() => onRoleSelect("tutor")}
              sx={{ backgroundColor: "#2196F3" }}
            >
              I'm a Tutor
            </StyledButton>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
