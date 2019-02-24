import React, { Component } from "react";
import { Form, Input, Dropdown } from "semantic-ui-react";
import ErrorModal from "./ErrorModal";
import factory from "../ethereum/factory";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

class NewCampaignForm extends Component {
  state = {
    value: "",
    error: "",
    loading: false,
    unit: "wei"
  };

  get units() {
    return [
      { key: "wei", value: "wei", text: "wei" },
      { key: "ether", value: "ether", text: "ether" }
    ];
  }

  onSubmit = async event => {
    event.preventDefault();
    const { value, unit } = this.state;
    this.setState({ loading: true, error: "", value: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      const amount = web3.utils.toWei(value, unit);
      await factory.methods.createCampaign(amount).send({ from: accounts[0] });
      Router.pushRoute("/");
    } catch (err) {
      this.setState({ error: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
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

        <Form loading={this.state.loading} onSubmit={this.onSubmit}>
          <Form.Field required>
            <label>Minimum contribution</label>
            <Input
              required
              type="number"
              label={
                <Dropdown
                  value={this.state.unit}
                  options={this.units}
                  onChange={(_, data) => {
                    this.setState({ unit: data.value });
                  }}
                />
              }
              labelPosition="right"
              placeholder="Minimum contribution in wei to be qualified as a contributor"
              value={this.state.value}
              onChange={e => {
                this.setState({ value: e.target.value });
              }}
            />
          </Form.Field>
          <Form.Button color="teal" content="Create" />
        </Form>
      </React.Fragment>
    );
  }
}

export default NewCampaignForm;
