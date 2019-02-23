import React, { Component } from "react";
import factory from "../ethereum/factory";

class Home extends Component {
  async componentDidMount() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    console.log(campaigns);
  }

  render() {
    return <p>Index page</p>;
  }
}

export default Home;
