import React from "react";
import { DiJava, DiReact, DiNodejs, DiMongodb } from "react-icons/di";
import {
  SiCplusplus,
  SiExpress,
  SiFigma,
  SiAdobepremierepro,
} from "react-icons/si";

const floatingIcons = [
  <SiCplusplus size={40} />,
  <DiJava size={40} />,
  <DiReact size={40} />,
  <SiFigma size={40} />,
  <DiNodejs size={40} />,
  <SiExpress size={40} />,
  <DiMongodb size={40} />,
  <SiAdobepremierepro size={40} />,
];

// Generate non-overlapping icon positions
const generateNonOverlappingPositions = (count) => {
  const positions = [];

  while (positions.length < count) {
    const top = Math.random() * 30 + 35; // 35% to 65% (centered vertically)
    const left = Math.random() * 70 + 10; // 10% to 80% (horizontal spread)

    const isOverlapping = positions.some((pos) => {
      return Math.abs(pos.top - top) < 12 && Math.abs(pos.left - left) < 12;
    });

    if (!isOverlapping) {
      positions.push({ top, left });
    }
  }

  return positions;
};

const About = () => {
  const iconPositions = generateNonOverlappingPositions(floatingIcons.length);

  const containerStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: "3rem",
    backgroundColor: "#000",
    color: "white",
    justifyContent: "space-between",
  };

  const leftStyle = {
    flex: "1 1 60%",
    paddingRight: "2rem",
  };

  const rightStyle = {
    flex: "1 1 35%",
    position: "relative",
    height: "500px", // More vertical space
    overflow: "hidden",
  };

  const headingStyle = {
    fontSize: "2.5rem",
    marginBottom: "1.5rem",
  };

  const paragraphStyle = {
    marginBottom: "1.5rem",
    fontSize: "1.2rem",
    lineHeight: "1.8",
  };

  const floatingIconStyle = (top, left, i) => ({
    position: "absolute",
    top: `${top}%`,
    left: `${left}%`,
    color: "white",
    fontSize: "2.2rem",
    animation: `float ${4 + (i % 4)}s ease-in-out infinite`,
    zIndex: 1,
  });

  return (
    <>
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(10deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
        `}
      </style>

      <div id="about" style={containerStyle}>
        <div style={leftStyle}>
          <h1 style={headingStyle}>About Me</h1>
          <p style={paragraphStyle}>
            I'm Abhishek D S, a computer science student at Adichunchanagiri
            Institute of Technology, and a passionate developer with a strong
            foundation in C++ and Java, and a solid understanding of Data
            Structures and Algorithms. I enjoy solving problems and building
            efficient, scalable solutions.
          </p>

          <p style={paragraphStyle}>
            Alongside backend development, I have a creative edge — I design
            clean, user-friendly interfaces using Figma, and develop responsive
            web and mobile applications using the MERN stack (MongoDB,
            Express.js, React, Node.js).
          </p>

          <p style={paragraphStyle}>
            I'm also skilled in video editing using Adobe Premiere Pro, allowing
            me to create polished and engaging content.
          </p>

          <p style={paragraphStyle}>
            Whether it's designing, coding, or editing, I strive to blend
            functionality with creativity to deliver meaningful user
            experiences. I’m always eager to learn, grow, and explore new
            technologies to push the limits of what I can create.
          </p>
        </div>

        <div style={rightStyle}>
          {floatingIcons.map((icon, i) => {
            const { top, left } = iconPositions[i];
            return (
              <div key={i} style={floatingIconStyle(top, left, i)}>
                {icon}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default About;
