import React from "react";
import { styled } from "@/uikit";
import { TextAndImage } from "@/uikit/components";
import community from "@/assets/img/community.svg";

const BgShape = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 10vw;
  margin-top: ${({ theme }) => theme.spacing.L};
  overflow: hidden;

  &:after {
    display: block;
    content: "";
    height: 60vw;
    min-width: 135vw;
    border-radius: 50% 50% 0 0;
    background-color: ${({ theme }) => theme.palette.White};
  }
`;

const Container = styled.section`
  display: flex;
  justify-content: center;
  padding-bottom: ${({ theme }) => theme.spacing.L};
  background-color: ${({ theme }) => theme.palette.White};
`;

export const Community = () => (
  <>
    <BgShape />
    <Container id="community">
      <TextAndImage
        header="Join the community on Twitter!"
        text=""
        actions={[
          {
            buttonText: "Follow Now",
            link: {
              href: "https://twitter.com/shadokfi",
              target: "blank",
            },
          },
        ]}
        imageSrc={community}
        imageAlt="community"
        size="large"
        bgColor="white"
      />
    </Container>
  </>
);
