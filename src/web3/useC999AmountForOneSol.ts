import { Maybe } from "true-myth";
import React from "react";
import Big from "big.js";
import { useGenesisTimestamp } from "@/web3/useGenesisTimestamp";
import { calculateNumberOfWeeksToNow } from "@/web3/dateHelpers";

const INITIAL_C999_PER_SOL = new Big(10000);

const calculatePriceForOneSolForGenesisTimestamp = (genesisTimestamp: Big) => {
  const weeksPassed = calculateNumberOfWeeksToNow(genesisTimestamp);

  if (weeksPassed > 63) {
    return INITIAL_C999_PER_SOL.div(new Big(2).pow(63));
  }
  return INITIAL_C999_PER_SOL.div(new Big(2).pow(weeksPassed));
};

export const useC999AmountForOneSol = (): [Maybe<Big>, () => void] => {
  const genesisTimestamp = useGenesisTimestamp();
  const [c999AmountForOneSol, setC999AmountForOneSol] = React.useState<
    Maybe<Big>
  >(Maybe.nothing());

  const updateC999AmountForOneSol = () => {
    setC999AmountForOneSol(
      genesisTimestamp.map(calculatePriceForOneSolForGenesisTimestamp),
    );
  };

  React.useEffect(() => {
    updateC999AmountForOneSol();
  }, [genesisTimestamp]);

  return [c999AmountForOneSol, updateC999AmountForOneSol];
};
