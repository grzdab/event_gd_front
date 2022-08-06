import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import {
    clearCurrentItem,
    deleteItem,
    onFormCancelCloseButtonClick,
    onFormCancelDeleteButtonClick, onFormCloseWithoutSavingButtonClick, onFormConfirmDeleteButtonClick
} from "../../../helpers/ComponentHelper";
import {Fab} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModalDeleteFooter from "./modal/ModalDeleteFooter";


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
    const defaultDeleteModalDetails = {
        "showForm": false,
        "showDeleteWarning": true,
        "showItemChangedWarning": false,
        "formDataChangedWarning": "Data has been deleted",
        "formAddingDataMode": false,
        "formSaveButtonDisabled": false
    }
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemsList, setItems] = useState([]);
   const [currentItem, setCurrentItem] = useState(defaultItem);
      const [showDeleteModalDetails, setShowDeleteModalDetails] = useState(defaultDeleteModalDetails);
    const [backupItem, setBackupItem] = useState(defaultItem);
    const [modalDescription, setModalDescription] = useState('');
    const [languageName, setLanguageName] = useState('');


    const onDelete = (e) => {
        e.preventDefault()
        deleteItem(currentItem.id, `http://localhost:8081/admin/language/${clickedId}`, setItems, itemsList)
            .then(() => {
                onCloseDeleteWarningDialog();
            })
            .then(() => {window.location.reload(false)});
    }
    const onCloseDeleteWarningDialog = () => {
        clearCurrentItem(setCurrentItem, setBackupItem, defaultItem);
        setShowDeleteModalDetails(
            {
                ...showDeleteModalDetails,
                showDeleteWarning: false,
                showForm: false
            });
        window.location.reload(false);
    };

        return (
            <div>
                <Fab
                    variant='extended'
                    size='small'
                    color='warning'
                    aria-label="delete">
                    <DeleteForeverIcon
                        onClick={() => {
                            setModalDescription(`Are you sure to delete ${e.propertyName}?`)
                            saveId(e.id);
                            setShowDeleteModal(true);
                            setLanguageName(e.propertyName);
                        }}
                    />
                </Fab>
                <div>
                    {/*  ============== WARNING MODAL: BEGIN ============== */}
                   <Modal
                        show={showDeleteModal}
                        shouldCloseOnOverlayClick={false}
                        onHide={onCloseDeleteWarningDialog}
                        currentFormState={showDeleteModalDetails}
                        onCloseDeleteWarningDialog={onCloseDeleteWarningDialog}
                    >
                        <Modal.Header className="form-header-warning">
                            <Modal.Title>Warning</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {showDeleteModalDetails.warningDescription}
                            { modalDescription }
                        </Modal.Body>
                        <ModalDeleteFooter
                            onFormCancelDeleteButtonClick={onFormCancelDeleteButtonClick}
                            onDelete={onDelete}
                            currentFormState={showDeleteModalDetails}
                            onFormConfirmDeleteButtonClick={onFormConfirmDeleteButtonClick}
                            onFormCancelCloseButtonClick={onFormCancelCloseButtonClick}
                            onFormCloseWithoutSavingButtonClick={onFormCloseWithoutSavingButtonClick}
                            onCloseDetails={onCloseDeleteWarningDialog}
                            setCurrentFormState = {setShowDeleteModalDetails}
                            setCurrentItem = {setCurrentItem}
                            setBackupItem = {setBackupItem}
                            defaultItem = {defaultItem}
                        >

                        </ModalDeleteFooter>
                    </Modal>
                    {/*  ============== WARNING MODAL: END ============== */}
                </div>
            </div>

        )
    };

export default ButtonDelete;