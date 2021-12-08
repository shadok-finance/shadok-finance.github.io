import React from "react";
import { styled } from "@/uikit";
import { TextAndImage } from "@/uikit/components";
import about from "@/assets/img/about.svg";
import tokenomics from "@/assets/img/tokenomics.svg";
import governance from "@/assets/img/governance.svg";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const About = () => (
  <Container id="about">
    <TextAndImage
      header="What is C999?"
      text="To escape their disfunctional planet, Shadoks have built a rocket powered by some miraculous combustible called Cosmogol 999, C999 in short. They have been pumping some C999 for decades and as they are stupid, they won't ever stop pumping."
      actions={[]}
      imageSrc={about}
      imageAlt="about"
      imagePosition="left"
    />
    <TextAndImage
      id="tokenomics"
      header="C999 Tokenomics"
      text="Every week, the minting price of C999 will double as the result of the continous pumping of the Shadoks. The collected $SOL token from the minting operations are sent to a Gulp, which is essentially a prison for undesirables. The Gulp address is known (TheGu1p111111111111111111111111111111111111), but unfortunately no one has access to the key."
      actions={[]}
      imageSrc={tokenomics}
      imageAlt="tokenomics"
    />
    <TextAndImage
      id="governance"
      header="Governance"
      text="Given that a Shadok only has 4 neurons, there is only a very limited amount of things they can create and as such, despite its minimalism, this protocol is considered complete. Shadoks count on the community to promote the Shadok way of thinking and self organise."
      actions={[]}
      imageSrc={governance}
      imageAlt="governance"
      imagePosition="left"
    />
  </Container>
);
