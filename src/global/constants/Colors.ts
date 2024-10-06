import { MantineColorsTuple } from "@mantine/core";

type CustomColors = {
  primary: string;
  primaryBackground: string;
  primaryDark: string;
  primaryLight: string;
  backgroundPrimary: string;

  secondary: string;
  secondaryBackground: string;
  secondaryDark: string;
  secondaryLight: string;

  background: string;
};

type SecondaryColorsType = string[];

export const paletteColors: MantineColorsTuple = [
  "#f5f4f5",
  "#e6e6e6",
  "#cccccc",
  "#b0b0b0",
  "#979797",
  "#898989",
  "#818182",
  "#6f6e70",
  "#646265",
  "#57535a",
];

export const myColors: CustomColors = {
  // primary
  primary: "#181719",
  primaryBackground: "#cccccc",
  primaryDark: "#57535a",
  primaryLight: "#b0b0b0",
  backgroundPrimary: "#e8e8e8",

  // secondary
  secondary: "#16bbc4",
  secondaryBackground: "#a6f1f5",
  secondaryDark: "#00979f",
  secondaryLight: "#53e1ea",

  // extra
  background: "#f2f2f8",
};

export const secondaryColors: SecondaryColorsType = [
  "#e2feff",
  "#d0f9fb",
  "#a6f1f5",
  "#77e9ee",
  "#53e1ea",
  "#3ddde7",
  "#2cdce5",
  "#17c3cc",
  "#00aeb6",
  "#00979f",
];
