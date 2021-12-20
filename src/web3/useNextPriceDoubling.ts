import React from "react";
import { Maybe } from "true-myth";
import { useGenesisTimestamp } from "@/web3/useGenesisTimestamp";
import { calculateNextPriceDoubling } from "@/web3/dateHelpers";

export const useNextPriceDoubling = (): [Maybe<Date>, () => void] => {
  const genesisTimestamp = useGenesisTimestamp();
  const [nextPriceDoubling, setNextPriceDoubling] = React.useState<Maybe<Date>>(
    Maybe.nothing(),
  );

  const updateNextPriceDoubling = () => {
    setNextPriceDoubling(genesisTimestamp.map(calculateNextPriceDoubling));
  };

  React.useEffect(() => {
    updateNextPriceDoubling();
  }, [genesisTimestamp]);

  return [nextPriceDoubling, updateNextPriceDoubling];
};
