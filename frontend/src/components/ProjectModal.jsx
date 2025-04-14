import React, { useEffect, useState, useRef } from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

const ProjectModal = ({ open, handleClose, project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef(null); // Ref to store interval ID

  const images = project?.images || [];
  const imageDescriptions = project?.imageDescriptions || [];

  const clearAndRestartInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (open && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 3000);
    }
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    clearAndRestartInterval();
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    clearAndRestartInterval();
  };

  useEffect(() => {
    if (open && images.length > 1) {
      clearAndRestartInterval();
    }
    return () => clearInterval(intervalRef.current);
  }, [open, images.length]);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project]);

  if (!project) return null;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70vw",
          height: "60vh",
          bgcolor: "#111",
          color: "#fff",
          boxShadow: 24,
          p: 4,
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: 8, right: 8, color: "#fff" }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {project.title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            mt: 3,
            height: "calc(100% - 100px)",
            gap: 4,
          }}
        >
          {/* Image Carousel */}
          <Box
            sx={{
              flex: 1.5,
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 2,
              overflow: "hidden",
              height: "100%",
            }}
          >
            <IconButton
              onClick={handlePrev}
              sx={{
                position: "absolute",
                left: 8,
                zIndex: 2,
                color: "#fff",
                backgroundColor: "rgba(0,0,0,0.3)",
                "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
              }}
            >
              <ArrowBackIos />
            </IconButton>

            <Box sx={{ width: "100%", height: "100%" }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={images[currentImageIndex]}
                  src={images[currentImageIndex]}
                  alt={`carousel-${currentImageIndex}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    borderRadius: "8px",
                    border: "1px solid #444",
                  }}
                />
              </AnimatePresence>
            </Box>

            <IconButton
              onClick={handleNext}
              sx={{
                position: "absolute",
                right: 8,
                zIndex: 2,
                color: "#fff",
                backgroundColor: "rgba(0,0,0,0.3)",
                "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
              }}
            >
              <ArrowForwardIos />
            </IconButton>
          </Box>

          {/* Description */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              px: 2,
              borderLeft: { md: "1px solid #333", xs: "none" },
              height: "100%",
              overflowY: "auto",
            }}
          >
            <Typography variant="subtitle1" color="gray" gutterBottom>
              Image Description
            </Typography>
            <Typography variant="body2" whiteSpace="pre-wrap">
              {imageDescriptions[currentImageIndex] ||
                "No description provided."}
            </Typography>
          </Box>
        </Box>

        {/* Dots */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
            gap: 1,
          }}
        >
          {images.map((_, idx) => (
            <Box
              key={idx}
              onClick={() => {
                setCurrentImageIndex(idx);
                clearAndRestartInterval();
              }}
              sx={{
                width: currentImageIndex === idx ? 12 : 8,
                height: currentImageIndex === idx ? 12 : 8,
                borderRadius: "50%",
                backgroundColor: currentImageIndex === idx ? "#fff" : "#555",
                cursor: "pointer",
              }}
            />
          ))}
        </Box>
      </Box>
    </Modal>
  );
};

export default ProjectModal;
