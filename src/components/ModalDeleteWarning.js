import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React from "react";


const ModalDeleteWarning = ({currentFormState, onCloseDeleteWarningDialog, onDelete, deleteItemName}) => {

    return (
        <Modal
            show={currentFormState.showDeleteWarning}
            onHide={onCloseDeleteWarningDialog}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header className="form-header-warning" closeButton closeVariant="white">
                <Modal.Title>Warning</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this {deleteItemName}? This operation cannot be undone!
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCloseDeleteWarningDialog}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={onDelete}>Delete</Button>
            </Modal.Footer>
        </Modal>
    )


}

export default ModalDeleteWarning;