import React, {useState} from "react";
import {Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons/faExclamationCircle";
import Button from "react-bootstrap/Button";
import {
    addItem,
    clearCurrentItem, onAddDataClick,
    onFormCancelCloseButtonClick,
    onFormCancelDeleteButtonClick, onFormCloseWithoutSavingButtonClick,
    onFormConfirmDeleteButtonClick, onSaveAndClose,
    restoreFormData, updateItem
} from "../helpers/ComponentHelper";
import {compareObjects, resetInvalidInputField} from "../../js/CommonHelper";
import ModalFooter from "../layout/ModalFooter";


const ButtonAddSimple = ({
                       useStateModalDescription,
                       useStateModalHeader,
                       backupItem,
                       currentItem,
                       url,
                       clickedId,
                       itemsList,
                       defaultItem,
                       setCurrentItem,
                       setBackupItem,
                       setItems,

                      }) => {

    const defaultAddModalDetails = {
        "showForm": false,
        "showDeleteWarning": false,
        "showItemChangedWarning": false,
        "formDataChangedWarning": "Data has been changed",
        "formAddingDataMode": false,
        "formSaveButtonDisabled": false
    }

    const [modalHeader, setModalHeader] = useState(useStateModalDescription);
    const [modalDescription, setModalDescription] = useState(useStateModalHeader);
    const [showAddModalDetails, setShowAddModalDetails] = useState(defaultAddModalDetails);

    const onSubmit = (e) => {
        e.preventDefault()

        const checkItem = {
            id: currentItem.id,
            propertyName: currentItem.propertyName
        };

        if (!currentItem.propertyName || currentItem.id === 0) {
            if (!currentItem.propertyName) {
                let nameInput = document.getElementById("name");
                nameInput.classList.add("form-input-invalid");
                nameInput.placeholder = "Name cannot be empty"
            }

            if (currentItem.id === 0) {
                let categoryOption = document.getElementById("equipmentCategoryId");
                categoryOption.classList.add("form-input-invalid");
            }
            return;
        }

        if (showAddModalDetails.formAddingDataMode) {
            const item = {

                propertyName: currentItem.propertyName
            };
            addItem(item, url, setItems, itemsList)
                .then(() => onSaveAndClose(setShowAddModalDetails, showAddModalDetails, setCurrentItem, setBackupItem, defaultItem));
        } else {
            const item = {
                id: currentItem.id,
                propertyName: currentItem.propertyName
            };
            updateItem(item, currentItem, url + `${clickedId}`, setItems, itemsList)
                .then(() => onSaveAndClose(setShowAddModalDetails, showAddModalDetails, setCurrentItem, setBackupItem, defaultItem));
            ;
        }
    }

    const onCloseDetails = () => {
        if (compareObjects(backupItem, currentItem)) {
            setShowAddModalDetails({
                ...showAddModalDetails,
                showForm: false,
                formSaveButtonDisabled: true,
                formAddingDataMode: false
            })
        }
    };

    return (
    <div>
        <Button className="RAM_button" id="addData"
                onClick={() => {
                    setModalDescription(modalDescription);
                    setModalHeader(modalHeader);
                    // setShowAddModalDetails(true);
                    clearCurrentItem(setCurrentItem,
                        setBackupItem, defaultItem);
                    onAddDataClick(showAddModalDetails,
                        setShowAddModalDetails,
                        '', '');
                }}>
            Add new language</Button>
        <div>
            {/*  ============== EQUIPMENT ADD DETAILS MODAL: BEGIN ============== */}
            <Modal show={showAddModalDetails.showForm}
                   shouldCloseOnOverlayClick={false}
                   size="xl"
                   backdrop="static"
                   keyboard={false}
                   onHide={onCloseDetails}>
                <Modal.Header className="form-header" closeButton closeVariant="white">
                    <Modal.Title>Language details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <section className="mb-4">
                        <h2 className="h1-responsive font-weight-bold text-center my-2">{modalHeader}</h2>
                        <p className="text-center w-responsive mx-auto mb-5 form_test">{modalDescription}</p>
                        <div>
                            <p className="text-center w-responsive mx-auto mb-5 data_changed" id="data-changed">
                                <FontAwesomeIcon
                                    icon={faExclamationCircle}/>&nbsp;{showAddModalDetails.formDataChangedWarning}
                            </p>
                            <Button variant="secondary" id="btn-restore" className="btn-restore" onClick={() => {
                                restoreFormData(backupItem, setCurrentItem, showAddModalDetails, setShowAddModalDetails)
                            }}>
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
                                                        defaultValue={currentItem.propertyName}
                                                        className="form-control"
                                                        required
                                                        onChange={(e) => {
                                                            setCurrentItem({
                                                                ...currentItem,
                                                                propertyName: e.target.value
                                                            });
                                                            setShowAddModalDetails({
                                                                ...showAddModalDetails,
                                                                formSaveButtonDisable: false
                                                            });
                                                        }}
                                                        onClick={() => {
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
                    currentFormState={showAddModalDetails}
                    onFormConfirmDeleteButtonClick={onFormConfirmDeleteButtonClick}
                    onFormCancelCloseButtonClick={onFormCancelCloseButtonClick}
                    onFormCloseWithoutSavingButtonClick={onFormCloseWithoutSavingButtonClick}
                    onCloseDetails={onCloseDetails}
                    onSubmit={onSubmit}
                    setCurrentFormState={setShowAddModalDetails}
                    setCurrentItem={setCurrentItem}
                    setBackupItem={setBackupItem}
                    defaultItem={defaultItem}
                />
            </Modal>
            {/*  ============== EQUIPMENT ADD DETAILS MODAL: END ============== */}
        </div>
    </div>
    );
}
export default ButtonAddSimple;