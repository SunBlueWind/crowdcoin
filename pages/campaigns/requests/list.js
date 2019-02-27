import React, { Component } from "react";
import { Header, Button, Divider } from "semantic-ui-react";
import Layout from "../../../components/Layout";
import RequestsTable from "../../../components/RequestsTable";
import campaign from "../../../ethereum/campaign";
import { Link } from "../../../routes";

class ListRequestsPage extends Component {
  static async getInitialProps(props) {
    const address = props.query.address;
    const camp = campaign(address);
    const requestsLength = await camp.methods.getRequestsLength().call();
    const contributorsCount = await camp.methods.contributorsCount().call();
    const title = await camp.methods.title().call();
    const requests = await Promise.all(
      Array(parseInt(requestsLength))
        .fill()
        .map(async (_, idx) => await camp.methods.requests(idx).call())
    );
    return { address, requests, requestsLength, title, contributorsCount };
  }

  render() {
    return (
      <Layout>
        <Header as="h2">
          All requests for {this.props.title}
          <Header.Subheader>
            Address at{" "}
            <Link route={`/campaign/${this.props.address}`}>
              <a>{this.props.address}</a>
            </Link>
          </Header.Subheader>
        </Header>
        <Divider hidden />
        <Link route={`/campaign/${this.props.address}/requests/new`}>
          <a>
            <Button color="teal">Create request</Button>
          </a>
        </Link>
        <RequestsTable
          requests={this.props.requests}
          contributorsCount={this.props.contributorsCount}
          address={this.props.address}
        />
        <p>Found {this.props.requestsLength} requests.</p>
      </Layout>
    );
  }
}

export default ListRequestsPage;
