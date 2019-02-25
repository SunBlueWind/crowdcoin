import React from "react";
import { Card } from "semantic-ui-react";
import { Link } from "../routes";

export default props => (
  <Card.Group>
    {props.campaigns.map(address => (
      <Card
        fluid
        header={address}
        description={
          <Link route={`/campaign/${address}`}>
            <a>View Campaign</a>
          </Link>
        }
        key={address}
      />
    ))}
  </Card.Group>
);
