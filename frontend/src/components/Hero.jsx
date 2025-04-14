import React from "react";
import { TypeAnimation } from "react-type-animation";

const avatarUrl = process.env.PUBLIC_URL + "/logo2.png";

export default function Hero() {
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
        paddingTop: "80px", // adjust to navbar height
        boxSizing: "border-box",
        overflow: "hidden",
        flexWrap: "wrap",
      }}
    >
      {/* Avatar Section */}
      <div
        style={{
          flex: "1 1 50%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          paddingLeft: "0",
        }}
      >
        <img
          src={avatarUrl}
          alt="Avatar"
          style={{
            height: "90vh",
            width: "auto",
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
          flex: "1 1 50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-end",
          paddingRight: "5vw", // aligns text cleanly to the right
          boxSizing: "border-box",
        }}
      >
        <div style={{ textAlign: "right", maxWidth: "100%" }}>
          <h1
            style={{
              fontSize: "3.2rem",
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
              fontSize: "1.6rem",
              color: "#fff",
            }}
          />
        </div>
      </div>
    </section>
  );
}
