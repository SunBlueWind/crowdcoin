import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import Layout from "../components/Layout";
import CampaignList from "../components/CampaignList";
import factory from "../ethereum/factory";

class Home extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  render() {
    return (
      <Layout>
        <Button
          basic
          content="Create Campaign"
          icon="plus"
          color="teal"
          floated="right"
        />
        <CampaignList campaigns={this.props.campaigns} />
      </Layout>
    );
  }
}

export default Home;
