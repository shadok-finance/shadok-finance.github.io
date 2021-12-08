import React from "react";
import { styled } from "@/uikit";
import logo from "@/assets/icons/c999_logo_colour.svg";
import headerShape from "@/assets/img/header_shape.svg";
import { ConnectWalletButton } from "@/web3";

const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4rem;
  background-image: url(${headerShape});
  background-repeat: no-repeat;
  background-position: bottom;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    background-size: cover;
  }

  height: 10.4rem;

  button {
    margin: 0;
    width: 17rem;
    min-width: 17rem;
  }
`;

export interface MenuElement {
  label: string;
  url: string;
}

interface Props {
  elements: MenuElement[];
}

const Menu = styled.div`
  display: flex;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const MenuItem = styled.div`
  margin: 0 2rem;
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.Grey2};
  font-family: Amatic SC;
  letter-spacing: 0.56px;

  &:hover {
    cursor: pointer;
  }
`;

const Logo = styled.img`
  width: 11.8rem;
  height: 5.6rem;
`;

const NavLink = styled.a`
  &,
  &:visited,
  &:active {
    text-decoration: none;
    color: inherit;
  }
`;

export const Header = ({ elements }: Props) => (
  <Container>
    <NavLink href="#hero">
      <Logo alt="logo" src={logo} />
    </NavLink>
    <Menu>
      {elements.map((item) => (
        <MenuItem key={item.label}>
          <NavLink href={item.url}>{item.label}</NavLink>
        </MenuItem>
      ))}
    </Menu>
    <ConnectWalletButton />
  </Container>
);
