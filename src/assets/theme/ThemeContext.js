import React, { useState, createContext, useEffect } from "react";

export const ThemeContext = createContext();

function ThemeContextProvider(props) {
  const [themeColor, setThemeColor] = useState("");

  useEffect(() => {
    const defaultTheme = localStorage.getItem("theme");

    if (defaultTheme && defaultTheme === "dark") {
      setThemeColor("dark");
      document.body.setAttribute("data-theme", "dark-theme");
    } else {
      setThemeColor("light");
      document.body.setAttribute("data-theme", "light-theme");
    }
  }, []);

  const handleThemeColor = (value) => {
    if (value === "dark") {
      document.body.setAttribute("data-theme", "dark-theme");
      setThemeColor(value);
      localStorage.setItem("theme", value);
    } else {
      document.body.setAttribute("data-theme", "light-theme");
      setThemeColor(value);
      localStorage.setItem("theme", value);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        themeColor,
        handleThemeColor,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;
