import * as spl from "@solana/spl-token";
import { Transaction } from "@solana/web3.js";
import React from "react";
import { toast } from "react-toastify";
import { TOKEN_MINT_ACCOUNT } from "@/web3/common";
import { Web3Context } from "@/web3/Web3Context";

export const useCreateTokenAccount = (
  onAccountCreated: (hash: string) => void,
  onAccountCreationFailed?: (err: Error) => void,
) => {
  const web3 = React.useContext(Web3Context);

  return React.useCallback(() => {
    web3.match({
      Ok: async (provider) => {
        const createAcc = async () => {
          const ata = await spl.Token.getAssociatedTokenAddress(
            spl.ASSOCIATED_TOKEN_PROGRAM_ID,
            spl.TOKEN_PROGRAM_ID,
            TOKEN_MINT_ACCOUNT,
            provider.wallet.publicKey,
          );

          const instruction = spl.Token.createAssociatedTokenAccountInstruction(
            spl.ASSOCIATED_TOKEN_PROGRAM_ID,
            spl.TOKEN_PROGRAM_ID,
            TOKEN_MINT_ACCOUNT,
            ata,
            provider.wallet.publicKey,
            provider.wallet.publicKey,
          );
          const recentBlockhash =
            await provider.connection.getRecentBlockhash();
          const tx = new Transaction({
            feePayer: provider.wallet.publicKey,
            recentBlockhash: recentBlockhash.blockhash,
          }).add(instruction);
          return provider.send(tx);
        };

        try {
          const hash = await toast.promise(createAcc(), {
            pending: "Creating C999 account!",
            error: "Failed to createn a C999 acount",
            success: "C999 account created",
          });
          onAccountCreated(hash);
        } catch (err) {
          onAccountCreationFailed(err);
        }
      },
      Err: async (err) => {
        onAccountCreationFailed(err);
      },
    });
  }, [web3]);
};
