import React from "react";
import { Maybe } from "true-myth";
import { useConnection } from "@solana/wallet-adapter-react";
import { TOKEN_MINT_ACCOUNT } from "@/web3/common";

export const useTotalMemecoinSupply = (): [Maybe<number>, () => void] => {
  const [totalSupply, setTotalSupply] = React.useState<Maybe<number>>(
    Maybe.nothing(),
  );
  const { connection } = useConnection();

  const getTotalMemecoinSupply = async (): Promise<Maybe<number>> => {
    try {
      const response = await connection.getTokenSupply(TOKEN_MINT_ACCOUNT);

      return Maybe.of(response.value.uiAmount);
    } catch (err) {
      console.error("Failed to get total C999 supply");
      return Maybe.nothing<number>();
    }
  };

  const updateTotalSupply = async () => {
    const supply = await getTotalMemecoinSupply();
    setTotalSupply(supply);
  };

  React.useEffect(() => {
    updateTotalSupply();
  }, [connection]);

  return [totalSupply, updateTotalSupply];
};
