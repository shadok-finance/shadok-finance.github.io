import { Result } from "true-myth";
import { Provider } from "@project-serum/anchor";
import React from "react";
import { useWeb3Provider } from "@/web3/useWeb3Provider";

export const NoWalletConnectedError = new Error("No wallet connected");
export type Web3ContextData = Result<Provider, typeof NoWalletConnectedError>;

export const Web3Context = React.createContext<Web3ContextData>(
  Result.err(NoWalletConnectedError),
);

export const Web3ContextWrapper: React.FC = ({ children }) => {
  const web3 = useWeb3Provider();
  const contextValue = React.useMemo(
    () => web3.toOkOrErr(NoWalletConnectedError),
    [web3],
  );
  return (
    <Web3Context.Provider value={contextValue}>{children}</Web3Context.Provider>
  );
};
