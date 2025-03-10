// import { useState, useEffect } from "react";
// import {
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Box,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Chip,
//   Tooltip,
// } from "@mui/material";
// import HeroBanner from "../../components/HeroBanner";

// export default function TutorsPage() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedSubject, setSelectedSubject] = useState("All");
//   const [selectedLocation, setSelectedLocation] = useState("All");
//   const [selectedDate, setSelectedDate] = useState("All");
//   const [selectedMedium, setSelectedMedium] = useState("All");
//   const [tutors, setTutors] = useState([]);

//   const subjects = [
//     "All",
//     "Combined Maths",
//     "Physics",
//     "Chemistry",
//     "Biology",
//     "IT",
//   ];
//   const dates = [
//     "All",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//     "Sunday",
//   ];
//   const mediums = ["All", "Sinhala", "English", "Tamil"];
//   const locations = [
//     "All",
//     "Colombo",
//     "Kandy",
//     "Galle",
//     "Jaffna",
//     "Anuradhapura",
//     "Kurunegala",
//     "Kalutara",
//     "Panadura",
//   ];

//   // Function to shuffle an array (Fisher-Yates algorithm)
//   const shuffleArray = (array) => {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
//   };

//   useEffect(() => {
//     const fetchTutors = async () => {
//       const sheetId = "1iE6zKoY4sywDhWJKfWtdxm3HmDtTA8GfTsbGnRmzXgk";
//       const range = "Sheet1!A2:I";

//       const res = await fetch(
//         `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=AIzaSyB1avXYf2C6lrU-wy5HcZkQK3p6QDWm0TU`
//       );
//       const data = await res.json();
//       const rows = data.values;

//       if (rows) {
//         const tutorsData = rows.map((row) => ({
//           id: row[0],
//           name: row[1],
//           subject: row[2],
//           bio: row[3],
//           educationalLevel: row[4],
//           medium: row[5],
//           date: row[6],
//           platform: row[7],
//           location: row[8],
//         }));
//         // Shuffle the tutors array before setting it
//         setTutors(shuffleArray(tutorsData));
//       }
//     };

//     fetchTutors();
//   }, []);

//   const filteredTutors = tutors.filter((tutor) => {
//     const subjectMatch =
//       selectedSubject === "All" ||
//       tutor.subject
//         .split(",")
//         .map((s) => s.trim())
//         .includes(selectedSubject);
//     const dateMatch =
//       selectedDate === "All" ||
//       tutor.date
//         .split(",")
//         .map((d) => d.trim())
//         .includes(selectedDate);
//     const mediumMatch =
//       selectedMedium === "All" ||
//       tutor.medium
//         .split(",")
//         .map((m) => m.trim())
//         .includes(selectedMedium);
//     const locationMatch =
//       selectedLocation === "All" ||
//       tutor.location
//         .split(",")
//         .map((l) => l.trim())
//         .includes(selectedLocation);

//     const searchMatch =
//       tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       tutor.subject.toLowerCase().includes(searchQuery.toLowerCase());

//     return (
//       subjectMatch && dateMatch && mediumMatch && locationMatch && searchMatch
//     );
//   });

//   return (
//     <>
//       <HeroBanner />
//       <Container sx={{ py: 5 }}>
//         <Typography variant="h4" gutterBottom align="center">
//           Find Your Ideal Tutor
//         </Typography>

//         <Box
//           sx={{
//             display: "flex",
//             flexWrap: "wrap",
//             gap: 2,
//             mb: 3,
//             justifyContent: "center",
//           }}
//         >
//           {[
//             {
//               label: "Subject",
//               state: selectedSubject,
//               setState: setSelectedSubject,
//               options: subjects,
//             },
//             {
//               label: "Location",
//               state: selectedLocation,
//               setState: setSelectedLocation,
//               options: locations,
//             },
//             {
//               label: "Day",
//               state: selectedDate,
//               setState: setSelectedDate,
//               options: dates,
//             },
//             {
//               label: "Medium",
//               state: selectedMedium,
//               setState: setSelectedMedium,
//               options: mediums,
//             },
//           ].map(({ label, state, setState, options }) => (
//             <FormControl sx={{ minWidth: 160 }} key={label}>
//               <InputLabel>{label}</InputLabel>
//               <Select value={state} onChange={(e) => setState(e.target.value)}>
//                 {options.map((option) => (
//                   <MenuItem key={option} value={option}>
//                     {option}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           ))}
//         </Box>

