import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Modal} from "react-bootstrap";
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import {clearCurrentItem, deleteItem} from "../helpers/ComponentHelper";
import {Fab} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


let clickedId = 0;


function saveId(id) {
    console.log("id");
    console.log(id);
    clickedId = id;
}
const ButtonDelete = ({e}) => {

    const defaultItem = {
        "id": "",
        "propertyName": ""
    }

    const defaultAddModalDetails = {
        "showForm": false,
        "showDeleteWarning": true,
        "showItemChangedWarning": false,
        "formDataChangedWarning": "Data has been changed",
        "formAddingDataMode": false,
        "formSaveButtonDisabled": false
    }
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemsList, setItems] = useState([]);
   const [currentItem, setCurrentItem] = useState(defaultItem);
      const [showAddModalDetails, setShowAddModalDetails] = useState(defaultAddModalDetails);
    const [backupItem, setBackupItem] = useState(defaultItem);


    const onDelete = (e) => {
        e.preventDefault()
        deleteItem(currentItem.id, `http://localhost:8081/admin/language/${clickedId}`, setItems, itemsList)
            .then(() => {
                onCloseDeleteWarningDialog();
            });
    }
    const onCloseDeleteWarningDialog = () => {
        clearCurrentItem(setCurrentItem, setBackupItem, defaultItem);
        setShowAddModalDetails({...showAddModalDetails, showDeleteWarning: false, showForm: false});
    };

        return (
            <div>
            {/*<Button variant="danger" id="delete-image"*/}
            {/*        onClick={() => {*/}
            {/*            setShowDeleteModal(true);*/}
            {/*            saveId(e.id);*/}
            {/*        }}>*/}
            {/*    <FontAwesomeIcon icon={faTrashAlt}/>*/}
            {/*</Button>*/}
                <Fab
                    variant='extended'
                    size='small'
                    color='warning'
                    aria-label="delete">
                    <DeleteForeverIcon
                        onClick={() => {
                            saveId(e.id);
                            setShowDeleteModal(true);
                        }}
                    />
                </Fab>
                <div>
                    {/*  ============== WARNING MODAL: BEGIN ============== */}
                    <Modal
                        show={showDeleteModal}
                        shouldCloseOnOverlayClick={false}
                        onHide={onCloseDeleteWarningDialog}
                        currentFormState={showAddModalDetails}
                        onCloseDeleteWarningDialog={onCloseDeleteWarningDialog}
                        // backdrop="static"
                        // keyboard={false}
                    >
                        <Modal.Header className="form-header-warning" closeButton closeVariant="white">
                            <Modal.Title>Warning</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {showAddModalDetails.warningDescription}
                        </Modal.Body>
                        <Modal.Footer>
                            <div className="row" style={{width: "100%"}}>
                                <div className="col-md-6">
                                    <div>
                 <span className="warning-icon" id="warning-icon"><FontAwesomeIcon
                     icon={faExclamationTriangle}/></span>
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
                    {/*  ============== WARNING MODAL: END ============== */}
                </div>
            </div>

        )
    };

export default ButtonDelete;