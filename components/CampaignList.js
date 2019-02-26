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
          <React.Fragment>
            <div>
              <Link route={`/campaign/${address}`}>
                <a>View Campaign</a>
              </Link>
            </div>
            <div>
              <Link route={`/campaign/${address}/requests`}>
                <a>View Requests</a>
              </Link>
            </div>
          </React.Fragment>
        }
        key={address}
        color="teal"
      />
    ))}
  </Card.Group>
);