//         <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
//           <TextField
//             label="Search tutors..."
//             variant="outlined"
//             onChange={(e) => setSearchQuery(e.target.value)}
//             sx={{ width: "100%", maxWidth: 400 }}
//           />
//         </Box>

//         <Grid container spacing={3}>
//           {filteredTutors.map((tutor) => (
//             <Grid item key={tutor.id} xs={12} sm={6} md={4}>
//               <Card
//                 sx={{
//                   boxShadow: 3,
//                   borderRadius: 2,
//                   p: 2,
//                   backgroundColor: "#fff",
//                   transition: "0.3s",
//                   "&:hover": { transform: "scale(1.05)", boxShadow: 9 },
//                 }}
//               >
//                 <CardContent>
//                   <Box>
//                     <Typography variant="h6" fontWeight="bold">
//                       {tutor.name}
//                     </Typography>
//                     <Typography
//                       variant="body2"
//                       sx={{ color: "gray", marginTop: 0 }}
//                     >
//                       ({tutor.id})
//                     </Typography>
//                   </Box>
//                   <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//                     {tutor.subject?.split(",").map((subject, index) => (
//                       <Chip
//                         key={index}
//                         label={subject.trim()}
//                         color="primary"
//                         size="small"
//                         sx={{ mt: 2, mb: 1 }}
//                       />
//                     ))}
//                   </Box>
//                   <Typography
//                     variant="body2"
//                     sx={{ mt: 1, fontStyle: "italic" }}
//                   >
//                     <Tooltip
//                       title={tutor.bio}
//                       arrow
//                       componentsProps={{
//                         tooltip: {
//                           sx: {
//                             fontSize: "1rem",
//                             backgroundColor: "#1976d2",
//                             color: "#fff",
//                           },
//                         },
//                       }}
//                     >
//                       <span>
//                         {tutor.bio.length > 100
//                           ? tutor.bio.substring(0, 100) + "(..see more)"
//                           : tutor.bio}
//                       </span>
//                     </Tooltip>
//                   </Typography>
//                   <Typography variant="body2" sx={{ mt: 1 }}>
//                     <strong>Education:</strong>{" "}
//                     <Tooltip
//                       title={tutor.educationalLevel}
//                       arrow
//                       componentsProps={{
//                         tooltip: {
//                           sx: {
//                             fontSize: "1rem",
//                             backgroundColor: "#1976d2",
//                             color: "#fff",
//                           },
//                         },
//                       }}
//                     >
//                       <span>
//                         {tutor.educationalLevel.length > 100
//                           ? tutor.educationalLevel.substring(0, 100) +
//                             "(..see more)"
//                           : tutor.educationalLevel}
//                       </span>
//                     </Tooltip>
//                   </Typography>
//                   <Typography variant="body2">
//                     <strong>Medium:</strong>{" "}
//                     <Tooltip
//                       title={tutor.medium}
//                       arrow
//                       componentsProps={{
//                         tooltip: {
//                           sx: {
//                             fontSize: "1rem",
//                             backgroundColor: "#1976d2",
//                             color: "#fff",
//                           },
//                         },
//                       }}
//                     >
//                       <span>
//                         {tutor.medium.length > 100
//                           ? tutor.medium.substring(0, 100) + "(..see more)"
//                           : tutor.medium}
//                       </span>
//                     </Tooltip>
//                   </Typography>
//                   <Typography variant="body2">
//                     <strong>Available:</strong>{" "}
//                     <Tooltip
//                       title={tutor.date}
//                       arrow
//                       componentsProps={{
//                         tooltip: {
//                           sx: {
//                             fontSize: "1rem",
//                             backgroundColor: "#1976d2",
//                             color: "#fff",
//                           },
//                         },
//                       }}
//                     >
//                       <span style={{ cursor: "pointer" }}>
//                         {tutor.date.length > 10
//                           ? tutor.date.substring(0, 10) + " " // Add a space before "see more"
//                           : tutor.date}
//                         {tutor.date.length > 10 && (
//                           <span style={{ fontSize: "0.8rem", color: "gray" }}>
//                             (..see more)
//                           </span>
//                         )}
//                       </span>
//                     </Tooltip>
//                   </Typography>
//                   <Typography variant="body2">
//                     <strong>Platform:</strong>{" "}
//                     <Tooltip
//                       title={tutor.platform}
//                       arrow
//                       componentsProps={{
//                         tooltip: {
//                           sx: {
//                             fontSize: "1rem",
//                             backgroundColor: "#1976d2",
//                             color: "#fff",
//                           },
//                         },
//                       }}
//                     >
//                       <span>
//                         {tutor.platform.length > 100
//                           ? tutor.platform.substring(0, 100) + "(..see more)"
//                           : tutor.platform}
//                       </span>
//                     </Tooltip>
//                   </Typography>
//                   <Typography variant="body2">
//                     <strong>Locations:</strong>{" "}
//                     <Tooltip
//                       title={tutor.location}
//                       arrow
//                       componentsProps={{
//                         tooltip: {
//                           sx: {
//                             fontSize: "1rem",
//                             backgroundColor: "#1976d2",
//                             color: "#fff",
//                           },
//                         },
//                       }}
//                     >
//                       <span style={{ cursor: "pointer" }}>
//                         {tutor.location.length > 10
//                           ? tutor.location.substring(0, 10) + " " // Add a space before "see more"
//                           : tutor.location}
//                         {tutor.location.length > 10 && (
//                           <span style={{ fontSize: "0.8rem", color: "gray" }}>
//                             (..see more)
//                           </span>
//                         )}
//                       </span>
//                     </Tooltip>
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>

