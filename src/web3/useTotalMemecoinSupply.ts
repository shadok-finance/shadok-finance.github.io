import React from "react";
import { Maybe } from "true-myth";
import { Web3Context } from "@/web3/Web3Context";
import { TOKEN_MINT_ACCOUNT } from "@/web3/common";

export const useTotalMemecoinSupply = (): [Maybe<number>, () => void] => {
  const [totalSupply, setTotalSupply] = React.useState<Maybe<number>>(
    Maybe.nothing(),
  );
  const web3 = React.useContext(Web3Context);

  const getTotalMemecoinSupply = (): Promise<Maybe<number>> =>
    web3.match({
      Ok: async (provider) => {
        try {
          const response = await provider.connection.getTokenSupply(
            TOKEN_MINT_ACCOUNT,
          );

          return Maybe.of(response.value.uiAmount);
        } catch (err) {
          console.error("Failed to get total C999 supply");
          return Maybe.nothing<number>();
        }
      },
      Err: () => Promise.resolve(Maybe.nothing<number>()),
    });

  const updateTotalSupply = async () => {
    const supply = await getTotalMemecoinSupply();
    setTotalSupply(supply);
  };

  React.useEffect(() => {
    updateTotalSupply();
  }, [web3]);

  return [totalSupply, updateTotalSupply];
};
