import React from "react";
import { css, styled } from "@/uikit";
import { Button, TwoColWrapper } from "@/uikit/components";

type ImagePosition = "left" | "right";
type ComponentSize = "small" | "large";

const Cell = styled.div<{ size: ComponentSize }>`
  margin: ${({ theme }) => theme.spacing.L} 0;
  max-width: ${({ size }) => (size === "small" ? "46rem" : "56rem")};
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-width: 36rem;
    width: 100%;
  }
`;

export const Text = styled(Cell)<{
  imagePosition?: ImagePosition;
  size: ComponentSize;
  hasActions: boolean;
}>`
  order: ${({ imagePosition }) =>
    !imagePosition || imagePosition === "right" ? 0 : 1};

  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: ${({ theme, imagePosition }) =>
    imagePosition === "right" ? theme.spacing.XXL : 0};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    order: 0;
    margin-right: 0;
    ${({ size }) =>
      size === "large"
        ? css`
            align-items: center;

            h1 {
              text-align: center;
            }
          `
        : css``}
  }

  p {
    margin-top: 0;
    font-size: ${({ size }) => (size === "small" ? "1.8rem" : "2.6rem")};
    font-weight: 300;
    margin-bottom: ${({ theme, hasActions }) =>
      hasActions ? theme.spacing.XXL : 0};
  }

  button,
  a {
    margin-top: 0;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      margin-left: 0;
      margin-right: 0;
      width: 100%;
    }

    &:first-child {
      margin-left: 0;
    }
  }
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
`;

export const Image = styled(Cell)<{
  imagePosition?: ImagePosition;
  size: ComponentSize;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  order: ${({ imagePosition }) =>
    !imagePosition || imagePosition === "right" ? 1 : 0};

  margin-right: ${({ theme, imagePosition }) =>
    imagePosition === "left" ? theme.spacing.XXL : 0};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    order: 1;
    margin-right: 0;
  }

  img {
    width: ${({ size }) => (size === "small" ? "46rem" : "56rem")};
    height: ${({ size }) => (size === "small" ? "38rem" : "48rem")};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      width: 100%;
      height: auto;
    }
  }
`;

interface Props {
  header: string;
  text: string;
  actions: (Button & { buttonText: string })[];
  imageSrc: React.ImgHTMLAttributes<HTMLImageElement>["src"];
  imageAlt: React.ImgHTMLAttributes<HTMLImageElement>["alt"];
  imagePosition?: "left" | "right";
  size?: ComponentSize;
  id?: string;
  bgColor?: string;
}

export const TextAndImage = ({
  text,
  imageAlt,
  imagePosition = "right",
  imageSrc,
  header,
  actions,
  size = "small",
  id,
  bgColor,
}: Props) => (
  <TwoColWrapper id={id} bgColor={bgColor}>
    <Text
      imagePosition={imagePosition}
      hasActions={actions.length > 0}
      size={size}
    >
      {size === "small" ? <h3>{header}</h3> : <h1>{header}</h1>}
      <p>{text}</p>
      {actions.length > 0 && (
        <Buttons>
          {actions.map(({ buttonText, ...buttonProps }) => (
            <Button key={buttonText} {...buttonProps}>
              {buttonText}
            </Button>
          ))}
        </Buttons>
      )}
    </Text>
    <Image imagePosition={imagePosition} size={size}>
      <img src={imageSrc} alt={imageAlt} />
    </Image>
  </TwoColWrapper>
);
