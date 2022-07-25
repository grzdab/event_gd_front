import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons/faExclamationCircle";
import Button from "react-bootstrap/Button";
import {
    clearCurrentItem,
    deleteItem,
    onFormCancelCloseButtonClick,
    onFormCancelDeleteButtonClick, onFormCloseWithoutSavingButtonClick,
    onFormConfirmDeleteButtonClick,
    restoreFormData
} from "../helpers/ComponentHelper";
import {compareObjects, resetInvalidInputField} from "../../js/CommonHelper";
import ModalFooter from "../layout/ModalFooter";

let clickedId = 0;

function saveId(id) {
    console.log("id");
    console.log(id);
    clickedId = id;
}

const ModalEdit =() => {
    console.log("modalEdit");

    const defaultItem = {
        "id": "",
        "propertyName": ""
    }
    const defaultAddModalDetails = {
        "showForm": false,
        "showDeleteWarning": false,
        "showItemChangedWarning": false,
        "formDataChangedWarning": "Data has been changed",
        "formAddingDataMode": false,
        "formSaveButtonDisabled": false
    }

    const defaultEditModalDetails = {
        "showForm": false,
        "showDeleteWarning": false,
        "showItemChangedWarning": false,
        "formDataChangedWarning": "Data has been changed",
        "formAddingDataMode": false,
        "formSaveButtonDisabled": false
    }
    const [showEditModalDetails, setShowEditModalDetails] = useState(defaultEditModalDetails);
    const [backupItem, setBackupItem] = useState(defaultItem);
    const [currentItem, setCurrentItem] = useState(defaultItem);
    const [showAddModalDetails, setShowAddModalDetails] = useState(defaultAddModalDetails);
    const [modalHeader, setModalHeader] = useState('Edit equipment');
    const [modalDescription, setModalDescription] = useState('');
    const [languageName, setLanguageName] = useState('');
    const [itemsList, setItems] = useState([]);

    const onCloseEditDetails = () => {
        if (compareObjects(backupItem, currentItem)) {
            setShowEditModalDetails({
                ...showAddModalDetails,
                showForm: false,
                formSaveButtonDisabled: true,
                formAddingDataMode: false
            })
        } else {
            let closeWithoutSaving = document.getElementById("confirm-close");
            let btnClose = document.getElementById("btn-close");
            closeWithoutSaving.classList.add("div-visible");
            btnClose.classList.add("btn-invisible");
        }
    };
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
    const onSubmit = (e) => {
        e.preventDefault()
    }

        return (

<Modal show={showEditModalDetails.showForm}
       shouldCloseOnOverlayClick={false}
       size="xl"
       backdrop="static"
       keyboard={false}
       onHide={onCloseEditDetails}>
    <Modal.Header className="form-header" closeButton closeVariant="white">
        <Modal.Title>Language details</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <section className="mb-4">
            <h2 className="h1-responsive font-weight-bold text-center my-2">{ modalHeader }</h2>
            <p className="text-center w-responsive mx-auto mb-5 form_test">{ modalDescription }</p>
            <div>
                <p className="text-center w-responsive mx-auto mb-5 data_changed" id="data-changed"><FontAwesomeIcon icon={faExclamationCircle}/>&nbsp;{ showAddModalDetails.formDataChangedWarning }</p>
                <Button variant="secondary" id="btn-restore" className="btn-restore" onClick={() => {
                    restoreFormData(backupItem, setCurrentItem, showAddModalDetails, setShowAddModalDetails)}}>
                    Restore
                </Button>
            </div>
            <div className="row">
                <div className="col-md-12 mb-md-0 mb-5">
                    <form id="add-equipment-form" name="add-equipment-form" action="" method="POST">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="row">
                                    <div className="md-form mb-0">
                                        <label htmlFor="name" className="">Language <span
                                            className="required">*</span></label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            defaultValue={ languageName }
                                            className="form-control"
                                            required
                                            onChange={(e)=>{
                                                setCurrentItem({
                                                    ...currentItem,
                                                    propertyName: e.target.value});
                                                setShowEditModalDetails({...showEditModalDetails, formSaveButtonDisable: false});
                                            }}
                                            onClick={()=>{
                                                resetInvalidInputField("name");
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </Modal.Body>
    <ModalFooter
        onFormCancelDeleteButtonClick={onFormCancelDeleteButtonClick}
        onDelete={onDelete}
        currentFormState={showEditModalDetails}
        onFormConfirmDeleteButtonClick={onFormConfirmDeleteButtonClick}
        onFormCancelCloseButtonClick={onFormCancelCloseButtonClick}
        onFormCloseWithoutSavingButtonClick={onFormCloseWithoutSavingButtonClick}
        onCloseDetails={onCloseEditDetails}
        onSubmit={onSubmit}
        setCurrentFormState = {setShowEditModalDetails}
        setCurrentItem = {setCurrentItem}
        setBackupItem = {setBackupItem}
        defaultItem = {defaultItem}
    />
</Modal>

)};

export default ModalEdit;
