import { Maybe } from "true-myth";
import React from "react";
import { useTokenAccount } from "@/web3/useTokenAccount";
import { TOKEN_MINT_ACCOUNT } from "@/web3/common";

export type UserTokenAccountContextData = ReturnType<typeof useTokenAccount>;

export const UserTokenAccountContext =
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  React.createContext<UserTokenAccountContextData>([Maybe.nothing(), () => {}]);

export const UserTokenAccountContextWrapper: React.FC = ({ children }) => {
  const tokenAccount = useTokenAccount(TOKEN_MINT_ACCOUNT);

  return (
    <UserTokenAccountContext.Provider value={tokenAccount}>
      {children}
    </UserTokenAccountContext.Provider>
  );
};
