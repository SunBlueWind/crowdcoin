import React, { Component } from "react";
import { Header, Icon, Divider, Grid, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import ContributeForm from "../../components/ContributeForm";
import CampaignStats from "../../components/CampaignStats";
import campaign from "../../ethereum/campaign";
import { Link } from "../../routes";

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
            <CampaignStats
              minimumContribution={this.state.minimumContribution}
              balance={this.state.balance}
              contributorsCount={this.state.contributorsCount}
              requestsCount={this.state.requestsCount}
            />
            <Link route={`/campaign/${this.state.address}/requests`}>
              <a>
                <Button color="teal">View requests</Button>
              </a>
            </Link>
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
