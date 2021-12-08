import React from "react";
import { ThemeProvider } from "styled-components";
import { createGlobalStyle, theme } from "@/uikit";

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%; // 1rem = 10px

    @media (min-width: ${(props) =>
      props.theme.breakpoints.tablet}) and (max-width: ${(props) =>
  props.theme.breakpoints.desktop}) {
      font-size: 56.3%;
    }

    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: 50%;
    }

    &, * {
      box-sizing: border-box;
    }
  }

  body {
    color: ${(props) => props.theme.palette.Grey1};
    background-color: ${(props) => props.theme.palette.EggShell};

    font-family: Josefin Sans;
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 2.7rem;
    margin: 0;

    h1 {
      font-family: Amatic SC;
      font-weight: 700;
      font-size: 8rem;
      line-height: 9.6rem;
      margin: ${(props) => props.theme.spacing.base} 0;
    }

    h2 {
      font-family: Amatic SC;
      font-weight: 700;
      font-size: 6.4rem;
      line-height: 7.68rem;
    }

    h3 {
      font-family: Amatic SC;
      font-weight: 700;
      font-size: 4.8rem;
      line-height: 5.76rem;
      margin: ${(props) => props.theme.spacing.M} 0;
    }

    h4 {
      font-family: Amatic SC;
      font-weight: 700;
      font-size: 3.8rem;
      line-height: 4.56rem;
      margin: ${(props) => props.theme.spacing.M} 0;
    }

    p {
      font-weight: 300;
      margin: 0 0 ${(props) => props.theme.spacing.M};
    }
  ;
  }

  main {
    padding-top: 10.4rem;
    max-height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
    scroll-snap-type: y proximity;
    scroll-padding-top: 10.4rem;
    scroll-behavior: smooth;
  }

  section {
    scroll-snap-align: start;
    padding: 0 ${(props) => props.theme.spacing.XL};
  }

  .wallet-adapter-modal-wrapper {

    .wallet-adapter-modal-logo-wrapper {
      background-color: ${(props) => props.theme.palette.EggShell};
    }

    h1 {
      color ${(props) => props.theme.palette.Grey1};
    }

    background-color: ${(props) => props.theme.palette.FadedOrange};

    .wallet-adapter-modal-button-close svg {
      fill: ${(props) => props.theme.palette.Grey1};
    }

    ul li button, .wallet-adapter-modal-collapse-button {
      background-color: ${(props) => props.theme.palette.EggShell};
      color: ${(props) => props.theme.palette.Grey1};
      font-family: Josefin Sans;
    }
  }

  .wallet-adapter-dropdown {
    ul {
      background-color: ${(props) => props.theme.palette.FadedOrange};

      li {
        background-color: ${(props) => props.theme.palette.EggShell};
        color: ${(props) => props.theme.palette.Grey1};
      }
    }
  }

  .Toastify__toast {
    font-family: Josefin Sans !important;
  }

  .Toastify__progress-bar {
    background-color: ${(props) => props.theme.palette.FadedOrange} !important;
  }
`;

export const Layout: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);
