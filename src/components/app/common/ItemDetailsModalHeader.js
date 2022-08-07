import React from 'react';
import {Modal} from "react-bootstrap";

const ItemDetailsModalHeader = ({ title }) => {
  return (
    <>
      <Modal.Header className="form-header" closeButton closeVariant="white">
        <Modal.Title>{ title }</Modal.Title>
      </Modal.Header>
    </>
  );
};

export default ItemDetailsModalHeader;
