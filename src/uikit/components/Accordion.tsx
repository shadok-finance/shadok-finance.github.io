import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { css, styled } from "@/uikit";

import chevron from "@/assets/icons/chevron.svg";

const Wrapper = styled.div`
  width: 100%;
`;

const Item = styled.div`
  background-color: ${({ theme }) => theme.palette.White};
  margin: ${({ theme }) => theme.spacing.M} 0;
  border-radius: 1rem;
  width: 100%;
  padding: 0 2rem;
`;

interface ActivatableProps {
  isActive: boolean;
}

const Heading = styled.div<ActivatableProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  line-height: 5.2rem;
  color: ${({ theme }) => theme.palette.BlueIvy};
  &:after {
    display: block;
    content: "";
    width: 24px;
    height: 24px;
    background-image: url(${chevron});
  }
  ${({ isActive }) =>
    isActive &&
    css`
      &:after {
        transform: rotate(180deg);
      }
    `}
`;

interface BodyProps extends ActivatableProps {
  height: number;
}

const Body = styled.div<BodyProps>`
  display: flex;
  color: ${({ theme }) => theme.palette.Grey3};
  overflow: hidden;
  transition: max-height 0.15s ease-out;
  max-height: calc(
    ${({ height }) => height}px + ${({ theme }) => theme.spacing.S} +
      ${({ theme }) => theme.spacing.M} + 0px
  );
  & > div {
    padding-top: ${({ theme }) => theme.spacing.S};
    padding-bottom: ${({ theme }) => theme.spacing.M};
  }
  ${({ isActive }) =>
    !isActive &&
    css`
      max-height: 0;
    `}
`;

interface AccordionContextProps {
  activeItemId?: number | string;
  setActiveItemId: React.Dispatch<React.SetStateAction<number | null>>;
}

const AccordionContext = createContext({} as AccordionContextProps);

const AccordionWrapper: React.FC = ({ children }) => {
  const [activeItemId, setActiveItemId] = useState(0);

  const contextValue = useMemo(
    () => ({
      activeItemId,
      setActiveItemId,
    }),
    [activeItemId],
  );

  return (
    <Wrapper>
      <AccordionContext.Provider value={contextValue}>
        {children}
      </AccordionContext.Provider>
    </Wrapper>
  );
};

interface AccordionItemProps {
  id: number;
  label: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  label,
  children,
}) => {
  const ctx = useContext(AccordionContext);
  const isActive = ctx.activeItemId === id;
  const [itemHeight, setItemHeight] = useState(0);
  const bodyRef = useRef<HTMLDivElement>();

  useEffect(() => {
    setItemHeight(bodyRef?.current?.scrollHeight || 0);
  }, [bodyRef?.current?.scrollHeight]);

  return (
    <Item>
      <Heading
        isActive={isActive}
        onClick={() => ctx.setActiveItemId(!isActive ? id : null)}
      >
        <span>{label}</span>
      </Heading>
      <Body ref={bodyRef} isActive={isActive} height={itemHeight}>
        <div>{children}</div>
      </Body>
    </Item>
  );
};

export const Accordion = Object.assign(AccordionWrapper, {
  Item: AccordionItem,
});
