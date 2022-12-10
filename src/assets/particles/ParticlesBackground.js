import React from "react";
import Particles from "react-particles-js";

const ParticlesBackground = () => {
  return (
    <Particles
      className="particles-area-night"
      params={{
        particles: {
          number: {
            value: 50,
          },
          size: {
            value: 3,
          },
        },
        interactivity: {
          events: {
            onhover: {
              enable: true,
              mode: "repulse",
            },
          },
        },
      }}
    />
  );
};
export default ParticlesBackground;
