import React, { Component } from "react";
import { Header, Button } from "semantic-ui-react";
import Layout from "../../../components/Layout";
import campaign from "../../../ethereum/campaign";
import { Link } from "../../../routes";

class ListRequestsPage extends Component {
  static async getInitialProps(props) {
    const address = props.query.address;
    const camp = campaign(address);
    const requestsLength = await camp.methods.getRequestsLength().call();
    const title = await camp.methods.title().call();
    const requests = await Promise.all(
      Array(parseInt(requestsLength))
        .fill()
        .map(async (_, idx) => await camp.methods.requests(idx).call())
    );
    console.log(requests);
    return { address, requests, requestsLength, title };
  }

  render() {
    return (
      <Layout>
        <Header as="h2">
          All requests for {this.props.title}
          <Header.Subheader>Address at {this.props.address}</Header.Subheader>
        </Header>
        <Link route={`/campaign/${this.props.address}/requests/new`}>
          <a>
            <Button color="teal">Create request</Button>
          </a>
        </Link>
        <p>Found {this.props.requestsLength} requests.</p>
      </Layout>
    );
  }
}

export default ListRequestsPage;
