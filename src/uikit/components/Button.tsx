import React from "react";
import { Maybe } from "true-myth";
import { css, styled } from "@/uikit";

type Variant = "primary" | "outline";
type Size = "small" | "large";

export interface Button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  link?: {
    href: string;
    target?: string;
  };
}

export const ButtonStyles = css<Button>`
  font-family: Josefin Sans;
  font-size: ${({ size }) => (size === "large" ? "2.4rem" : "1.8rem")};
  font-weight: 700;
  line-height: ${({ size }) => (size === "large" ? "8rem" : "5.6rem")};
  height: ${({ size }) => (size === "large" ? "8rem" : "5.6rem")};
  letter-spacing: 0.48px;
  padding: ${({ theme, size }) =>
    size === "large" ? `0 ${theme.spacing.M}` : `0 ${theme.spacing.base}`};
  opacity: 1;
  text-decoration: none;

  &,
  &:focus,
  &:active {
    outline: none;
  }

  border-radius: 999px;
  border: none;
  box-shadow: ${({ variant, theme }) =>
    variant === "primary" ? "none" : `0 0 0 1px ${theme.palette.FadedOrange}`};

  min-width: 20rem;
  display: flex;
  justify-content: center;
  margin: ${({ theme }) => theme.spacing.M};

  &,
  &:hover,
  &:disabled {
    color: ${({ theme, variant }) =>
      variant === "outline"
        ? theme.palette.FadedOrange
        : theme.palette.White} !important;
    background-color: ${({ theme, variant }) =>
      variant === "outline"
        ? theme.palette.White
        : theme.palette.FadedOrange} !important;
    background-image: ${({ theme, variant }) =>
      variant === "primary"
        ? `linear-gradient(165deg, #ffcc81 6%, ${theme.palette.FadedOrange} 43%, ${theme.palette.ShockingOrange} 80%)`
        : "none"} !important;
  }

  &:disabled {
    opacity: 0.5;
  }

  &:hover {
    cursor: pointer;
  }
`;

const StyledButton = styled.button<Button>`
  ${ButtonStyles}
`;

const StyledLink = styled.a<Button>`
  ${ButtonStyles}
`;

export const Button: React.FC<Button> = ({
  size = "large",
  variant = "primary",
  children,
  link,
  ...otherProps
}) =>
  Maybe.of(link)
    .map(({ href, target }) => (
      <StyledLink variant={variant} size={size} href={href} target={target}>
        {children}
      </StyledLink>
    ))
    .unwrapOr(
      <StyledButton variant={variant} size={size} {...otherProps}>
        {children}
      </StyledButton>,
    );
