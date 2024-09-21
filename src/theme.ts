import { createTheme } from "@mantine/core";
import { paletteColors } from "./global/constants/Colors";

export const theme = createTheme({
  colors: {
    "primary-cyan": paletteColors,
  },
  primaryColor: "primary-cyan",
  fontFamily: "Segoe UI",
  fontFamilyMonospace: "Segoe UI, Courier, monospace",
  headings: { fontFamily: "Segoe UI, sans-serif" },
});
