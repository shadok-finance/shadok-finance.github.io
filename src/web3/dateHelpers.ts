import Big from "big.js";
import { addWeeks } from "date-fns";

const MILIS_PER_SEC = new Big(1000);
const SEC_PER_MIN = new Big(60);
const MIN_PER_HOUR = new Big(60);
const HOUR_PER_DAY = new Big(24);
const DAY_PER_WEEK = new Big(7);

const MILIS_PER_WEEK = MILIS_PER_SEC.mul(SEC_PER_MIN)
  .mul(MIN_PER_HOUR)
  .mul(HOUR_PER_DAY)
  .mul(DAY_PER_WEEK);

export const nowTimestamp = () => new Big(Date.now());

export const calculateNumberOfWeeksToNow = (genesisTimestamp: Big): number =>
  Math.floor(
    nowTimestamp().sub(genesisTimestamp).div(MILIS_PER_WEEK).toNumber(),
  );

export const calculateNextPriceDoubling = (genesisTimestamp: Big): Date => {
  const weeksPassed = calculateNumberOfWeeksToNow(genesisTimestamp);
  const genesisTimestampDate = new Date(genesisTimestamp.toNumber());
  return addWeeks(genesisTimestampDate, weeksPassed + 1);
};
