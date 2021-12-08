import React from "react";
import { styled } from "@/uikit";

type Size = "small" | "large";
const Container = styled.div<{ size: Size }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${({ size }) => (size === "small" ? "28rem" : "78rem")};
  width: ${({ size }) => (size === "small" ? "28rem" : "78rem")};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile_horizontal}) {
    width: 100%;
    max-width: 100%;
  }

  p,
  h4,
  h1 {
    text-align: center;
  }

  h1 {
    margin-bottom: ${({ theme }) => theme.spacing.M};
  }

  p {
    margin-bottom: ${({ theme, size }) =>
      size === "small" ? theme.spacing.M : theme.spacing.XXL};
    font-size: ${({ size }) => (size === "small" ? "1.8rem" : "2.6rem")};
  }
`;

interface Props {
  header: React.ReactNode;
  text: string;
  size?: Size;
}

export const Paragraph = ({ header, text, size = "small" }: Props) => (
  <Container size={size}>
    {size === "small" ? <h4>{header}</h4> : <h1>{header}</h1>}
    <p>{text}</p>
  </Container>
);
