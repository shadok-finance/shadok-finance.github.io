import { styled } from "@/uikit";
import { Button, ButtonStyles } from "@/uikit/components";

const WalletConnectionButtonWrapperInner = styled.div<Button>`
  .connectionButton {
    ${ButtonStyles};
  }
`;

export const WalletConnectionButtonWrapper = Object.assign(
  WalletConnectionButtonWrapperInner,
  {
    ButtonClassName: "connectionButton",
  },
);
