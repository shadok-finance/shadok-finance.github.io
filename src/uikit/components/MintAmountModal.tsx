import React from "react";
import { Maybe } from "true-myth";
import { Form, Formik, FormikProps } from "formik";
import Big from "big.js";
import { styled } from "@/uikit";
import { Button } from "@/uikit/components/Button";
import { hexToRGBA } from "@/util/hexToRGBA";
import c999Icon from "@/assets/icons/c999.svg";
import solana from "@/assets/icons/solana.png";

const ModalContainer = styled.div`
  display: block;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: ${({ theme }) => hexToRGBA(theme.palette.Grey1, 0.9)};

  &:hover {
    cursor: pointer;
  }
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.palette.White};
  border-radius: 1rem;
  padding: ${({ theme }) => theme.spacing.L};
  margin: 15% auto; /* 15% from the top and centered */
  max-width: 80%;
  width: 44.6rem;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &:hover {
    cursor: default;
  }

  input {
    height: 3.2rem;
    width: 100%;
    padding: ${({ theme }) =>
      `${theme.spacing.S} ${theme.spacing.S} ${theme.spacing.S} 0`};
    border: none;
    font-family: Josefin Sans;
    font-size: 1.4rem;
    font-weight: 500;

    outline: none;

    &::placeholder {
      color: ${({ theme }) => theme.palette.Grey4};
    }
  }

  button {
    width: 100%;
    margin: 0;
  }
`;

const SolanaLogo = styled.div`
  display: flex;
  align-items: center;
  margin: 0 ${({ theme }) => theme.spacing.base};

  img {
    width: 3.2rem;
    height: 3.2rem;
    margin-right: ${({ theme }) => theme.spacing.base};
  }

  span {
    color: ${({ theme }) => theme.palette.FountainBlue};
    font-family: Josefin Sans;
    font-size: 1.4rem;
    font-weight: 500;
    width: ${({ theme }) => theme.spacing.XL};
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.palette.Grey5};
  padding: ${({ theme }) => theme.spacing.S} 0;
  height: 4.6rem;
`;

const C999ResultAmount = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.EggShell};
  border-radius: 0.5rem;
  padding: ${({ theme }) => theme.spacing.base};
  height: 4.6rem;
  width: 100%;
  font-family: Josefin Sans;
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: ${({ theme }) => theme.spacing.L};

  img {
    width: 3.2rem;
    height: 3.2rem;
    margin-right: ${({ theme }) => theme.spacing.base};
  }

  span {
    color: ${({ theme }) => theme.palette.FadedOrange};
    margin-right: ${({ theme }) => theme.spacing.base};
    width: ${({ theme }) => theme.spacing.XL};
  }
`;

const ArrowDown = styled.div`
  margin: ${({ theme }) => theme.spacing.S};
  width: 3.2rem;
  height: 3.2rem;
  border: 1px solid ${({ theme }) => theme.palette.Grey5};
  border-radius: 999px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Props {
  onMintAmountSelected: (mintAmountSol: number) => void;
  onClose: () => void;
  c999Price: Maybe<Big>;
}

interface FormData {
  mintAmount: number;
}

export const MintAmountModal = ({
  onClose,
  onMintAmountSelected,
  c999Price,
}: Props) => {
  const contentRef = React.useRef<HTMLDivElement>();

  const detectClickOnBackground = (event: MouseEvent) => {
    const isOutside = Maybe.of(contentRef.current).map(
      (content) => !content.contains(event.target as any),
    );

    if (isOutside.isJust && isOutside.value) {
      onClose();
    }
  };

  const onSubmit = ({ mintAmount }: FormData) => {
    onMintAmountSelected(mintAmount);
    onClose();
  };

  const validate = ({ mintAmount }: FormData) => {
    if (mintAmount <= 0) {
      return { mintAmount: "The mint amount has to be greater than 0" };
    }

    return null;
  };

  const renderForm = ({
    handleChange,
    handleBlur,
    values,
    isValid,
  }: FormikProps<FormData>) => (
    <Form>
      <InputContainer>
        <SolanaLogo>
          <img src={solana} alt="solana" />
          <span>SOL</span>
        </SolanaLogo>
        <input
          id="mintAmount"
          name="mintAmount"
          type="number"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.mintAmount}
          min={0}
          step="any"
          placeholder="Enter amount"
        />
      </InputContainer>
      <ArrowDown>&darr;</ArrowDown>
      <C999ResultAmount>
        <img src={c999Icon} alt="C999" />
        <span>C999</span>
        {c999Price
          .map(
            (price) =>
              values.mintAmount &&
              new Big(values.mintAmount).mul(price).toString(),
          )
          .unwrapOr("Could not compute the C999 amount")}
      </C999ResultAmount>
      <Button type="submit" disabled={!isValid} size="small">
        Mint&nbsp;C999
      </Button>
    </Form>
  );

  React.useEffect(() => {
    document.addEventListener("mousedown", detectClickOnBackground);

    return () => {
      document.removeEventListener("mousedown", detectClickOnBackground);
    };
  });

  return (
    <ModalContainer>
      <ModalContent ref={contentRef}>
        <Formik<FormData>
          initialValues={{ mintAmount: 0 }}
          onSubmit={onSubmit}
          validate={validate}
          isInitialValid={false}
        >
          {renderForm}
        </Formik>
      </ModalContent>
    </ModalContainer>
  );
};
