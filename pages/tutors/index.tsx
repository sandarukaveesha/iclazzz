import { useState, useEffect, useRef } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ContactMailIcon from "@mui/icons-material/ContactMail";
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

interface FilterOption {
  label: string;
  state: string;
  setState: (value: string) => void;
  options: string[];
}

export default function TutorsPage() {
  const [gradeType, setGradeType] = useState<string>("");
  const [gradeLevel, setGradeLevel] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("All");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("All");
  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [selectedDate, setSelectedDate] = useState<string>("All");
  const [selectedMedium, setSelectedMedium] = useState<string>("All");
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const tutorsPerPage = 6;
  const searchBarRef = useRef<HTMLDivElement>(null);
  const prevPageRef = useRef<number>(currentPage);

  const olSubjects = [
    "All",
    "Science",
    "Mathematics",
    "English",
    "Commerce",
    "ICT",
    "Buddhism & History",
  ];
  const alSubjects = [
    "All",
    "Combined Maths",
    "Physics",
    "Chemistry",
    "Biology",
    "IT",
  ];
  const subjects = gradeType === "AL" ? alSubjects : olSubjects;

  const dates = [
    "All",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const mediums = ["All", "Sinhala", "English", "Tamil"];
  const districts = ["All", "Kalutara", "Colombo"];
  const cities: { [key: string]: string[] } = {
    All: ["All"],
    Kalutara: [
      "All",
      "Panadura",
      "Wadduwa",
      "Thalpitiya",
      "Kalutara North",
      "Kalutara South",
      "Katukurunda",
      "Payagala",
      "Maggona",
      "Beruwala",
      "Aluthgama",
      "Nagoda",
      "Mathugama",
      "Bandaragama",
      "Horana",
      "Walipanna",
    ],
    Colombo: [
      "All",
      "Moratuwa",
      "Rathmala",
      "Mount Lavinia",
      "Dehiwala",
      "Wallawatta",
      "Kollupitiya",
      "Bambalapitiya",
      "Nugegoda",
      "Boralasgmuwa",
      "Kasbawa",
      "Piliyandala",
      "Maharagama",
      "Padukka",
      "Athurugiriya",
      "Baththaramulla",
      "Awissawella",
      "Hanwella",
      "Homagama",
      "Kalubowila",
      "Kaduwela",
      "Kadawatha",
      "Malambe",
      "Nawala",
      "Wallampitiya",
      "Thalawathugoda",
    ],
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    if (!gradeType) return;
    if (gradeType === "OL" && !gradeLevel) return;

    const fetchTutors = async () => {
      const sheetId =
        gradeType === "AL"
          ? "1iE6zKoY4sywDhWJKfWtdxm3HmDtTA8GfTsbGnRmzXgk" // AL sheet
          : "1I50I3fizmCUXP0RXkjDgmacJwrMlI40SX09jGPniIg8"; // Replace with your OL sheet ID
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
        setTutors(shuffleArray(tutorsData));
      }
    };

    fetchTutors();
  }, [gradeType, gradeLevel]);

  useEffect(() => {
    if (prevPageRef.current !== currentPage && searchBarRef.current) {
      searchBarRef.current.scrollIntoView({ behavior: "smooth" });
    }
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
    const cityMatch =
      selectedCity === "All" ||
      tutor.location
        ?.split(",")
        .map((l) => l.trim())
        .includes(selectedCity);
    const searchMatch =
      tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.subject.toLowerCase().includes(searchQuery.toLowerCase());

    return subjectMatch && dateMatch && mediumMatch && cityMatch && searchMatch;
  });

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

        {/* Grade Type Selection */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Select Level</InputLabel>
            <Select
              value={gradeType}
              onChange={(e) => {
                setGradeType(e.target.value as string);
                setGradeLevel("");
                setSelectedSubject("All");
                setSelectedDistrict("All");
                setSelectedCity("All");
                setSelectedDate("All");
                setSelectedMedium("All");
                setSearchQuery("");
                setCurrentPage(1);
              }}
              label="Select Grade Type"
            >
              <MenuItem value="AL">Advanced Level (A/L)</MenuItem>
              <MenuItem value="OL">Ordinary Level (O/L)</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Grade Level Selection (only for OL) */}
        {gradeType === "OL" && (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Select Grade</InputLabel>
              <Select
                value={gradeLevel}
                onChange={(e) => {
                  setGradeLevel(e.target.value as string);
                  setSelectedSubject("All");
                  setSelectedDistrict("All");
                  setSelectedCity("All");
                  setSelectedDate("All");
                  setSelectedMedium("All");
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                label="Select Grade"
              >
                <MenuItem value="10">Grade 10</MenuItem>
                <MenuItem value="11">Grade 11</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}

        {/* Show content only when grade type (and level if OL) is selected */}
        {gradeType === "AL" || (gradeType === "OL" && gradeLevel) ? (
          <>
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

                <FormControl sx={{ minWidth: 160 }}>
                  <InputLabel>District</InputLabel>
                  <Select
                    value={selectedDistrict}
                    onChange={(e) => {
                      setSelectedDistrict(e.target.value as string);
                      setSelectedCity("All");
                    }}
                  >
                    {districts.map((district) => (
                      <MenuItem key={district} value={district}>
                        {district}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 160 }}>
                  <InputLabel>City</InputLabel>
                  <Select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value as string)}
                    disabled={selectedDistrict === "All"}
                  >
                    {cities[selectedDistrict].map((city) => (
                      <MenuItem key={city} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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

            <Grid container spacing={4}>
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
                              backgroundColor: "#1f3c66",
                              color: "white",
                              "& .MuiChip-label": { color: "white" },
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
                                maxWidth: 400,
                              },
                            },
                          }}
                        >
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTooltipOpen(tutor.id, "bio");
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            {tutor.bio.length > 15
                              ? `${tutor.bio.substring(0, 15)}(...see more)`
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
                          onClose={() =>
                            handleTooltipClose(tutor.id, "education")
                          }
                          componentsProps={{
                            tooltip: {
                              sx: {
                                fontSize: "1rem",
                                backgroundColor: "#1f3c66",
                                color: "#fff",
                                maxWidth: 400,
                              },
                            },
                          }}
                        >
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTooltipOpen(tutor.id, "education");
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            {tutor.educationalLevel.length > 100
                              ? `${tutor.educationalLevel.substring(
                                  0,
                                  100
                                )}(...see more)`
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
                            onClick={() =>
                              handleTooltipOpen(tutor.id, "medium")
                            }
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
                          onClose={() =>
                            handleTooltipClose(tutor.id, "platform")
                          }
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
                            onClick={() =>
                              handleTooltipOpen(tutor.id, "platform")
                            }
                            style={{ cursor: "pointer" }}
                          >
                            {tutor.platform.length > 100
                              ? tutor.platform.substring(0, 100) +
                                "(..see more)"
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
                          onClose={() =>
                            handleTooltipClose(tutor.id, "location")
                          }
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
                            onClick={() =>
                              handleTooltipOpen(tutor.id, "location")
                            }
                            style={{ cursor: "pointer" }}
                          >
                            {tutor?.location?.length > 10
                              ? tutor.location.substring(0, 10) + "(..see more)"
                              : tutor.location}
                          </span>
                        </Tooltip>
                      </Typography>
                      <Box sx={{ mt: 2, textAlign: "center" }}>
                        <Link href={`https://wa.link/f8ewij`} passHref>
                          <Button
                            variant="contained"
                            startIcon={<PhoneIcon />}
                            sx={{
                              width: "100%",
                              py: 1.5,
                              fontWeight: 600,
                              borderRadius: 2,
                              boxShadow: 3,
                              backgroundColor: "#1f3c66",
                              color: "white",
                              "&:hover": {
                                backgroundColor: "#1a3357",
                                transform: "scale(1.02)",
                                boxShadow: 4,
                              },
                              transition:
                                "transform 0.2s, background-color 0.2s",
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

            {filteredTutors.length > 0 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  sx={{
                    "& .MuiPaginationItem-root": {
                      color: "#1f3c66",
                      borderColor: "#1f3c66",
                    },
                    "& .MuiPaginationItem-root.Mui-selected": {
                      backgroundColor: "#1f3c66",
                      color: "#fff",
                      "&:hover": { backgroundColor: "#1a3357" },
                    },
                    "& .MuiPaginationItem-root:hover": {
                      backgroundColor: "rgba(31, 60, 102, 0.1)",
                    },
                  }}
                />
              </Box>
            )}

            {filteredTutors.length === 0 && (
              <Box
                sx={{
                  textAlign: "center",
                  p: 4,
                  border: "1px dashed",
                  borderColor: "primary.main",
                  borderRadius: 2,
                  backgroundColor: "rgba(25, 118, 210, 0.05)",
                  maxWidth: 500,
                  mx: "auto",
                  my: 4,
                }}
              >
                <ErrorOutlineIcon
                  color="primary"
                  sx={{ fontSize: 48, mb: 2 }}
                />
                <Typography variant="h6" gutterBottom>
                  Couldn't find your perfect tutor?
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  We'll help you find a customized tutor matching your
                  requirements
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<ContactMailIcon />}
                  onClick={() => window.open("https://wa.link/mysox5")}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 50,
                    boxShadow: 2,
                    "&:hover": { boxShadow: 4, transform: "translateY(-2px)" },
                  }}
                >
                  Request Custom Tutor
                </Button>
              </Box>
            )}
          </>
        ) : (
          <Box
            sx={{
              textAlign: "center",
              p: 4,
              border: "1px dashed",
              borderColor: "primary.main",
              borderRadius: 2,
              backgroundColor: "rgba(25, 118, 210, 0.05)",
              maxWidth: 500,
              mx: "auto",
              my: 4,
            }}
          >
            <ErrorOutlineIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              {!gradeType
                ? "Please select a level first"
                : "Please select a grade level"}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {!gradeType
                ? "Choose either Ordinary Level (O/L) or Advanced Level (A/L) to continue"
                : "Select either Grade 10 or Grade 11 to see available tutors"}
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
}
