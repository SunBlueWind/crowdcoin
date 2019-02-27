import React, { Component } from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import ErrorModal from "./ErrorModal";
import campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

class RequestTableRow extends Component {
  state = {
    approveLoading: false,
    finalizeLoading: false,
    campaign: campaign(this.props.address),
    error: ""
  };

  onClickApprove = async index => {
    this.setState({ approveLoading: true, error: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      await this.state.campaign.methods.approveRequest(index).send({
        from: accounts[0]
      });
      Router.replaceRoute(window.location.pathname);
    } catch (err) {
      this.setState({ error: err.message });
    }
    this.setState({ approveLoading: false });
  };

  onClickFinalize = async index => {
    this.setState({ finalizeLoading: true });
    try {
      const accounts = await web3.eth.getAccounts();
      await this.state.campaign.methods.finalizeRequest(index).send({
        from: accounts[0]
      });
      Router.replaceRoute(window.location.pathname);
    } catch (err) {
      this.setState({ error: err.message });
    }
    this.setState({ finalizeLoading: false });
  };

  render() {
    const { request, index, contributorsCount } = this.props;
    const { Row, Cell } = Table;
    const readyToFinalize = request.approversCount > contributorsCount / 2;
    return (
      <React.Fragment>
        <ErrorModal
          show={!!this.state.error}
          header="Opps!"
          content={this.state.error}
          onClose={() => {
            this.setState({ error: "" });
          }}
        />
        <Row
          key={`${request.description}-${index}`}
          positive={!request.completed && readyToFinalize}
          disabled={request.completed}
        >
          <Cell>{request.description}</Cell>
          <Cell>{web3.utils.fromWei(request.amount, "ether")}</Cell>
          <Cell>{request.recipient}</Cell>
          <Cell textAlign="center">
            {request.approversCount}/{contributorsCount}
          </Cell>
          <Cell textAlign="center">
            <Button
              basic
              color="green"
              loading={this.state.approveLoading}
              disabled={request.completed}
              onClick={() => this.onClickApprove(index)}
            >
              Approve
            </Button>
          </Cell>
          <Cell textAlign="center">
            <Button
              basic
              color="teal"
              loading={this.state.finalizeLoading}
              disabled={request.completed}
              onClick={() => this.onClickFinalize(index)}
            >
              Finalize
            </Button>
          </Cell>
          <Cell textAlign="center">
            {request.completed ? (
              <Icon name="checkmark" color="teal" />
            ) : (
              <Icon name="close" color="red" />
            )}
          </Cell>
        </Row>
      </React.Fragment>
    );
  }
}

class RequestsTable extends Component {
  render() {
    const { Header, Body, HeaderCell } = Table;
    return (
      <Table color="teal" striped selectable>
        <Header>
          <HeaderCell>Description</HeaderCell>
          <HeaderCell>Amount (ether)</HeaderCell>
          <HeaderCell>Recipient</HeaderCell>
          <HeaderCell textAlign="center">Approvers</HeaderCell>
          <HeaderCell textAlign="center">Approve</HeaderCell>
          <HeaderCell textAlign="center">Finalize</HeaderCell>
          <HeaderCell textAlign="center">Completed</HeaderCell>
        </Header>
        <Body>
          {this.props.requests.map((req, idx) => (
            <RequestTableRow
              request={req}
              index={idx}
              address={this.props.address}
              contributorsCount={this.props.contributorsCount}
            />
          ))}
        </Body>
      </Table>
    );
  }
}

export default RequestsTable;
