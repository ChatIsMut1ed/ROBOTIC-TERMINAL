import { createTheme } from "@mantine/core";
import { paletteColors } from "./global/constants/Colors";

export const theme = createTheme({
  colors: {
    "primary-cyan": paletteColors,
  },
  primaryColor: "primary-cyan",
  fontFamily: "Roboto Mono, sans-serif",
  fontFamilyMonospace: "Monaco, Courier, monospace",
  headings: { fontFamily: "Roboto Mono, sans-serif" },
});
