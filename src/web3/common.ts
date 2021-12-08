import { PublicKey } from "@solana/web3.js";

export const TOKEN_MINT_ACCOUNT = new PublicKey(
  process.env.GATSBY_TOKEN_MINT_ACCOUNT,
);

export const programID = new PublicKey(process.env.GATSBY_PROGRAM_ID);

export const GULP_HOLE = new PublicKey(process.env.GATSBY_GULP_HOLE);
