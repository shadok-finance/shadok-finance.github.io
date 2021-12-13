import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React from "react";
import { Provider } from "@project-serum/anchor";
import { Maybe } from "true-myth";

export const useWeb3Provider = (): Maybe<Provider> => {
  const { connection } = useConnection();
  const wallet = useWallet();

  return React.useMemo(
    () =>
      Maybe.just(new Provider(connection, wallet, Provider.defaultOptions())),

    [connection, wallet],
  );
};
