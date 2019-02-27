import React, { Component } from "react";
import { Form, Input, Dropdown } from "semantic-ui-react";
import ErrorModal from "./ErrorModal";
import campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

class NewRequestForm extends Component {
  state = {
    description: "",
    amount: "",
    recipient: "",
    error: "",
    loading: false,
    unit: "ether"
  };

  get units() {
    return [
      { key: "wei", value: "wei", text: "wei" },
      { key: "ether", value: "ether", text: "ether" }
    ];
  }

  onSubmit = async event => {
    event.preventDefault();
    const { description, amount, unit, recipient } = this.state;
    this.setState({ loading: true, error: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      const reqAmount = web3.utils.toWei(amount, unit);
      const camp = campaign(this.props.address);
      await camp.methods.createRequest(description, reqAmount, recipient).send({
        from: accounts[0]
      });
      Router.pushRoute(`/campaign/${this.props.address}/requests`);
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
            <label>Description</label>
            <Input
              required
              placeholder="Description of your request"
              value={this.state.description}
              onChange={e => {
                this.setState({ description: e.target.value });
              }}
            />
          </Form.Field>
          <Form.Field required>
            <label>Amount</label>
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
              placeholder="Amount of your spending request"
              value={this.state.amount}
              onChange={e => {
                this.setState({ amount: e.target.value });
              }}
            />
          </Form.Field>
          <Form.Field required>
            <label>Address</label>
            <Input
              required
              placeholder="Address of the recipient"
              value={this.state.recipient}
              onChange={e => {
                this.setState({ recipient: e.target.value });
              }}
            />
          </Form.Field>
          <Form.Button color="teal" content="Create" />
        </Form>
      </React.Fragment>
    );
  }
}

export default NewRequestForm;
