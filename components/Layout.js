import React from "react";
import Head from "next/head";
import { Container, Divider } from "semantic-ui-react";
import Header from "./Header";

export default props => {
  return (
    <React.Fragment>
      <Head>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
      </Head>
      <Header />
      <Divider hidden />
      <Container>{props.children}</Container>
    </React.Fragment>
  );
};
