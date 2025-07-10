import React, { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { Modal, Box, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import resumeImage from "../assets/resume.jpg";

const avatarUrl = process.env.PUBLIC_URL + "/logo2.png";

// Responsive breakpoints
const useResponsive = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = React.useState(
    window.innerWidth > 768 && window.innerWidth <= 1024
  );

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile, isTablet };
};

export default function Hero() {
  const { isMobile, isTablet } = useResponsive();
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  const handleOpenResumeModal = () => {
    setResumeModalOpen(true);
  };

  const handleCloseResumeModal = () => {
    setResumeModalOpen(false);
  };

  const handleDownload = async () => {
    try {
      const pdfUrl = process.env.PUBLIC_URL + "/Abhishek_DS_Resume.pdf";

      // Try to fetch the file first to ensure it exists
      const response = await fetch(pdfUrl);
      if (!response.ok) {
        throw new Error("PDF file not found");
      }

      // Create download link
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "Abhishek_DS_Resume.pdf";
      link.target = "_blank";

      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
      // Fallback: open in new tab
      window.open(process.env.PUBLIC_URL + "/Abhishek_DS_Resume.pdf", "_blank");
    }
  };

  return (
    <section
      id="hero" // 🔥 This makes your logo link scroll to here
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#000",
        color: "#fff",
        paddingTop: isMobile ? "60px" : "80px",
        padding: isMobile ? "60px 20px 20px 20px" : "80px 0 0 0",
        boxSizing: "border-box",
        overflow: "hidden",
        flexDirection: isMobile ? "column" : "row",
        flexWrap: "wrap",
      }}
    >
      {/* Avatar Section */}
      <div
        style={{
          flex: isMobile ? "none" : "1 1 50%",
          display: "flex",
          alignItems: isMobile ? "center" : "flex-start",
          justifyContent: isMobile ? "center" : "flex-start",
          paddingLeft: "0",
          order: isMobile ? 2 : 1,
          marginBottom: isMobile ? "2rem" : "0",
        }}
      >
        <img
          src={avatarUrl}
          alt="Avatar"
          style={{
            height: isMobile ? "40vh" : isTablet ? "70vh" : "90vh",
            width: "auto",
            maxWidth: isMobile ? "80%" : "100%",
            objectFit: "contain",
            filter: "grayscale(100%) drop-shadow(0 0 35px #e7e6e254)",
            borderRadius: "20px",
            transition: "all 0.3s ease-in-out",
            cursor: "default",
          }}
        />
      </div>

      {/* Text Section */}
      <div
        style={{
          flex: isMobile ? "none" : "1 1 50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: isMobile ? "center" : "flex-end",
          paddingRight: isMobile ? "0" : "5vw",
          paddingLeft: isMobile ? "0" : "0",
          boxSizing: "border-box",
          order: isMobile ? 1 : 2,
          width: isMobile ? "100%" : "auto",
        }}
      >
        <div
          style={{
            textAlign: isMobile ? "center" : "right",
            maxWidth: "100%",
            width: isMobile ? "100%" : "auto",
          }}
        >
          <h1
            style={{
              fontSize: isMobile ? "2.2rem" : isTablet ? "2.8rem" : "3.2rem",
              fontWeight: "bold",
              lineHeight: "1.2",
              marginBottom: "1rem",
            }}
          >
            <span style={{ display: "block" }}>Hi,</span>
            <span>
              I'm <span style={{ color: "#FFD700" }}>Abhishek D S</span>
            </span>
          </h1>

          <TypeAnimation
            sequence={[
              "Frontend Developer",
              2000,
              "React Enthusiast",
              2000,
              "UI/UX Explorer",
              2000,
            ]}
            speed={50}
            wrapper="span"
            repeat={Infinity}
            style={{
              fontSize: isMobile ? "1.2rem" : isTablet ? "1.4rem" : "1.6rem",
              color: "#fff",
            }}
          />

          {/* View Resume Button */}
          <div style={{ marginTop: "2rem" }}>
            <button
              onClick={handleOpenResumeModal}
              style={{
                fontFamily:
                  "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                padding: isMobile ? "12px 24px" : "14px 28px",
                fontSize: isMobile ? "1rem" : "1.1rem",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "#000",
                backgroundColor: "#FFD700",
                border: "2px solid #FFD700",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                textDecoration: "none",
                display: "inline-block",
                boxShadow: "0 4px 14px 0 rgba(255, 215, 0, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#FFD700";
                e.target.style.transform = "translateY(-2px) scale(1.02)";
                e.target.style.boxShadow =
                  "0 8px 25px 0 rgba(255, 215, 0, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#FFD700";
                e.target.style.color = "#000";
                e.target.style.transform = "translateY(0px) scale(1)";
                e.target.style.boxShadow =
                  "0 4px 14px 0 rgba(255, 215, 0, 0.3)";
              }}
            >
              View Resume
            </button>
          </div>
        </div>
      </div>

      {/* Resume Modal */}
      <Modal
        open={resumeModalOpen}
        onClose={handleCloseResumeModal}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: isMobile ? "20px" : "40px",
        }}
      >
        <Box
          onClick={handleCloseResumeModal}
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            outline: "none",
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          {/* Scrollable Resume Container */}
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              position: "relative",
              width: "100%",
              height: "calc(100vh - 100px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              overflow: "auto",
              paddingTop: isMobile ? "40px" : "60px",
              paddingBottom: "20px",
              paddingX: "20px",
              cursor: "default",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "rgba(255, 215, 0, 0.6)",
                borderRadius: "4px",
                "&:hover": {
                  background: "rgba(255, 215, 0, 0.8)",
                },
              },
            }}
          >
            {/* CV Container with Close Button */}
            <Box
              sx={{
                position: "relative",
                width: isMobile ? "100%" : "60%",
                minWidth: isMobile ? "100%" : "60vw",
                marginBottom: isMobile ? "60px" : "80px",
              }}
            >
              {/* Close Button positioned relative to CV */}
              <IconButton
                onClick={handleCloseResumeModal}
                sx={{
                  position: "absolute",
                  top: isMobile ? -10 : -15,
                  right: isMobile ? -10 : -15,
                  zIndex: 1002,
                  color: "#fff",
                  bgcolor: "rgba(0, 0, 0, 0.8)",
                  "&:hover": {
                    bgcolor: "rgba(0, 0, 0, 1)",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.2s ease",
                  width: isMobile ? 40 : 48,
                  height: isMobile ? 40 : 48,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                }}
              >
                <CloseIcon sx={{ fontSize: isMobile ? "1.1rem" : "1.3rem" }} />
              </IconButton>

              {/* Resume Image */}
              <img
                src={resumeImage}
                alt="Abhishek DS Resume"
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4)",
                  borderRadius: "12px",
                  cursor: "default",
                }}
                onClick={(e) => e.stopPropagation()}
                onLoad={() => console.log("Resume image loaded successfully")}
                onError={(e) => {
                  console.log("Resume image failed to load");
                  e.target.style.display = "none";
                }}
              />
            </Box>
          </Box>

          {/* Fixed Download Button */}
          <Button
            onClick={handleDownload}
            startIcon={<DownloadIcon />}
            sx={{
              position: "fixed",
              bottom: isMobile ? 20 : 30,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1001,
              fontFamily:
                "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: isMobile ? "0.9rem" : "1rem",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              px: isMobile ? 3 : 4,
              py: isMobile ? 1.2 : 1.5,
              bgcolor: "#FFD700",
              color: "#000",
              borderRadius: "8px",
              textTransform: "none",
              boxShadow: "0 4px 16px 0 rgba(255, 215, 0, 0.4)",
              "&:hover": {
                bgcolor: "#FFC700",
                transform: "translateX(-50%) translateY(-2px)",
                boxShadow: "0 6px 20px 0 rgba(255, 215, 0, 0.5)",
              },
              transition: "all 0.2s ease",
            }}
          >
            Download Resume
          </Button>
        </Box>
      </Modal>
    </section>
  );
}
