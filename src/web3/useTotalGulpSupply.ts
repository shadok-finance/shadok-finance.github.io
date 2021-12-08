import React from "react";
import { Maybe } from "true-myth";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Web3Context } from "@/web3/Web3Context";
import { GULP_HOLE } from "@/web3/common";

export const useTotalGulpSupply = (): [Maybe<number>, () => void] => {
  const [totalSupply, setTotalSupply] = React.useState<Maybe<number>>(
    Maybe.nothing(),
  );
  const web3 = React.useContext(Web3Context);

  const getSolInGulp = (): Promise<Maybe<number>> =>
    web3.match({
      Ok: async (provider) => {
        try {
          const solBalance = await provider.connection.getBalance(GULP_HOLE);

          return Maybe.of(solBalance / LAMPORTS_PER_SOL);
        } catch (err) {
          console.error("Failed to get total amount of $SOL in the Gulp");
          return Maybe.nothing<number>();
        }
      },
      Err: () => Promise.resolve(Maybe.nothing<number>()),
    });

  const updateTotalSupply = async () => {
    const supply = await getSolInGulp();
    setTotalSupply(supply);
  };

  React.useEffect(() => {
    updateTotalSupply();
  }, [web3]);

  return [totalSupply, updateTotalSupply];
};
