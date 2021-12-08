import React from "react";
import { styled } from "@/uikit";
import { Countdown, TwoColWrapper, Button, Balance } from "@/uikit/components";
import { Buttons, Text, Image } from "@/uikit/components/TextAndImage";
import hero from "@/assets/img/hero.svg";
import { UserTokenAccountContext } from "@/web3/UserTokenAccountContext";
import { MintProcessButton } from "@/sections/Hero/MintProcessButton";
import { useTotalMemecoinSupply } from "@/web3/useTotalMemecoinSupply";
import { useTotalGulpSupply } from "@/web3/useTotalGulpSupply";
import { Web3Context } from "@/web3/Web3Context";
import { useC999AmountForOneSol } from "@/web3/useC999AmountForOneSol";
import { useNextPriceDoubling } from "@/web3/useNextPriceDoubling";

const Container = styled.section`
  display: flex;
  justify-content: center;
  padding-top: ${({ theme }) => `${theme.spacing.L}`};
  padding-bottom: ${({ theme }) => `${theme.spacing.L}`};
  background-color: ${({ theme }) => theme.palette.EggShell};
`;

const BalancesWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  & > * {
    margin-right: ${({ theme }) => theme.spacing.XL};
  }
`;

export const Hero = () => {
  const web3 = React.useContext(Web3Context);
  const [account, refreshAccount] = React.useContext(UserTokenAccountContext);
  const [c999Supply, updateC999Supply] = useTotalMemecoinSupply();
  const [solInGulp, updateSolInGulp] = useTotalGulpSupply();
  const c999AmountForOneSol = useC999AmountForOneSol();
  const nextPriceDoubling = useNextPriceDoubling();

  const tokenBalance = React.useMemo(
    () =>
      account.map((acc) => acc.account.data.parsed.info.tokenAmount.uiAmount),
    [account],
  );

  const refreshData = () => {
    refreshAccount();
    updateC999Supply();
    updateSolInGulp();
  };

  return (
    <Container id="hero">
      <TwoColWrapper>
        <Text hasActions size="large">
          {nextPriceDoubling
            .map((halvingDate) => <Countdown deadline={halvingDate} />)
            .unwrapOr(<></>)}
          <h1>Better Get Minting</h1>
          {tokenBalance
            .map((b) => <Balance token="C999" balance={b} isWalletBalance />)
            .unwrapOr(<></>)}
          {tokenBalance
            .map(() => (
              <p>
                You have already minted! Connect your wallet to mint some more
                goods.
              </p>
            ))
            .unwrapOr(
              <p>
                You haven&apos;t minted yet, connect your wallet to start
                minting the goods.
              </p>,
            )}
          <Buttons>
            <MintProcessButton
              onTokenAccountCreated={refreshData}
              onCoinsMinted={refreshData}
              onError={console.error}
              disabled={web3.isErr}
              c999AmountForOneSol={c999AmountForOneSol}
            />
            <Button
              variant="outline"
              link={{
                href: "https://medium.com/@shadok.finance/litepaper-f7b9bcd0ba29",
                target: "blank",
              }}
            >
              LitePaper
            </Button>
          </Buttons>
        </Text>
        <Image size="large">
          <img src={hero} alt="hero" />
          <BalancesWrapper>
            {solInGulp
              .map((b) => <Balance token="SOL" balance={b} />)
              .unwrapOr(<></>)}
            {c999Supply
              .map((b) => <Balance token="C999" balance={b} />)
              .unwrapOr(<></>)}
          </BalancesWrapper>
        </Image>
      </TwoColWrapper>
    </Container>
  );
};
