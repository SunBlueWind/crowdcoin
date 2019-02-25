import React, { Component } from "react";
import { Header, Statistic, Icon, Divider } from "semantic-ui-react";
import Layout from "../../components/Layout";
import campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";

class CampaignDetailPage extends Component {
  static async getInitialProps(props) {
    const address = props.query.address;
    const camp = campaign(address);
    const summary = await camp.methods.getSummary().call();

    return {
      address,
      title: summary[0],
      minimumContribution: summary[1],
      manager: summary[2],
      balance: summary[3],
      contributorsCount: summary[4],
      requestsCount: summary[5]
    };
  }

  render() {
    return (
      <Layout>
        <Header as="h2">
          <Icon name="bolt" color="teal" />
          <Header.Content>
            {this.props.title}
            <Header.Subheader>
              Below are some key statistics about this campaign managed by{" "}
              {this.props.manager}.
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Divider hidden />
        <Statistic.Group horizontal>
          <Statistic
            value={web3.utils.fromWei(this.props.minimumContribution, "ether")}
            label="minimum contribution (ether)"
          />
          <Statistic
            value={web3.utils.fromWei(this.props.balance, "ether")}
            label="campaign balance (ether)"
          />
          <Statistic
            value={this.props.contributorsCount}
            label="contributors"
          />
          <Statistic value={this.props.requestsCount} label="requests" />
        </Statistic.Group>
      </Layout>
    );
  }
}

export default CampaignDetailPage;
