import { useState, useEffect, useRef } from "react"; // Add useRef
import PhoneIcon from "@mui/icons-material/Phone";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Button,
  Pagination,
  Tooltip,
} from "@mui/material";
import Link from "next/link";
import HeroBanner from "../../components/HeroBanner";

// Define the Tutor interface
interface Tutor {
  id: string;
  name: string;
  subject: string;
  bio: string;
  educationalLevel: string;
  medium: string;
  date: string;
  platform: string;
  location: string;
}

// Define the FilterOption interface
interface FilterOption {
  label: string;
  state: string;
  setState: (value: string) => void;
  options: string[];
}

export default function TutorsPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("All");
  const [selectedLocation, setSelectedLocation] = useState<string>("All");
  const [selectedDate, setSelectedDate] = useState<string>("All");
  const [selectedMedium, setSelectedMedium] = useState<string>("All");
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1); // Pagination state
  const tutorsPerPage = 6; // Number of tutors per page

  // Create a ref for the search bar container
  const searchBarRef = useRef<HTMLDivElement>(null);

  // Create a ref to track the previous currentPage value
  const prevPageRef = useRef<number>(currentPage);

  const subjects: string[] = [
    "All",
    "Combined Maths",
    "Physics",
    "Chemistry",
    "Biology",
    "IT",
  ];
  const dates: string[] = [
    "All",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const mediums: string[] = ["All", "Sinhala", "English", "Tamil"];
  const locations: string[] = [
    "All",
    "Colombo",
    "Kandy",
    "Galle",
    "Jaffna",
    "Anuradhapura",
    "Kurunegala",
    "Kalutara",
    "Panadura",
  ];

  // Function to shuffle an array (Fisher-Yates algorithm)
  const shuffleArray = <T,>(array: T[]): T[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const fetchTutors = async () => {
      const sheetId = "1iE6zKoY4sywDhWJKfWtdxm3HmDtTA8GfTsbGnRmzXgk";
      const range = "Sheet1!A2:I";

      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=AIzaSyB1avXYf2C6lrU-wy5HcZkQK3p6QDWm0TU`
      );
      const data = await res.json();
      const rows = data.values;

      if (rows) {
        const tutorsData: Tutor[] = rows.map((row: string[]) => ({
          id: row[0],
          name: row[1],
          subject: row[2],
          bio: row[3],
          educationalLevel: row[4],
          medium: row[5],
          date: row[6],
          platform: row[7],
          location: row[8],
        }));
        // Shuffle the tutors array before setting it
        setTutors(shuffleArray(tutorsData));
      }
    };

    fetchTutors();
  }, []);

  // Scroll to the search bar only when the currentPage changes
  useEffect(() => {
    if (prevPageRef.current !== currentPage && searchBarRef.current) {
      searchBarRef.current.scrollIntoView({ behavior: "smooth" });
    }
    // Update the previous page ref
    prevPageRef.current = currentPage;
  }, [currentPage]);

  const filteredTutors = tutors.filter((tutor) => {
    const subjectMatch =
      selectedSubject === "All" ||
      tutor.subject
        .split(",")
        .map((s) => s.trim())
        .includes(selectedSubject);
    const dateMatch =
      selectedDate === "All" ||
      tutor.date
        .split(",")
        .map((d) => d.trim())
        .includes(selectedDate);
    const mediumMatch =
      selectedMedium === "All" ||
      tutor.medium
        .split(",")
        .map((m) => m.trim())
        .includes(selectedMedium);
    const locationMatch =
      selectedLocation === "All" ||
      tutor.location
        .split(",")
        .map((l) => l.trim())
        .includes(selectedLocation);

    const searchMatch =
      tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.subject.toLowerCase().includes(searchQuery.toLowerCase());

    return (
      subjectMatch && dateMatch && mediumMatch && locationMatch && searchMatch
    );
  });

  // Pagination logic
  const indexOfLastTutor = currentPage * tutorsPerPage;
  const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage;
  const currentTutors = filteredTutors.slice(
    indexOfFirstTutor,
    indexOfLastTutor
  );
  const totalPages = Math.ceil(filteredTutors.length / tutorsPerPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  // State to manage tooltip visibility for each field in each tutor
  const [tooltipOpen, setTooltipOpen] = useState<{
    [key: string]: { [key: string]: boolean };
  }>({});

  const handleTooltipOpen = (tutorId: string, field: string) => {
    setTooltipOpen((prev) => ({
      ...prev,
      [tutorId]: {
        ...prev[tutorId],
        [field]: true,
      },
    }));
  };

  const handleTooltipClose = (tutorId: string, field: string) => {
    setTooltipOpen((prev) => ({
      ...prev,
      [tutorId]: {
        ...prev[tutorId],
        [field]: false,
      },
    }));
  };

  const filterOptions: FilterOption[] = [
    {
      label: "Subject",
      state: selectedSubject,
      setState: setSelectedSubject,
      options: subjects,
    },
    {
      label: "Location",
      state: selectedLocation,
      setState: setSelectedLocation,
      options: locations,
    },
    {
      label: "Day",
      state: selectedDate,
      setState: setSelectedDate,
      options: dates,
    },
    {
      label: "Medium",
      state: selectedMedium,
      setState: setSelectedMedium,
      options: mediums,
    },
  ];

  return (
    <>
      <HeroBanner />
      <Container sx={{ py: 5 }}>
        <Typography variant="h4" gutterBottom align="center">
          Find Your Ideal Tutor
        </Typography>

        {/* Add ref to the search bar container */}
        <Box ref={searchBarRef}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              mb: 3,
              justifyContent: "center",
            }}
          >
            {filterOptions.map(({ label, state, setState, options }) => (
              <FormControl sx={{ minWidth: 160 }} key={label}>
                <InputLabel>{label}</InputLabel>
                <Select
                  value={state}
                  onChange={(e) => setState(e.target.value as string)}
                >
                  {options.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ))}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <TextField
              label="Search tutors..."
              variant="outlined"
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ width: "100%", maxWidth: 400 }}
            />
          </Box>
        </Box>

        <Grid container spacing={3}>
          {currentTutors.map((tutor) => (
            <Grid item key={tutor.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: 4,
                  p: 1,
                  backgroundColor: "#fff",
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.05)", boxShadow: 9 },
                }}
              >
                <CardContent>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      {tutor.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "gray", marginTop: 0 }}
                    >
                      ({tutor.id})
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {tutor.subject?.split(",").map((subject, index) => (
                      <Chip
                        key={index}
                        label={subject.trim()}
                        size="small"
                        sx={{
                          mt: 2,
                          mb: 1,
                          backgroundColor: "#1f3c66", // Custom background color
                          color: "white", // Custom text color
                          "& .MuiChip-label": {
                            color: "white", // Ensure the label text is white
                          },
                        }}
                      />
                    ))}
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, fontStyle: "italic" }}
                  >
                    <Tooltip
                      title={tutor.bio}
                      arrow
                      open={tooltipOpen[tutor.id]?.bio || false}
                      onClose={() => handleTooltipClose(tutor.id, "bio")}
                      componentsProps={{
                        tooltip: {
                          sx: {
                            fontSize: "1rem",
                            backgroundColor: "#1f3c66",
                            color: "#fff",
                          },
                        },
                      }}
                    >
                      <span
                        onClick={() => handleTooltipOpen(tutor.id, "bio")}
                        style={{ cursor: "pointer" }}
                      >
                        {tutor.bio.length > 100
                          ? tutor.bio.substring(0, 100) + "(..see more)"
                          : tutor.bio}
                      </span>
                    </Tooltip>
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Education:</strong>{" "}
                    <Tooltip
                      title={tutor.educationalLevel}
                      arrow
                      open={tooltipOpen[tutor.id]?.education || false}
                      onClose={() => handleTooltipClose(tutor.id, "education")}
                      componentsProps={{
                        tooltip: {
                          sx: {
                            fontSize: "1rem",
                            backgroundColor: "#1f3c66",
                            color: "#fff",
                          },
                        },
                      }}
                    >
                      <span
                        onClick={() => handleTooltipOpen(tutor.id, "education")}
                        style={{ cursor: "pointer" }}
                      >
                        {tutor.educationalLevel.length > 100
                          ? tutor.educationalLevel.substring(0, 100) +
                            "(..see more)"
                          : tutor.educationalLevel}
                      </span>
                    </Tooltip>
                  </Typography>
                  <Typography variant="body2">
                    <strong>Medium:</strong>{" "}
                    <Tooltip
                      title={tutor.medium}
                      arrow
                      open={tooltipOpen[tutor.id]?.medium || false}
                      onClose={() => handleTooltipClose(tutor.id, "medium")}
                      componentsProps={{
                        tooltip: {
                          sx: {
                            fontSize: "1rem",
                            backgroundColor: "#1f3c66",
                            color: "#fff",
                          },
                        },
                      }}
                    >
                      <span
                        onClick={() => handleTooltipOpen(tutor.id, "medium")}
                        style={{ cursor: "pointer" }}
                      >
                        {tutor.medium.length > 100
                          ? tutor.medium.substring(0, 100) + "(..see more)"
                          : tutor.medium}
                      </span>
                    </Tooltip>
                  </Typography>
                  <Typography variant="body2">
                    <strong>Available:</strong>{" "}
                    <Tooltip
                      title={tutor.date}
                      arrow
                      open={tooltipOpen[tutor.id]?.date || false}
                      onClose={() => handleTooltipClose(tutor.id, "date")}
                      componentsProps={{
                        tooltip: {
                          sx: {
                            fontSize: "1rem",
                            backgroundColor: "#1f3c66",
                            color: "#fff",
                          },
                        },
                      }}
                    >
                      <span
                        onClick={() => handleTooltipOpen(tutor.id, "date")}
                        style={{ cursor: "pointer" }}
                      >
                        {tutor.date.length > 10
                          ? tutor.date.substring(0, 10) + "(..see more)"
                          : tutor.date}
                      </span>
                    </Tooltip>
                  </Typography>
                  <Typography variant="body2">
                    <strong>Platform:</strong>{" "}
                    <Tooltip
                      title={tutor.platform}
                      arrow
                      open={tooltipOpen[tutor.id]?.platform || false}
                      onClose={() => handleTooltipClose(tutor.id, "platform")}
                      componentsProps={{
                        tooltip: {
                          sx: {
                            fontSize: "1rem",
                            backgroundColor: "#1f3c66",
                            color: "#fff",
                          },
                        },
                      }}
                    >
                      <span
                        onClick={() => handleTooltipOpen(tutor.id, "platform")}
                        style={{ cursor: "pointer" }}
                      >
                        {tutor.platform.length > 100
                          ? tutor.platform.substring(0, 100) + "(..see more)"
                          : tutor.platform}
                      </span>
                    </Tooltip>
                  </Typography>
                  <Typography variant="body2">
                    <strong>Locations:</strong>{" "}
                    <Tooltip
                      title={tutor.location}
                      arrow
                      open={tooltipOpen[tutor.id]?.location || false}
                      onClose={() => handleTooltipClose(tutor.id, "location")}
                      componentsProps={{
                        tooltip: {
                          sx: {
                            fontSize: "1rem",
                            backgroundColor: "#1f3c66",
                            color: "#fff",
                          },
                        },
                      }}
                    >
                      <span
                        onClick={() => handleTooltipOpen(tutor.id, "location")}
                        style={{ cursor: "pointer" }}
                      >
                        {tutor.location.length > 10
                          ? tutor.location.substring(0, 10) + "(..see more)"
                          : tutor.location}
                      </span>
                    </Tooltip>
                  </Typography>
                  {/* Add "Contact Now" Button */}
                  <Box sx={{ mt: 2, textAlign: "center" }}>
                    <Link href={`https://wa.link/8p2m5u`} passHref>
                      <Button
                        variant="contained"
                        startIcon={<PhoneIcon />}
                        sx={{
                          width: "100%",
                          py: 1.5,
                          fontWeight: 600,
                          borderRadius: 2,
                          boxShadow: 3,
                          backgroundColor: "#1f3c66", // Custom background color
                          color: "white", // Custom text color
                          "&:hover": {
                            backgroundColor: "#1a3357", // Darker shade for hover
                            transform: "scale(1.02)",
                            boxShadow: 4,
                          },
                          transition: "transform 0.2s, background-color 0.2s", // Smooth transition for hover effects
                        }}
                      >
                        Contact Now
                      </Button>
                    </Link>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#1f3c66", // Default text color
                borderColor: "#1f3c66", // Border color for outlined buttons
              },
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "#1f3c66", // Background color for the selected page
                color: "#fff", // Text color for the selected page
                "&:hover": {
                  backgroundColor: "#1a3357", // Darker background on hover for the selected page
                },
              },
              "& .MuiPaginationItem-root:hover": {
                backgroundColor: "rgba(31, 60, 102, 0.1)", // Light background on hover for other pages
              },
            }}
          />
        </Box>

        {filteredTutors.length === 0 && (
          <Typography variant="h6" color="error" align="center" sx={{ mt: 3 }}>
            No tutors found.
          </Typography>
        )}
      </Container>
    </>
  );
}
