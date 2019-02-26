import React from "react";
import { Statistic } from "semantic-ui-react";
import web3 from "../ethereum/web3";

export default props => (
  <Statistic.Group horizontal>
    <Statistic
      value={web3.utils.fromWei(props.minimumContribution, "ether")}
      label="minimum contribution (ether)"
    />
    <Statistic
      value={web3.utils.fromWei(props.balance, "ether")}
      label="campaign balance (ether)"
    />
    <Statistic value={props.contributorsCount} label="contributors" />
    <Statistic value={props.requestsCount} label="requests" />
  </Statistic.Group>
);
