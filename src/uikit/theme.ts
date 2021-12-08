import * as styledComponents from "styled-components";
import { DefaultTheme, ThemedStyledComponentsModule } from "styled-components";
import { ColorPalette, palette } from "@/uikit/colors";

export type Spacing = "base" | "XS" | "S" | "M" | "L" | "XL" | "XXL";
export type MediaBreakpoints = "1200px" | "1000px" | "800px" | "600px";
export type ScreenSize = "desktop" | "tablet" | "mobile_horizontal" | "mobile";

export interface Theme extends DefaultTheme {
  spacing: Record<Spacing, string>;
  palette: ColorPalette;
  breakpoints: Record<ScreenSize, MediaBreakpoints>;
}

export const theme: Theme = {
  spacing: {
    XS: `0.4rem`,
    S: `0.8rem`,
    base: `1.6rem`,
    M: `2.4rem`,
    L: `3.2rem`,
    XL: `4.0rem`,
    XXL: `6.0rem`,
  },
  palette,
  breakpoints: {
    desktop: "1200px",
    mobile: "600px",
    tablet: "1000px",
    mobile_horizontal: "800px",
  },
};

const {
  createGlobalStyle,
  css,
  default: styled,
  keyframes,
  ThemeConsumer,
  ThemeProvider,
  withTheme,
} = styledComponents as unknown as ThemedStyledComponentsModule<Theme>;

export {
  createGlobalStyle,
  css,
  keyframes,
  styled,
  ThemeConsumer,
  ThemeProvider,
  withTheme,
};
