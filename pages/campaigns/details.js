import React, { Component } from "react";
import { Header } from "semantic-ui-react";
import Layout from "../../components/Layout";

class CampaignDetailPage extends Component {
  static async getInitialProps(props) {
    const address = props.query.address;
    return { address };
  }

  render() {
    return (
      <Layout>
        <Header as="h2">Campaign details {this.props.address}</Header>
      </Layout>
    );
  }
}

export default CampaignDetailPage;
