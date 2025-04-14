// Projects.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useSwipeable } from "react-swipeable";
import { motion } from "framer-motion";
import ProjectModal from "./ProjectModal";

const projects = [
  {
    title: "Smart AI Itinerary Planner",
    description:
      "Hidden gems and planning personalized trips using React, FastAPI, and Google Maps.",
    image: "/ai-itinerary.png",
    images: ["/ai-itinerary.png", "/ai-itinerary.png"],
    techStack: ["React", "FastAPI", "Google Maps", "Python", "Scikit-learn"],
  },
  {
    title: "Project One",
    description: "A cool project that solves problem X using tech Y.",
    image: "/trial1.png",
    images: ["/trial1.png", "/trial1.png", "/trial1.png"],
    techStack: ["React", "Node.js"],
  },
  {
    title: "Project Two",
    description: "A creative solution built with React and Node.js.",
    image: "https://via.placeholder.com/400x200?text=Project+Two",
    images: [
      "https://via.placeholder.com/400x200?text=Project+Two",
      "https://via.placeholder.com/400x200?text=Project+Two+v2",
    ],
    techStack: ["React", "Node.js"],
  },
  {
    title: "Project Three",
    description: "An innovative app with responsive design.",
    image: "https://via.placeholder.com/400x200?text=Project+Three",
    images: [
      "https://via.placeholder.com/400x200?text=Project+Three",
      "https://via.placeholder.com/400x200?text=Project+Three+v2",
    ],
    techStack: ["React", "Material UI"],
  },
  {
    title: "Project Four",
    description: "A machine learning model to predict trends.",
    image: "https://via.placeholder.com/400x200?text=Project+Four",
    images: [
      "https://via.placeholder.com/400x200?text=Project+Four",
      "https://via.placeholder.com/400x200?text=Project+Four+v2",
    ],
    techStack: ["Python", "Scikit-learn"],
  },
];

const Projects = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  const resetTimer = () => {
    clearInterval(window.carouselInterval);
    window.carouselInterval = setInterval(next, 3000);
  };

  const prev = () => {
    if (transitioning) return;
    setTransitioning(true);
    resetTimer();
    setTimeout(() => {
      setActiveIndex(
        (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
      );
      setTransitioning(false);
    }, 100);
  };

  const next = () => {
    if (transitioning) return;
    setTransitioning(true);
    resetTimer();
    setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length);
      setTransitioning(false);
    }, 100);
  };

  useEffect(() => {
    window.carouselInterval = setInterval(next, 5000);
    return () => clearInterval(window.carouselInterval);
  }, []);

  const getProjectAt = (offset) => {
    const index = (activeIndex + offset + projects.length) % projects.length;
    return projects[index];
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    preventScrollOnSwipe: true,
    trackTouch: true,
  });

  return (
    <Box
      sx={{
        bgcolor: "#000",
        color: "#fff",
        minHeight: "80vh",
        py: 10,
        px: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
      id="projects"
    >
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 6 }}>
        Projects
      </Typography>

      <Box
        {...swipeHandlers}
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300 }}
          style={{ position: "absolute", left: -40, top: "50%", zIndex: 10 }}
        >
          <ArrowBackIos
            onClick={prev}
            sx={{
              transform: "translateY(-50%)",
              fontSize: 30,
              cursor: "pointer",
              color: "#fff",
            }}
          />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300 }}
          style={{ position: "absolute", right: -40, top: "50%", zIndex: 10 }}
        >
          <ArrowForwardIos
            onClick={next}
            sx={{
              transform: "translateY(-50%)",
              fontSize: 30,
              cursor: "pointer",
              color: "#fff",
            }}
          />
        </motion.div>

        <Box
          sx={{ display: "flex", gap: 4, alignItems: "center", height: 400 }}
        >
          {[getProjectAt(-1), getProjectAt(0), getProjectAt(1)].map(
            (project, idx) => {
              const isCenter = idx === 1;
              const cardIndex =
                (activeIndex + idx - 1 + projects.length) % projects.length;
              const isHovered = hoveredIndex === cardIndex;

              const handleMouseEnter = () => {
                if (isCenter) {
                  clearInterval(window.carouselInterval);
                  setHoveredIndex(cardIndex);
                }
              };

              const handleMouseLeave = () => {
                if (isCenter) {
                  setHoveredIndex(null);
                  resetTimer();
                }
              };

              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  whileHover={isCenter ? { scale: 1.02 } : {}}
                  style={{
                    zIndex: isCenter ? 2 : 1,
                    transition: "all 0.4s ease-in-out",
                  }}
                >
                  <Card
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    sx={{
                      width: isMobile ? 220 : isCenter ? 340 : 240,
                      transform: isCenter ? "scale(1.05)" : "scale(0.85)",
                      opacity: isCenter ? 1 : 0.4,
                      transition: "all 0.4s ease-in-out",
                      backgroundColor: "#111",
                      color: "#fff",
                      borderRadius: "12px",
                      overflow: "hidden",
                      position: "relative",
                      boxShadow:
                        isCenter && isHovered
                          ? "0 0 25px rgba(255,255,255,0.2)"
                          : "none",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={project.image}
                      alt={project.title}
                      height="180"
                    />
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {project.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: isCenter ? "0.95rem" : "0.75rem",
                          lineHeight: 1.5,
                          whiteSpace: "normal",
                        }}
                      >
                        {project.description}
                      </Typography>

                      {isCenter && isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          style={{
                            marginTop: 12,
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => openModal(project)}
                            sx={{
                              fontWeight: "bold",
                              fontSize: "0.75rem",
                              px: 2.5,
                              py: 0.8,
                              mt: 1,
                              color: "#fff",
                              borderColor: "#fff",
                              backgroundColor: "transparent",
                              "&:hover": {
                                backgroundColor: "rgba(255,255,255,0.1)",
                                borderColor: "#fff",
                              },
                            }}
                          >
                            View Project
                          </Button>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            }
          )}
        </Box>
      </Box>

      {/* Dots */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          mt: 8,
          zIndex: 1,
          position: "relative",
        }}
      >
        {projects.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: activeIndex === index ? 12 : 8,
              height: activeIndex === index ? 12 : 8,
              borderRadius: "50%",
              backgroundColor: activeIndex === index ? "#fff" : "#555",
              transition: "all 0.3s ease-in-out",
            }}
          />
        ))}
      </Box>

      <ProjectModal
        open={modalOpen}
        handleClose={closeModal}
        project={selectedProject}
      />
    </Box>
  );
};

export default Projects;
