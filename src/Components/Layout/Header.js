import { Box, Toolbar, CssBaseline } from "@mui/material";
import ResponsiveAppBar from "./ResponsiveAppBar";

export default function Header({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <ResponsiveAppBar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
