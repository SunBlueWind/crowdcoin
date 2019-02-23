import React from "react";
import { Card } from "semantic-ui-react";

export default props => (
  <Card.Group>
    {props.campaigns.map(address => (
      <Card fluid header={address} description="View Campaign" />
    ))}
  </Card.Group>
);
