import React from 'react';
import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";

const ModalDeleteFooter = ({
                         onFormCancelDeleteButtonClick,
                         onDelete,
                         currentFormState,
                         onFormConfirmDeleteButtonClick,
                         onFormCancelCloseButtonClick,
                         onFormCloseWithoutSavingButtonClick,
                         onCloseDetails,
                         setCurrentFormState,
                         setCurrentItem,
                         setBackupItem,
                         defaultItem}) => {

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
                {/*<button onClick={() => window.location.reload(false)}>Save & Close</button>*/}
        </Modal.Footer>
    );
}

export default ModalDeleteFooter;