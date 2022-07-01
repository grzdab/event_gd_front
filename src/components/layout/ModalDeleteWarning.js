import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React, {useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";

const ModalDeleteWarning = ({currentFormState, onCloseDeleteWarningDialog, onDelete, deleteItemName}) => {


    useEffect(()=> {

        if (currentFormState.warningDeleteButtonDisabled & currentFormState.warningWarningIconVisible) {
            const btnDelete = document.getElementById("delete-button");
            const warningIcon = document.getElementById("warning-icon");

            if (btnDelete && warningIcon) {
                btnDelete.setAttribute('disabled', '');
                warningIcon.classList.add("div-visible");
            }
        }

    }, [currentFormState])


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
                {currentFormState.warningDescription}
            </Modal.Body>
            <Modal.Footer>
                <div className="row" style={{width: "100%"}}>
                    <div className="col-md-6">
                <div>
                    <span className="warning-icon" id="warning-icon"><FontAwesomeIcon icon={faExclamationTriangle}/></span>
                </div>
                    </div>
                        <div className="col-md-6" style={{textAlign: "right"}}>
                <Button variant="secondary mrx1" onClick={onCloseDeleteWarningDialog}>
                    Cancel
                </Button>
                <Button variant="danger" id="delete-button" onClick={onDelete}>Delete</Button>

                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    )


}

export default ModalDeleteWarning;