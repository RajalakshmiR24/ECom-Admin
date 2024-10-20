// App.jsx
import React, { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";

// Theme
import { themeSettings } from "theme";

// Routes
import AppRoutes from "./routes/Routes";

// App Component
const App = () => {
  // Dark/Light mode
  const mode = useSelector((state) => state.global.mode);

  // Theme setting
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        {/* Theme Provider */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* Routes */}
          <AppRoutes />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
