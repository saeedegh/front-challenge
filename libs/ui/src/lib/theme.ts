import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: { main: "hsl(226,65%,52%)" },
    background: { default: "hsl(220,14%,98%)" },
  },
  shape: { borderRadius: 8 },
  typography: { fontFamily: "Tahoma, Arial, sans-serif" },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: "none" } } },
  },
});
