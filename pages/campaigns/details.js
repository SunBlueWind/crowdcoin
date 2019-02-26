import React, { Component } from "react";
import { Header, Statistic, Icon, Divider, Grid } from "semantic-ui-react";
import Layout from "../../components/Layout";
import ContributeForm from "../../components/ContributeForm";
import campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";

class CampaignDetailPage extends Component {
  state = {
    address: this.props.address,
    title: this.props.title,
    minimumContribution: this.props.minimumContribution,
    manager: this.props.manager,
    balance: this.props.balance,
    contributorsCount: this.props.contributorsCount,
    requestsCount: this.props.requestsCount
  };

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

  updateSummary = async () => {
    const camp = campaign(this.props.address);
    console.log(this.props.address, camp);
    const summary = await camp.methods.getSummary().call();
    this.setState({
      title: summary[0],
      minimumContribution: summary[1],
      manager: summary[2],
      balance: summary[3],
      contributorsCount: summary[4],
      requestsCount: summary[5]
    });
  };

  render() {
    return (
      <Layout>
        <Header as="h2">
          <Icon name="bolt" color="teal" />
          <Header.Content>
            {this.state.title}
            <Header.Subheader>
              Campaign address: {this.state.address}.
            </Header.Subheader>
            <Header.Subheader>
              Below are some key statistics about this campaign managed by{" "}
              {this.state.manager}.
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Divider hidden />
        <Grid>
          <Grid.Column width={10}>
            <Statistic.Group horizontal>
              <Statistic
                value={web3.utils.fromWei(
                  this.state.minimumContribution,
                  "ether"
                )}
                label="minimum contribution (ether)"
              />
              <Statistic
                value={web3.utils.fromWei(this.state.balance, "ether")}
                label="campaign balance (ether)"
              />
              <Statistic
                value={this.state.contributorsCount}
                label="contributors"
              />
              <Statistic value={this.state.requestsCount} label="requests" />
            </Statistic.Group>
          </Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm
              address={this.state.address}
              updateSummary={this.updateSummary}
            />
          </Grid.Column>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignDetailPage;
