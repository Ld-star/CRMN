import React from "react";
import Particles from "react-particles-js";

const ParticlesBackground = () => {
  return (
    <Particles
      className="particles-area"
      params={{
        particles: {
          number: {
            value: 100,
            density: {
              enable: true,
              value_area: 1000,
            },
          },
          color: {
            value: "#cccccc",
          },

          size: {
            value: 1,
          },
          move: {
            direction: "right",
            speed: 0.05,
          },
          opacity: {
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.05,
            },
          },
          retina_detect: true,
          interactivity: {},
          line_linked: {
            color: "#cccccc",
            enable: true,
            opacity: 0.75,
          },
        },
      }}
    />
  );
};
export default ParticlesBackground;
