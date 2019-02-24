import React from "react";
import { Modal, Transition } from "semantic-ui-react";

export default props => (
  <Transition visible={props.show} animation="fade down">
    <Modal
      header={props.header}
      content={props.content}
      centered={false}
      open={props.show}
      onClose={props.onClose}
    />
  </Transition>
);
