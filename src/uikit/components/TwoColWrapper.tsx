import React from "react";
import { styled } from "@/uikit";

interface ContainerProps {
  bgColor?: string;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }

  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing.XXL} 0`};
  background-color: ${({ bgColor, theme }) =>
    bgColor || theme.palette.EggShell};
`;

interface Props {
  id?: string;
  bgColor?: string;
}

export const TwoColWrapper: React.FC<Props> = ({ id, bgColor, children }) => (
  <Container id={id} bgColor={bgColor}>
    {children}
  </Container>
);
