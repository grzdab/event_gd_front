import {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React from "react";

const AddEquipment = ({show}) => {

    const [showDetails, setShowDetails] = useState(false);
    const handleCloseDetails = (id) => {
        setShowDetails(false)
    };
    const handleShowDetails = () => setShowDetails(true);

    return (
        <>
            <Modal show={show}
                   size="xl"
                   backdrop="static"
                   keyboard={false}
                   onHide={handleCloseDetails}>
                <Modal.Header className="form-header" closeButton closeVariant="white">
                    <Modal.Title>Equipment details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <section className="mb-4">
                        <h2 className="h1-responsive font-weight-bold text-center my-2">Add new equipment</h2>
                        <p className="text-center w-responsive mx-auto mb-5 form_test">Here you can add new equipment.
                            Name and equipment category are required for the application to properly use the equipment.
                            You can add remaining properties at any time.
                        </p>
                    </section>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDetails}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseDetails}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

 }



export default AddEquipment;