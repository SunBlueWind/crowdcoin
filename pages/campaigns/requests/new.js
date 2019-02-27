import React, { Component } from "react";
import { Header, Icon, Divider } from "semantic-ui-react";
import Layout from "../../../components/Layout";
import NewRequestForm from "../../../components/NewRequestForm";
import web3 from "../../../ethereum/web3";

class NewCampaignPage extends Component {
  static async getInitialProps(props) {
    const address = props.query.address;
    const balance = await web3.eth.getBalance(address);
    return { address, balance };
  }

  render() {
    return (
      <Layout>
        <Header as="h2">
          <Icon name="idea" color="teal" />
          <Header.Content>
            Create a request
            <Header.Subheader>
              Create a spending request for campaign {this.props.address}.
            </Header.Subheader>
            <Header.Subheader>
              Note that the maximum amount of the request is{" "}
              {web3.utils.fromWei(this.props.balance, "ether")} ether.
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Divider hidden />
        <NewRequestForm address={this.props.address} />
      </Layout>
    );
  }
}

export default NewCampaignPage;
