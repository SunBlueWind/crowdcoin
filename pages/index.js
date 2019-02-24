import React, { Component } from "react";
import { Button, Divider } from "semantic-ui-react";
import Layout from "../components/Layout";
import CampaignList from "../components/CampaignList";
import factory from "../ethereum/factory";

class HomePage extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  render() {
    return (
      <Layout>
        <Button basic content="Create Campaign" icon="plus" color="teal" />
        <Divider hidden />
        <CampaignList campaigns={this.props.campaigns} />
      </Layout>
    );
  }
}

export default HomePage;