//         {filteredTutors.length === 0 && (
//           <Typography variant="h6" color="error" align="center" sx={{ mt: 3 }}>
//             No tutors found.
//           </Typography>
//         )}
//       </Container>
//     </>
//   );
// }

import { useState, useEffect } from "react";
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
  Tooltip,
} from "@mui/material";
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

        <Grid container spacing={3}>
          {filteredTutors.map((tutor) => (
            <Grid item key={tutor.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: 2,
                  p: 2,
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
                        color="primary"
                        size="small"
                        sx={{ mt: 2, mb: 1 }}
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
                      componentsProps={{
                        tooltip: {
                          sx: {
                            fontSize: "1rem",
                            backgroundColor: "#1976d2",
                            color: "#fff",
                          },
                        },
                      }}
                    >
                      <span>
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
                      componentsProps={{
                        tooltip: {
                          sx: {
                            fontSize: "1rem",
                            backgroundColor: "#1976d2",
                            color: "#fff",
                          },
                        },
                      }}
                    >
                      <span>
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
                      componentsProps={{
                        tooltip: {
                          sx: {
                            fontSize: "1rem",
                            backgroundColor: "#1976d2",
                            color: "#fff",
                          },
                        },
                      }}
                    >
                      <span>
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
                      componentsProps={{
                        tooltip: {
                          sx: {
                            fontSize: "1rem",
                            backgroundColor: "#1976d2",
                            color: "#fff",
                          },
                        },
                      }}
                    >
                      <span style={{ cursor: "pointer" }}>
                        {tutor.date.length > 10
                          ? tutor.date.substring(0, 10) + " " // Add a space before "see more"
                          : tutor.date}
                        {tutor.date.length > 10 && (
                          <span style={{ fontSize: "0.8rem", color: "gray" }}>
                            (..see more)
                          </span>
                        )}
                      </span>
                    </Tooltip>
                  </Typography>
                  <Typography variant="body2">
                    <strong>Platform:</strong>{" "}
                    <Tooltip
                      title={tutor.platform}
                      arrow
                      componentsProps={{
                        tooltip: {
                          sx: {
                            fontSize: "1rem",
                            backgroundColor: "#1976d2",
                            color: "#fff",
                          },
                        },
                      }}
                    >
                      <span>
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
                      componentsProps={{
                        tooltip: {
                          sx: {
                            fontSize: "1rem",
                            backgroundColor: "#1976d2",
                            color: "#fff",
                          },
                        },
                      }}
                    >
                      <span style={{ cursor: "pointer" }}>
                        {tutor.location.length > 10
                          ? tutor.location.substring(0, 10) + " " // Add a space before "see more"
                          : tutor.location}
                        {tutor.location.length > 10 && (
                          <span style={{ fontSize: "0.8rem", color: "gray" }}>
                            (..see more)
                          </span>
                        )}
                      </span>
                    </Tooltip>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredTutors.length === 0 && (
          <Typography variant="h6" color="error" align="center" sx={{ mt: 3 }}>
            No tutors found.
          </Typography>
        )}
      </Container>
    </>
  );
}
