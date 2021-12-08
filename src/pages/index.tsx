import React from "react";
import { Layout, Footer } from "@/uikit/components";
import { Header, MenuElement } from "@/sections/Header";
import { Hero, About, Roadmap, Faq, Community } from "@/sections";
import { Web3Provider } from "@/web3";
import { Web3ContextWrapper } from "@/web3/Web3Context";
import { UserTokenAccountContextWrapper } from "@/web3/UserTokenAccountContext";

const menuElements: MenuElement[] = [
  { label: "About", url: "#about" },
  { label: "Tokenomics", url: "#tokenomics" },
  { label: "Governance", url: "#governance" },
  { label: "Roadmap", url: "#roadmap" },
  { label: "FAQ", url: "#faq" },
  { label: "Community", url: "#community" },
];

export default function Home() {
  return (
    <main>
      <Layout>
        <Web3Provider>
          <Web3ContextWrapper>
            <UserTokenAccountContextWrapper>
              <Header elements={menuElements} />
              <Hero />
              <About />
              <Roadmap />
              <Faq />
              <Community />
              <Footer />
            </UserTokenAccountContextWrapper>
          </Web3ContextWrapper>
        </Web3Provider>
      </Layout>
    </main>
  );
}
