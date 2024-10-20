// App.js
import React, { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom"; // Import RouterProvider
import { router } from "./routes/Routes"; // Adjust this path if necessary

// Theme
import { themeSettings } from "theme";

// App Component
const App = () => {
  // Dark/Light mode
  const mode = useSelector((state) => state.global.mode);

  // Theme setting
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* Use RouterProvider to provide the router */}
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
};

export default App;
