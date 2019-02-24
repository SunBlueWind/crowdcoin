import React from "react";
import { Card } from "semantic-ui-react";

export default props => (
  <Card.Group>
    {props.campaigns.map(address => (
      <Card
        fluid
        header={address}
        description={<a>View Campaign</a>}
        key={address}
      />
    ))}
  </Card.Group>
);
