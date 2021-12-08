import React from "react";
import { styled } from "@/uikit";
import { Accordion } from "@/uikit/components";

const Container = styled.section`
  display: flex;
  justify-content: center;
  padding-top: ${({ theme }) => `${theme.spacing.XXL}`};
  padding-bottom: ${({ theme }) => `${theme.spacing.XXL}`};
  background-color: ${({ theme }) => theme.palette.EggShell};

  & > div {
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: 78rem;

    h3 {
      text-align: center;
    }

    p {
      font-size: 2.6rem;
      font-weight: 300;
      margin-bottom: ${({ theme }) => theme.spacing.XXL};
      text-align: center;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile_horizontal}) {
    padding-top: ${({ theme }) => `${theme.spacing.XL}`};
    padding-bottom: ${({ theme }) => `${theme.spacing.XL}`};

    & > div p {
      margin-bottom: ${({ theme }) => theme.spacing.L};
    }
  }
`;

export const Faq = () => (
  <Container id="faq">
    <div>
      <h3>Frequently Asked Questions</h3>
      <p>
        You may ask yourself a couple of questions if you discover the Shadoks
        for the first time.
      </p>
      <Accordion>
        <Accordion.Item id={0} label="How can you mint?">
          You should use a wallet compatible with Solana such as{" "}
          <a href="https://phantom.app/">Phantom</a> loaded with some SOL,
          Solana native token. Then, go at the top of this page and click the{" "}
          <b>Mint</b> button.
        </Accordion.Item>
        <Accordion.Item id={1} label="How could it be pumping forever?">
          The minting price will double every week and will eventually not be
          economically reasonable to mint, you&apos;ll probably want to buy some
          C999 from the secondary market.
        </Accordion.Item>
        <Accordion.Item id={2} label="Is this a pyramid scheme?">
          The Gulp is a solid prison, you can observe all the imprisoned SOL
          tokens in it{" "}
          <a href="https://solscan.io/account/TheGu1p111111111111111111111111111111111111">
            {" "}
            here
          </a>
          . As such, the C999 value only relies on the belief that Shadoks are
          here to stay and no one will ever be able to claim any SOL back.
        </Accordion.Item>
        <Accordion.Item id={3} label="What are the Shadoks?">
          If you haven&apos;t read it yet, checkout this{" "}
          <a href="https://en.wikipedia.org/wiki/Les_Shadoks">
            {" "}
            Wikipedia article
          </a>
          . In a world full of cats and dogs, we are convinced that Shadoks are
          a civilisation deserving some attention.
        </Accordion.Item>
      </Accordion>
    </div>
  </Container>
);
