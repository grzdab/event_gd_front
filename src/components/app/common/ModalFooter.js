import React, {Component} from 'react';
import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";

import {
  onFormCancelCloseButtonClick,
  onFormCancelDeleteButtonClick,
  onFormConfirmDeleteButtonClick,
  onFormCloseWithoutSavingButtonClick,
} from "../../../helpers/ComponentHelper";

const ModalFooter = ({ onDelete, onCloseDetails, onSubmit, state }) => {

  const setCurrentItem = state.setCurrentItem;
  const currentFormState = state.currentFormState;
  const setCurrentFormState = state.setCurrentFormState;
  const setBackupItem = state.setBackupItem;
  const defaultItem = state.defaultItem;

  return (
    <Modal.Footer>
      <div className="form-confirm-delete div-hidden" id="confirm-delete">
        Confirm delete? (This operation cannot be undone)
        <Button variant="secondary" onClick={() => onFormCancelDeleteButtonClick()}>
          No
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Confirm
        </Button>
      </div>
      {!currentFormState.formAddingDataMode &&
        <Button variant="danger" id="btn-delete" onClick={() => onFormConfirmDeleteButtonClick()}>
          Delete
        </Button>
      }
      <div className="form-confirm-close" id="confirm-close">
        Close without saving?
        <Button variant="secondary" onClick={() => onFormCancelCloseButtonClick()}>
          No
        </Button>
        <Button variant="warning" onClick={() => onFormCloseWithoutSavingButtonClick(currentFormState, setCurrentFormState, setCurrentItem, setBackupItem, defaultItem)}>
          Close
        </Button>
      </div>
      <Button variant="secondary" id="btn-close" onClick={onCloseDetails}>
        Close
      </Button>
      <Button variant="primary" onClick={onSubmit} disabled={currentFormState.formSaveButtonDisabled}>
        Save & Close
      </Button>
    </Modal.Footer>
  );
}

export default ModalFooter;