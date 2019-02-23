import React from "react";
import { Menu, Icon } from "semantic-ui-react";

export default () => (
  <Menu inverted size="huge" color="teal">
    <Menu.Item name="logo">CrowdCoin</Menu.Item>
    <Menu.Menu position="right">
      <Menu.Item name="campaigns" onClick={() => {}}>
        Campaigns
      </Menu.Item>
      <Menu.Item name="plus" onClick={() => {}}>
        <Icon name="plus" />
      </Menu.Item>
    </Menu.Menu>
  </Menu>
);
