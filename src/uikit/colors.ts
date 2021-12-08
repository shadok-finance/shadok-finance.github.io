export type Color =
  | "ShockingOrange"
  | "LightMustard"
  | "FadedOrange"
  | "EggShell"
  | "Grey1"
  | "Grey2"
  | "Grey3"
  | "Grey4"
  | "Grey5"
  | "Grey6"
  | "FountainBlue"
  | "BlueIvy"
  | "DarkLavender"
  | "White";

export type ColorPalette = Record<Color, string>;

export const palette: ColorPalette = {
  ShockingOrange: "#dd6843",
  LightMustard: "#f8d362",
  FadedOrange: "#e7914f",
  Grey2: "#333b41",
  EggShell: "#f9f0e7",
  Grey1: "#1f2224",
  Grey4: "#8f96a1",
  Grey3: "#656e7c",
  Grey5: "#cfd8dd",
  FountainBlue: "#4eb1dd",
  BlueIvy: "#4492bb",
  DarkLavender: "#7f4a94",
  Grey6: "#eff4f6",
  White: "#fff",
};
