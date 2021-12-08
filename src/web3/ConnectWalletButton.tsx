import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { WalletConnectionButtonWrapper } from "./buttonStyles";

type Props = React.ComponentProps<typeof WalletMultiButton>;

export const ConnectWalletButton = (props: Props) => (
  <WalletConnectionButtonWrapper variant="primary" size="small">
    <WalletMultiButton
      {...props}
      className={WalletConnectionButtonWrapper.ButtonClassName}
    />
  </WalletConnectionButtonWrapper>
);
