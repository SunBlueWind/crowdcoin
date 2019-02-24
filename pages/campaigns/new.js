import React, { Component } from "react";
import { Header, Icon, Divider } from "semantic-ui-react";
import Layout from "../../components/Layout";
import NewCampaignForm from "../../components/NewCampaignForm";

class NewCampaignPage extends Component {
  render() {
    return (
      <Layout>
        <Header as="h2">
          <Icon name="idea" />
          <Header.Content>
            Create a campaign
            <Header.Subheader>
              Create a campaign for others to contribute!
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Divider hidden />
        <NewCampaignForm />
      </Layout>
    );
  }
}

export default NewCampaignPage;
