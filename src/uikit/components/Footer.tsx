import React from "react";
import { styled } from "@/uikit";

import logo from "@/assets/icons/c999_logo_colour.svg";
import medium from "@/assets/icons/social_medium.svg";
import twitter from "@/assets/icons/social_twitter.svg";
import figma from "@/assets/icons/social_figma.svg";
import github from "@/assets/icons/social_github.svg";

const Container = styled.footer`
  background-color: ${({ theme }) => theme.palette.White};

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 110.8rem;
    height: 10.4rem;
    padding: 0 4rem;
    margin: 0 auto;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile_horizontal}) {
    & > div {
      flex-direction: column;
      height: auto;
      row-gap: ${({ theme }) => theme.spacing.base};
    }
  }
`;

const Logo = styled.img`
  width: auto;
  height: 3.2rem;
  background-size: cover;
`;

const SocialMedia = styled.div`
  display: flex;
`;

const SocialMediaIcon = styled.a`
  margin: 1rem;

  img {
    max-width: 32px;
    max-height: 32px;
  }
`;

export const Footer: React.FC = () => (
  <Container>
    <div>
      <Logo src={logo} alt="logo" />
      <SocialMedia>
        {/* TODO: add social media links */}
        {/*        <SocialMediaIcon href="#" target="_blank">
          <img src={telegram} alt="Telegram" />
        </SocialMediaIcon>
        <SocialMediaIcon href="#" target="_blank">
          <img src={discord} alt="Discord" />
        </SocialMediaIcon>
        <SocialMediaIcon href="#" target="_blank">
          <img src={reddit} alt="Reddit" />
        </SocialMediaIcon> */}
        <SocialMediaIcon
          href="https://medium.com/@shadok.finance"
          target="_blank"
        >
          <img src={medium} alt="Medium" />
        </SocialMediaIcon>
        <SocialMediaIcon
          href="https://twitter.com/shadokfi"
          target="_blank"
        >
          <img src={twitter} alt="Twitter" />
        </SocialMediaIcon>
        <SocialMediaIcon
          href="https://figma.com/@shadokfinance"
          target="_blank"
        >
          <img src={figma} alt="Figma" />
        </SocialMediaIcon>
        <SocialMediaIcon
          href="https://github.com/shadok-finance"
          target="_blank"
        >
          <img src={github} alt="Github" />
        </SocialMediaIcon>
      </SocialMedia>
    </div>
  </Container>
);
