import React from "react";
import { Maybe } from "true-myth";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useConnection } from "@solana/wallet-adapter-react";
import { GULP_HOLE } from "@/web3/common";

export const useTotalGulpSupply = (): [Maybe<number>, () => void] => {
  const [totalSupply, setTotalSupply] = React.useState<Maybe<number>>(
    Maybe.nothing(),
  );
  const { connection } = useConnection();

  const getSolInGulp = async (): Promise<Maybe<number>> => {
    try {
      const solBalance = await connection.getBalance(GULP_HOLE);

      return Maybe.of(solBalance / LAMPORTS_PER_SOL);
    } catch (err) {
      console.error("Failed to get total amount of $SOL in the Gulp");
      return Maybe.nothing<number>();
    }
  };

  const updateTotalSupply = async () => {
    const supply = await getSolInGulp();
    setTotalSupply(supply);
  };

  React.useEffect(() => {
    updateTotalSupply();
  }, [connection]);

  return [totalSupply, updateTotalSupply];
};
