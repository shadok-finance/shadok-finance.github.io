import React from "react";
import { useGenesisTimestamp } from "@/web3/useGenesisTimestamp";
import { calculateNextPriceDoubling } from "@/web3/dateHelpers";

export const useNextPriceDoubling = () => {
  const genesisTimestamp = useGenesisTimestamp();

  return React.useMemo(
    () => genesisTimestamp.map(calculateNextPriceDoubling),
    [genesisTimestamp],
  );
};
