import React from "react";
import { styled } from "@/uikit";
import { Paragraph } from "@/uikit/components";
import roadmap from "@/assets/img/roadmap.svg";
import pumpItUp from "@/assets/img/pump_it_up.svg";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 118rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile_horizontal}) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;

const BottomRow = styled(Row)`
  max-width: 78rem;
  margin-bottom: ${({ theme }) => theme.spacing.XL};
`;

const Image = styled.img`
  height: auto;
  width: 100vw;
  margin: ${({ theme }) => theme.spacing.XL} 0;
`;

export const Roadmap = () => (
  <Container id="roadmap">
    <Image src={roadmap} alt="roadmap" />
    <Paragraph
      header="Roadmap"
      text="Shadocks put all their 4 neurons at work for creating this protocol, learn more."
      size="large"
    />
    <Row>
      <Paragraph
        header={
          <>
            Pump
            <br />
            It Up
          </>
        }
        text="This protocol has a minting price that doubles every week thanks to the pumping effort of the Shadoks."
      />
      <Paragraph
        header={
          <>
            Don&apos;t You Know
            <br />
            Pump It Up
          </>
        }
        text="They will continue to pump. You can count on them for this."
      />
      <Paragraph
        header={
          <>
            You&apos;ve Got To
            <br />
            Pump It Up
          </>
        }
        text="Absolutely. Shadoks will pump... forever."
      />
    </Row>
    <Image src={pumpItUp} alt="roadmap" />
    <BottomRow>
      {/*      <Paragraph
        header={
          <>
            You&apos;ve Got To
            <br />
            Pump It Up
          </>
        }
        text="Using headers to highlight the theme of each little paragraph makes the text more scannable. And let’s face it."
      />
      <Paragraph
        header={
          <>
            Don&apos;t You Know
            <br />
            Pump It Up
          </>
        }
        text="Using headers to highlight the theme of each little paragraph makes the text more scannable. And let’s face it."
      /> */}
    </BottomRow>
  </Container>
);
