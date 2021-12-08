import React from "react";
import { always } from "ramda";
import { Maybe } from "true-myth";
import Big from "big.js";
import { Button, MintAmountModal } from "@/uikit/components";
import { UserTokenAccountContext } from "@/web3/UserTokenAccountContext";
import { useCreateTokenAccount } from "@/web3/useCreateTokenAccount";
import { useMintMemecoin } from "@/web3/useMintMemecoin";
import { TokenAccount } from "@/web3/useTokenAccount";

interface Props {
  onTokenAccountCreated: (hash: string) => void;
  onCoinsMinted: (hash: string) => void;
  onError: (err: Error) => void;
  disabled: boolean;
  c999AmountForOneSol: Maybe<Big>;
}

interface ButtonState {
  text: "Mint C999" | "Initialize";
  onClick: () => void;
}

const deriveButtonStateFromUserTokenAccountContext = (
  account: Maybe<TokenAccount>,
  mint: () => void,
  createTokenAccount: () => void,
) =>
  account
    .map<ButtonState>(
      always({
        text: "Mint C999",
        onClick: mint,
      }),
    )
    .unwrapOr({ text: "Initialize", onClick: createTokenAccount });

export const MintProcessButton = ({
  onCoinsMinted,
  onTokenAccountCreated,
  onError,
  disabled,
  c999AmountForOneSol,
}: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [account, _] = React.useContext(UserTokenAccountContext);
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const createTokenAccount = useCreateTokenAccount(
    onTokenAccountCreated,
    onError,
  );
  const mintMemecoin = useMintMemecoin(onCoinsMinted, onError);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const [buttonState, setButtonState] = React.useState(
    deriveButtonStateFromUserTokenAccountContext(
      account,
      openModal,
      createTokenAccount,
    ),
  );

  React.useEffect(() => {
    const updatedState = deriveButtonStateFromUserTokenAccountContext(
      account,
      openModal,
      createTokenAccount,
    );
    setButtonState(updatedState);
  }, [account, createTokenAccount]);

  return (
    <>
      {showModal && (
        <MintAmountModal
          onMintAmountSelected={mintMemecoin}
          onClose={closeModal}
          c999Price={c999AmountForOneSol}
        />
      )}
      <Button disabled={disabled} onClick={buttonState.onClick}>
        {buttonState.text}
      </Button>
    </>
  );
};
