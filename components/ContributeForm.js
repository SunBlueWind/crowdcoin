import React, { Component } from "react";
import { Form, Input } from "semantic-ui-react";
import ErrorModal from "./ErrorModal";
import campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";

class ContributeForm extends Component {
  state = {
    value: "",
    error: "",
    loading: false
  };

  onSubmit = async () => {
    event.preventDefault();
    const { value } = this.state;
    this.setState({ loading: true, error: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      const amount = web3.utils.toWei(value, "ether");
      const camp = campaign(this.props.address);
      await camp.methods.contribute().send({
        from: accounts[0],
        value: amount
      });
      await this.props.updateSummary();
      this.setState({ value: "" });
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
            <label>Amount</label>
            <Input
              required
              type="number"
              label="ether"
              labelPosition="right"
              placeholder="Amount of ether to contribute"
              value={this.state.value}
              onChange={e => {
                this.setState({ value: e.target.value });
              }}
            />
          </Form.Field>
          <Form.Button color="teal" content="Contribute" />
        </Form>
      </React.Fragment>
    );
  }
}

export default ContributeForm;
