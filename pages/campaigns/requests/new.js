import React, { Component } from "react";
import { Header, Icon, Divider } from "semantic-ui-react";
import Layout from "../../../components/Layout";
import NewRequestForm from "../../../components/NewRequestForm";
import web3 from "../../../ethereum/web3";
import campaign from "../../../ethereum/campaign";
import { Link } from "../../../routes";

class NewRequestPage extends Component {
  static async getInitialProps(props) {
    const address = props.query.address;
    const camp = campaign(address);
    const title = await camp.methods.title().call();
    const balance = await web3.eth.getBalance(address);
    return { address, balance, title };
  }

  render() {
    return (
      <Layout>
        <Header as="h2">
          <Icon name="idea" color="teal" />
          <Header.Content>
            Create a request for {this.props.title}
            <Header.Subheader>
              Address at{" "}
              <Link route={`/campaign/${this.props.address}`}>
                <a>{this.props.address}</a>
              </Link>
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

export default NewRequestPage;
