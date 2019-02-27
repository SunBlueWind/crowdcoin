import React, { Component } from "react";
import { Button, Divider, Header, Icon } from "semantic-ui-react";
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
        <Header as="h1">
          <Icon name="ethereum" color="teal" />
          <Header.Content>
            Welcome to <span style={{ fontStyle: "italic" }}>CrowdCoin</span>
            <Header.Subheader>
              <span style={{ fontStyle: "italic" }}>CrowdCoin</span> allows you
              to create campaigns to raise ethereum for your projects.
            </Header.Subheader>
            <Header.Subheader>
              Anyone could contribute to your camapign and become a contributor.
            </Header.Subheader>
            <Header.Subheader>
              Once your campaign has raised enough ether, you can start creating
              spend requets.
            </Header.Subheader>
            <Header.Subheader>
              Once more than half of the contributors have approved the request,
              you can finalize it to send the ether to the recipient!
            </Header.Subheader>
            <Header.Subheader style={{ fontStyle: "italic" }}>
              Note: this site only works in the Rinkeby Test Network.
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Divider hidden />
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
