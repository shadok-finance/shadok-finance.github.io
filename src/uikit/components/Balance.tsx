import React from "react";
import { styled } from "@/uikit";
import gulpIcon from "@/assets/icons/gulp.svg";
import c999Icon from "@/assets/icons/c999.svg";

const BalanceContainer = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: ${({ theme }) => theme.spacing.base};

  img {
    width: 3.2rem;
    height: 3.2rem;
    margin-right: ${({ theme }) => theme.spacing.S};
  }
`;

interface BalanceProps {
  token: "SOL" | "C999";
  balance: number;
  isWalletBalance?: boolean;
}

export const Balance = ({
  balance,
  token,
  isWalletBalance = false,
}: BalanceProps) => (
  <BalanceContainer>
    <img src={token === "SOL" ? gulpIcon : c999Icon} alt={token} />

    <span>
      ${token} {balance.toLocaleString()}
      {token === "SOL"
        ? " in the Gulp"
        : `${isWalletBalance ? " already in your wallet" : " minted"}`}
    </span>
  </BalanceContainer>
);
