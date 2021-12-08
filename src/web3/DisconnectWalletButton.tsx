import React from "react";
import { WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";
import { WalletConnectionButtonWrapper } from "./buttonStyles";

type Props = React.ComponentProps<typeof WalletDisconnectButton>;

export const DisconnectWalletButton = (props: Props) => (
  <WalletConnectionButtonWrapper variant="outline" size="large">
    <WalletDisconnectButton
      {...props}
      className={WalletConnectionButtonWrapper.ButtonClassName}
    />
  </WalletConnectionButtonWrapper>
);
