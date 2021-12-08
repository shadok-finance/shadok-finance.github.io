import * as spl from "@solana/spl-token";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram } from "@solana/web3.js";
import React from "react";
import { BN, Idl, Program } from "@project-serum/anchor";
import idl from "./idl.json";
import { GULP_HOLE, programID, TOKEN_MINT_ACCOUNT } from "@/web3/common";
import { Web3Context } from "@/web3/Web3Context";

export const useMintMemecoin = (
  onCoinsMinted: (hash: string) => void,
  onError: (err: Error) => void,
) => {
  const web3 = React.useContext(Web3Context);

  return React.useCallback(
    (mintAmount: number) => {
      web3.match({
        Ok: async (provider) => {
          try {
            const ata = await spl.Token.getAssociatedTokenAddress(
              spl.ASSOCIATED_TOKEN_PROGRAM_ID,
              spl.TOKEN_PROGRAM_ID,
              TOKEN_MINT_ACCOUNT,
              provider.wallet.publicKey,
            );

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [toAccount, _] = await PublicKey.findProgramAddress(
              [Buffer.from("mint_account")],
              programID,
            );

            const program = new Program(idl as Idl, programID, provider);

            const hash = await program.rpc.gulp(
              new BN(mintAmount * LAMPORTS_PER_SOL),
              {
                accounts: {
                  from: provider.wallet.publicKey,
                  gulpHole: GULP_HOLE,
                  shadokProgramAccount: toAccount,
                  c999MintAccount: TOKEN_MINT_ACCOUNT,
                  c999UserAccount: ata,
                  c999ProgramId: spl.TOKEN_PROGRAM_ID,
                  systemProgram: SystemProgram.programId,
                },
              },
            );

            onCoinsMinted(hash);
          } catch (e) {
            onError(e);
          }
        },
        Err: onError,
      });
    },
    [web3],
  );
};
