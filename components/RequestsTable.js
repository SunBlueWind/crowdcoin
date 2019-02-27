import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import web3 from "../ethereum/web3";

export default props => {
  const { Header, Row, Body, HeaderCell, Cell } = Table;
  return (
    <Table color="teal">
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
        {props.requests.map((req, idx) => (
          <Row key={`${req.description}-${idx}`}>
            <Cell>{req.description}</Cell>
            <Cell>{web3.utils.fromWei(req.amount, "ether")}</Cell>
            <Cell>{req.recipient}</Cell>
            <Cell textAlign="center">
              {req.approversCount}/{props.contributorsCount}
            </Cell>
            <Cell textAlign="center">
              <Button basic color="green">
                Approve
              </Button>
            </Cell>
            <Cell textAlign="center">
              <Button basic color="teal">
                Finalize
              </Button>
            </Cell>
            <Cell textAlign="center">
              {req.completed ? (
                <Icon name="checkmark" color="teal" />
              ) : (
                <Icon name="close" color="red" />
              )}
            </Cell>
          </Row>
        ))}
      </Body>
    </Table>
  );
};
