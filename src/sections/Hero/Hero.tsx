import React from "react";
import { toast } from "react-toastify";
import { useWallet } from "@solana/wallet-adapter-react";
import { styled } from "@/uikit";
import {
  Countdown,
  TwoColWrapper,
  Button,
  Balance,
  CurrentPrice,
} from "@/uikit/components";
import { Buttons, Text, Image } from "@/uikit/components/TextAndImage";
import hero from "@/assets/img/hero.svg";
import { UserTokenAccountContext } from "@/web3/UserTokenAccountContext";
import { MintProcessButton } from "@/sections/Hero/MintProcessButton";
import { useTotalMemecoinSupply } from "@/web3/useTotalMemecoinSupply";
import { useTotalGulpSupply } from "@/web3/useTotalGulpSupply";
import { useC999AmountForOneSol } from "@/web3/useC999AmountForOneSol";
import { useNextPriceDoubling } from "@/web3/useNextPriceDoubling";
import { noop } from "@/util/other";

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
  flex-wrap: wrap;

  & > * {
    margin-right: ${({ theme }) => theme.spacing.S};
  }
`;

export const Hero = () => {
  const wallet = useWallet();
  const [account, refreshAccount] = React.useContext(UserTokenAccountContext);
  const [c999Supply, updateC999Supply] = useTotalMemecoinSupply();
  const [solInGulp, updateSolInGulp] = useTotalGulpSupply();
  const [c999AmountForOneSol, updateC999AmountForOneSol] =
    useC999AmountForOneSol();
  const [nextPriceDoubling, updateNextPriceDoubling] = useNextPriceDoubling();

  const tokenBalance = React.useMemo(
    () =>
      account.map((acc) => acc.account.data.parsed.info.tokenAmount.uiAmount),
    [account],
  );

  const refreshData = React.useCallback(async () => {
    await refreshAccount();
    await updateC999Supply();
    await updateSolInGulp();
  }, [refreshAccount, updateSolInGulp, updateC999Supply]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      refreshData();
    }, 5000);
    return () => clearInterval(interval);
  }, [refreshData]);

  const checkPriceDoubling = React.useCallback(() => {
    nextPriceDoubling.match({
      Just: (doublingDate) => {
        if (doublingDate < new Date()) {
          updateNextPriceDoubling();
          updateC999AmountForOneSol();
        }
      },
      Nothing: noop,
    });
  }, [nextPriceDoubling, updateNextPriceDoubling, updateC999AmountForOneSol]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      checkPriceDoubling();
    }, 1000);
    return () => clearInterval(interval);
  }, [checkPriceDoubling]);

  return (
    <Container id="hero">
      <TwoColWrapper>
        <Text hasActions size="large">
          {nextPriceDoubling
            .map((doublingDate) => <Countdown deadline={doublingDate} />)
            .unwrapOr(<></>)}
          {c999AmountForOneSol
            .map((price) => <CurrentPrice priceForOneSol={price.toNumber()} />)
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
              onError={(err) => toast.error(`${err.name}: ${err.message}`)}
              disabled={!wallet.connected}
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
