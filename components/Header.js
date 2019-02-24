import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link } from "../routes";

export default () => (
  <Menu inverted size="huge" color="teal">
    <Link route="/">
      <a className="item">CrowdCoin</a>
    </Link>
    <Menu.Menu position="right">
      <Link route="/">
        <a className="item">Campaigns</a>
      </Link>
      <Link route="/campaigns/new">
        <a className="item">
          <Icon name="plus" />
        </a>
      </Link>
    </Menu.Menu>
  </Menu>
);
