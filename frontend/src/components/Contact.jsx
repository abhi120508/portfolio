import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import confetti from "canvas-confetti";

const Contact = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    description: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSendText, setShowSendText] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
  const [postmanExited, setPostmanExited] = useState(false);
  const [showSuccessEmoji, setShowSuccessEmoji] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const postmanAudio = new Audio(`${process.env.PUBLIC_URL}/postman_bell.mp3`);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Enter a valid email address.";
    }
    if (!formData.description.trim())
      errors.description = "Message is required.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitted(true);
    setShowSendText(false);
    setShowSuccessEmoji(false);
    setPostmanExited(false);

    postmanAudio.currentTime = 0;
    postmanAudio.play();

    setTimeout(() => {
      setPostmanExited(true);
      setShowSpinner(true);
    }, 1600);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        setShowSpinner(false);
        setShowSuccessEmoji(true);
        setSnackbar({
          open: true,
          message: "Message sent successfully!",
          severity: "success",
        });

        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: "", email: "", description: "" });
          setShowSendText(true);
          setShowSuccessEmoji(false);
        }, 1500);
      } else {
        setSnackbar({
          open: true,
          message: result.error || "Failed to send",
          severity: "error",
        });
        resetButtonState();
      }
    } catch (err) {
      console.error("Error sending email:", err);
      setSnackbar({
        open: true,
        message: "Failed to send message. Try again later.",
        severity: "error",
      });
      resetButtonState();
    }
  };

  const resetButtonState = () => {
    setIsSubmitted(false);
    setShowSendText(true);
    setShowSpinner(false);
    setPostmanExited(true);
    setShowSuccessEmoji(false);
  };

  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "#444" },
      "&:hover fieldset": { borderColor: "#aaa" },
      "&.Mui-focused fieldset": {
        borderColor: "#fff",
        boxShadow: "0 0 10px 2px rgba(255,255,255,0.3)",
      },
    },
    input: { color: "#fff" },
    textarea: { color: "#fff" },
    "& label": { color: "#aaa" },
    "& label.Mui-focused": { color: "#fff" },
  };

  return (
    <Box
      id="contact"
      sx={{
        bgcolor: "#000",
        color: "#fff",
        width: "100%",
        py: { xs: 6, sm: 8, md: 10 },
        px: { xs: 2, sm: 3 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={{ xs: 4, sm: 6 }}
        textAlign="center"
        fontSize={{ xs: "1.8rem", sm: "2rem", md: "2.2rem" }}
      >
        Contact Me
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: 600,
          display: "flex",
          flexDirection: "column",
          gap: { xs: 2, sm: 3 },
          px: { xs: 2, sm: 4 },
          py: { xs: 3, sm: 4, md: 5 },
          borderRadius: 2,
          boxShadow: "0 0 20px 5px rgba(255, 255, 255, 0.15)",
        }}
      >
        <TextField
          label="Name"
          name="name"
          fullWidth
          variant="outlined"
          value={formData.name}
          onChange={handleChange}
          sx={textFieldStyles}
          error={Boolean(formErrors.name)}
          helperText={formErrors.name}
        />
        <TextField
          label="Email"
          name="email"
          fullWidth
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
          sx={textFieldStyles}
          error={Boolean(formErrors.email)}
          helperText={formErrors.email}
        />
        <TextField
          label="Description"
          name="description"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={formData.description}
          onChange={handleChange}
          sx={textFieldStyles}
          error={Boolean(formErrors.description)}
          helperText={formErrors.description}
        />

        {/* Submit Button */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              position: "relative",
              width: { xs: "150px", sm: "180px" },
              height: "48px",
              border: "2px solid #fff",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              transition: "all 0.3s ease",
              cursor: isSubmitted ? "default" : "pointer",
              backgroundColor: "transparent",
              "&:hover": {
                transform: isSubmitted ? "none" : "scale(1.05)",
                boxShadow: isSubmitted
                  ? "none"
                  : "0 0 12px 2px rgba(255, 255, 255, 0.5)",
                backgroundColor: "rgba(255,255,255,0.05)",
              },
            }}
          >
            {isSubmitted && !postmanExited && (
              <img
                src={`${process.env.PUBLIC_URL}/postman.png`}
                alt="Postman"
                style={{
                  position: "absolute",
                  top: "8px",
                  left: "-40px",
                  height: "32px",
                  animation: "movePostman 1.5s linear forwards",
                  zIndex: 2,
                }}
              />
            )}

            {showSpinner && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 2,
                }}
              >
                <CircularProgress size={26} sx={{ color: "#fff" }} />
              </Box>
            )}

            {showSuccessEmoji && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  animation: "fadeInUp 0.5s ease-out",
                  zIndex: 2,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#00ff99"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    d="M20 6L9 17L4 12"
                    style={{
                      strokeDasharray: 24,
                      strokeDashoffset: 24,
                      animation: "dash 0.5s ease forwards",
                    }}
                  />
                </svg>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    color: "#00ff99",
                    animation: "bounceIn 0.5s ease",
                  }}
                >
                  Sent!
                </Typography>
              </Box>
            )}

            <Typography
              variant="button"
              sx={{
                opacity: showSendText ? 1 : 0,
                transition: "opacity 0.3s ease",
                zIndex: 2,
                color: "#fff",
              }}
            >
              Send
            </Typography>

            <Button
              type="submit"
              disabled={isSubmitted}
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                opacity: 0,
                zIndex: 3,
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Social Icons */}
      <Box
        sx={{
          mt: { xs: 4, sm: 5 },
          display: "flex",
          gap: { xs: 2, sm: 4 },
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <SocialIcon
          href="https://www.linkedin.com/in/abhishek-d-s-490467268"
          icon={<LinkedInIcon fontSize="large" />}
          color="#053660"
        />
        <SocialIcon
          href="https://github.com/abhi120508"
          icon={<GitHubIcon fontSize="large" />}
          color="#fff"
        />
        <SocialIcon
          href="https://wa.me/qr/VGHAADGOEQO6I1"
          icon={<WhatsAppIcon fontSize="large" />}
          color="#10a100"
        />
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Animations */}
      <style>
        {`
          @keyframes movePostman {
            0% { transform: translateX(0); opacity: 1; }
            100% { transform: translateX(220px); opacity: 1; }
          }
          @keyframes dash {
            to { stroke-dashoffset: 0; }
          }
          @keyframes bounceIn {
            0% { transform: scale(0.5); opacity: 0; }
            60% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(1); }
          }
          @keyframes fadeInUp {
            0% { transform: translateY(10px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </Box>
  );
};

const SocialIcon = ({ href, icon, color }) => (
  <Box
    component="a"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    sx={{
      transition: "transform 0.3s ease, filter 0.3s ease",
      "&:hover": {
        transform: "scale(1.2)",
        filter: `
          drop-shadow(0 0 6px ${color})
          drop-shadow(0 0 12px ${color})
          brightness(2)
        `,
      },
    }}
  >
    {React.cloneElement(icon, { sx: { color: "#fff" } })}
  </Box>
);

export default Contact;
