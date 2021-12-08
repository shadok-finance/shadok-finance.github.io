import React from "react";
import { AccountInfo, ParsedAccountData, PublicKey } from "@solana/web3.js";
import { Maybe } from "true-myth";
import { Web3Context, Web3ContextData } from "@/web3/Web3Context";

export interface TokenAccount {
  pubkey: PublicKey;
  account: AccountInfo<ParsedAccountData>;
}

export const useTokenAccount = (
  tokenMintAccount: PublicKey,
): [Maybe<TokenAccount>, () => void] => {
  const web3 = React.useContext<Web3ContextData>(Web3Context);
  const [tokenAccount, setTokenAccount] = React.useState<Maybe<TokenAccount>>(
    Maybe.nothing(),
  );

  const updateAccount = React.useCallback(async () => {
    web3.match({
      Ok: async (web3Provider) => {
        try {
          const response =
            await web3Provider.connection.getParsedTokenAccountsByOwner(
              web3Provider.wallet.publicKey,
              { mint: tokenMintAccount },
            );
          setTokenAccount(Maybe.of(response.value[0]));
        } catch (e) {
          setTokenAccount(Maybe.nothing());
        }
      },
      Err: () => {
        setTokenAccount(Maybe.nothing);
        return Promise.resolve();
      },
    });
  }, [web3]);

  React.useEffect(() => {
    updateAccount();
  }, [updateAccount]);

  return [tokenAccount, updateAccount];
};
