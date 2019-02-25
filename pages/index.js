import React, { Component } from "react";
import { Button, Divider } from "semantic-ui-react";
import Layout from "../components/Layout";
import CampaignList from "../components/CampaignList";
import factory from "../ethereum/factory";
import { Link } from "../routes";

class HomePage extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  render() {
    return (
      <Layout>
        <Link route="/campaign/new">
          <a>
            <Button basic content="Create Campaign" icon="plus" color="teal" />
          </a>
        </Link>
        <Divider hidden />
        <CampaignList campaigns={this.props.campaigns} />
      </Layout>
    );
  }
}

export default HomePage;
