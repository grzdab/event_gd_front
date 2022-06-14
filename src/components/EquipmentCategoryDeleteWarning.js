import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React from "react";

const EquipmentCategoryDeleteWarning = () => {

return (
    <>
        <Modal
            show="true"
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header className="form-header-warning" closeButton closeVariant="white">
                <Modal.Title>Warning</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this category? This operation cannot be undone!
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => alert('dddd')}>
                    Cancel
                </Button>
                <Button variant="danger">Delete</Button>
            </Modal.Footer>
        </Modal>
    </>
    )
}

export default EquipmentCategoryDeleteWarning;