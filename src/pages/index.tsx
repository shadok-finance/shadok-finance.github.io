import React from "react";
import { ToastContainer } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import { Helmet } from "react-helmet";
import { Layout, Footer } from "@/uikit/components";
import { Header, MenuElement } from "@/sections/Header";
import { Hero, About, Roadmap, Faq, Community } from "@/sections";
import { Web3Provider } from "@/web3";
import { Web3ContextWrapper } from "@/web3/Web3Context";
import { UserTokenAccountContextWrapper } from "@/web3/UserTokenAccountContext";
import favicon from "@/assets/icons/c999_favicon.svg";

const menuElements: MenuElement[] = [
  { label: "About", url: "#about" },
  { label: "Tokenomics", url: "#tokenomics" },
  { label: "Governance", url: "#governance" },
  { label: "Roadmap", url: "#roadmap" },
  { label: "FAQ", url: "#faq" },
  { label: "Community", url: "#community" },
];

if (typeof window !== "undefined") {
  injectStyle();
}

export default function Home() {
  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Shadoks</title>
        <link id="favicon" rel="icon" href={favicon} />
      </Helmet>
      <Layout>
        <Web3Provider>
          <Web3ContextWrapper>
            <UserTokenAccountContextWrapper>
              <ToastContainer />
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
