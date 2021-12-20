import React from "react";
import numbro from "numbro";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import { styled } from "@/uikit";

interface Props {
  deadline: Date;
}

const Container = styled.div`
  & > span {
    display: block;
    color: ${({ theme }) => theme.palette.FadedOrange};
    margin-bottom: ${({ theme }) => theme.spacing.S};
    font-size: 1.6rem;
    font-weight: 300;
  }
`;
const CountdownContainer = styled.div`
  display: flex;
`;

const CountdownElement = styled.div`
  color: ${({ theme }) => theme.palette.FadedOrange};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.White};
  border-radius: 1rem;
  padding: ${({ theme }) => theme.spacing.XS};
  width: 8rem;
  height: 7rem;
  margin-right: ${({ theme }) => theme.spacing.S};

  span {
    color: ${({ theme }) => theme.palette.FadedOrange};
  }
`;
const CountdownValue = styled.span`
  display: block;
  font-size: 2.6rem;
  height: 3.6rem;
  line-height: 1.4;
`;

const CountdownUnit = styled.span`
  display: block;
  font-size: 1.6rem;
  font-weight: 300;
  height: 2.2rem;
  line-height: 1.4;
`;

interface State {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateCountdownState =
  (deadline: Date) =>
  (current: Date): State => {
    const days = differenceInDays(deadline, current);
    const hours = differenceInHours(deadline, current) - days * 24;
    const minutes =
      differenceInMinutes(deadline, current) - days * 24 * 60 - hours * 60;
    const seconds =
      differenceInSeconds(deadline, current) -
      days * 24 * 60 * 60 -
      hours * 60 * 60 -
      minutes * 60;

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

const formatCountdownValue = (value: number) =>
  numbro(Math.max(0, value)).format("00");
export const Countdown = ({ deadline }: Props) => {
  const [countdownState, setCountdownState] = React.useState<State>(
    calculateCountdownState(deadline)(new Date()),
  );

  const updateCountdown = React.useCallback(calculateCountdownState(deadline), [
    deadline,
  ]);

  React.useEffect(() => {
    const timer = setInterval(
      () => setCountdownState(updateCountdown(new Date())),
      1000,
    );
    return () => clearInterval(timer);
  }, [updateCountdown]);

  return (
    <Container>
      <span>The next price doubling is in:</span>
      <CountdownContainer>
        <CountdownElement>
          <CountdownValue>
            {formatCountdownValue(countdownState.days)}
          </CountdownValue>
          <CountdownUnit>Days</CountdownUnit>
        </CountdownElement>
        <CountdownElement>
          <CountdownValue>
            {formatCountdownValue(countdownState.hours)}
          </CountdownValue>
          <CountdownUnit>Hours</CountdownUnit>
        </CountdownElement>
        <CountdownElement>
          <CountdownValue>
            {formatCountdownValue(countdownState.minutes)}
          </CountdownValue>
          <CountdownUnit>Minutes</CountdownUnit>
        </CountdownElement>
        <CountdownElement>
          <CountdownValue>
            {formatCountdownValue(countdownState.seconds)}
          </CountdownValue>
          <CountdownUnit>Seconds</CountdownUnit>
        </CountdownElement>
      </CountdownContainer>
    </Container>
  );
};
