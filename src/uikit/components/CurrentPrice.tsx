import React from "react";
import { styled } from "@/uikit";

interface Props {
  priceForOneSol: number;
}

const Container = styled.div`
  & > span {
    display: block;
    color: ${({ theme }) => theme.palette.FadedOrange};
    margin-top: ${({ theme }) => theme.spacing.S};
    font-size: 1.6rem;
    font-weight: 300;
  }
`;

export const CurrentPrice = ({ priceForOneSol }: Props) =>
  priceForOneSol > 0 && (
    <Container>
      <span>
        Current price: $SOL 1 = $C999 {priceForOneSol.toLocaleString()}
      </span>
    </Container>
  );
