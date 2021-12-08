import React from "react";
import { Maybe } from "true-myth";
import { PublicKey } from "@solana/web3.js";
import { BN, Idl, Program } from "@project-serum/anchor";
import Big from "big.js";
import { programID } from "@/web3/common";
import { Web3Context } from "@/web3/Web3Context";
import idl from "@/web3/idl.json";

const toJSTimestamp = (unixTimestamp: Big) => unixTimestamp.mul(new Big(1000));

export const useGenesisTimestamp = () => {
  const [timestamp, setTimestamp] = React.useState<Maybe<Big>>(Maybe.nothing());
  const web3 = React.useContext(Web3Context);

  const getTimestamp = (): Promise<Maybe<BN>> =>
    web3.match({
      Ok: async (provider) => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const [mintProgramAccount, _] = await PublicKey.findProgramAddress(
            [Buffer.from("mint_account")],

            programID,
          );
          const program = new Program(idl as Idl, programID, provider);

          const { genesisTimestamp }: any =
            await program.account.minterStateAccount.fetch(mintProgramAccount);

          return Maybe.of(genesisTimestamp);
        } catch (err) {
          console.error("Failed to get the genesis timestamp");
          return Maybe.nothing<BN>();
        }
      },
      Err: () => Promise.resolve(Maybe.nothing<BN>()),
    });

  const updateTimestamp = async () => {
    const res = await getTimestamp();
    setTimestamp(res.map((r) => new Big(r.toString())).map(toJSTimestamp));
  };
  React.useEffect(() => {
    updateTimestamp();
  }, [web3]);

  return timestamp;
};
