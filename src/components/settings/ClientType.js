import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons/faEye";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons/faExclamationCircle";
import {compareObjects, resetInvalidInputField} from "../../js/CommonHelper";
import {Table} from "react-bootstrap";
import ModalDeleteWarning from "../layout/modal/ModalDeleteWarning";
import ModalFooter from "../layout/modal/ModalFooter";
import {addItem, updateItem, deleteItem, getItems, getRelatedItemsByParentId} from "../helpers/ComponentHelper";
import {clearCurrentItem} from "../helpers/ComponentHelper";
import {
    onAddDataClick,
    onSaveAndClose,
    onFormCancelCloseButtonClick,
    onFormCancelDeleteButtonClick,
    onFormConfirmDeleteButtonClick,
    onItemsListInfoButtonClick,
    compareData,
    onFormCloseWithoutSavingButtonClick,
    restoreFormData,
    onItemsListDeleteButtonClick} from "../helpers/ComponentHelper";


const ClientType = () => {

    const defaultItem = {
        "id": "",
        "name": "",
        "description": ""
    }

    const defaultFormState = {
        "showForm": false,
        "showDeleteWarning": false,
        "showItemChangedWarning": false,
        "formHeader": "Edit client type",
        "formDescription": "",
        "formDataChangedWarning": "Data has been changed",
        "formAddingDataMode": false,
        "formSaveButtonDisabled": false,
        "warningDescription":"",
        "warningDeleteButtonDisabled": false,
        "warningWarningIconVisible":false
    }

    const [loading, setLoading] = useState(true);
    const [allowDelete, setAllowDelete] = useState(null);
    const [currentFormState, setCurrentFormState] = useState(defaultFormState);
    const [itemsList, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState(defaultItem);
    const [backupItem, setBackupItem] = useState(defaultItem);
    const [itemChanged, setItemChanged] = useState(false);
    // elements related to the item
    const [clientsList, setClientsList] = useState([]);

    const onSubmit = (e) => {
        e.preventDefault() // prevents from submitting to the page which is default behavior
        if(!currentItem.name) {
            let nameInput = document.getElementById("name");
            nameInput.classList.add("form-input-invalid");
            nameInput.placeholder = "Client type name cannot be empty"
            return;
        }
        if (currentFormState.formAddingDataMode) {
            const item = {name: currentItem.name, description: currentItem.description};
            addItem(item, 'http://localhost:5111/client-type', setItems, itemsList)
                .then(() => onSaveAndClose(setCurrentFormState, currentFormState, setCurrentItem, setBackupItem, defaultItem));
        } else {
            const item = {id: currentItem.id, name: currentItem.name, description: currentItem.description};
            updateItem(item, currentItem, `http://localhost:5111/client-type/${item.id}`, setItems, itemsList)
                .then(() => onSaveAndClose(setCurrentFormState, currentFormState, setCurrentItem, setBackupItem, defaultItem));
        }
    }

    useEffect(() => {
        if (allowDelete !== null) {
            onItemsListDeleteButtonClick(currentFormState, setCurrentFormState, "client type", allowDelete);
        }
    }, [allowDelete])


    const checkRelatedItems = (id) => {
        getRelatedItemsByParentId(`http://localhost:5111/client?clientType=${id}`, setClientsList)
            .then((data) => {
                if (data.length === 0) {
                    setAllowDelete(true);
                } else {
                    setAllowDelete(false);
                }
            });

    }

    const onDelete = (e) => {
        e.preventDefault()
        deleteItem(currentItem.id, `http://localhost:5111/client-type/${currentItem.id}`, setItems, itemsList)
            .then(() => {
                onCloseDeleteWarningDialog();
            });
    }

    const onCloseDeleteWarningDialog = () => {
        clearCurrentItem(setCurrentItem, setBackupItem, defaultItem);
        setAllowDelete(null);
        setCurrentFormState({...currentFormState,
            showDeleteWarning: false,
            showForm: false,
            warningDescription: "",
            warningDeleteButtonDisabled: false,
            warningWarningIconVisible: false});
    };

    const onCloseDetails = () => {
        if (compareObjects(backupItem, currentItem)) {
            setCurrentFormState({
                ...currentFormState,
                showForm: false,
                formSaveButtonDisabled: true,
                formAddingDataMode: false
            })
            clearCurrentItem(setCurrentItem, setBackupItem, defaultItem);
        } else {
            let closeWithoutSaving = document.getElementById("confirm-close");
            let btnClose = document.getElementById("btn-close");
            closeWithoutSaving.classList.add("div-visible");
            btnClose.classList.add("btn-invisible");
        }
    };

    useEffect(() => {
        compareData(currentFormState, setCurrentFormState, currentItem, backupItem)
    }, [itemChanged])

    useEffect(() => {
        getItems('http://localhost:5111/client-type', setItems)
            .then(() => setLoading(false))
            .catch(console.error);
    }, [])

    return (
        <div id="layoutSidenav_content">
            <div className="container-fluid px-4">
                <h1 className="mt-4">CLIENT TYPES</h1>
                <div className="container-fluid">
                    <div className="RAM_container">
                        <Button className="RAM_button" id="addData"
                                onClick={()=>{
                                    clearCurrentItem(setCurrentItem, setBackupItem, defaultItem);
                                    onAddDataClick(currentFormState, setCurrentFormState, 'Here you can add new client type.', 'Add new client type');
                                }}>
                            Add new client type</Button>
                    </div>
                </div>
                <div className="card mb-4">
                    <div className="card-header">
                        <i className="fas fa-table me-1"></i>
                        Client types list
                    </div>
                    {(() => {
                        if (loading) {
                            return (
                                <div className="spinner-border text-secondary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            )
                        } else {
                            if (itemsList.length > 0) {
                                return (
                                    <div className="card-body">
                                        <Table id="datatablesSimple">
                                            <thead>
                                            <tr>
                                                <th>id</th>
                                                <th>name</th>
                                                <th>description</th>
                                                <th>details</th>
                                                <th>delete</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {itemsList.map((e) => (
                                                <tr key={e.id}>
                                                    <td>{e.id}</td>
                                                    <td>{e.name}</td>
                                                    <td>{e.description}</td>
                                                    <td><button className='btn btn-outline-info' onClick={() => {
                                                        getRelatedItemsByParentId(`http://localhost:5111/clients?clientTypeId=${e.id}`, setClientsList)
                                                        setCurrentItem(e);
                                                        setBackupItem(e);
                                                        onItemsListInfoButtonClick(currentFormState, setCurrentFormState, "Edit client type");
                                                    }}><FontAwesomeIcon icon={faEye}/></button></td>
                                                    <td><button className='btn btn-outline-danger' onClick={() => {
                                                        setCurrentItem(e);
                                                        checkRelatedItems(e.id);
                                                    }}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                )
                            } else {
                                return (<h6>NO DATA FOUND, PLEASE ADD A NEW CLIENT TYPE</h6>)
                            }
                        }
                    })()}
                </div>
            </div>
            {/*  ============== WARNING MODAL: BEGIN ============== */}
            <ModalDeleteWarning
                currentFormState={currentFormState}
                onCloseDeleteWarningDialog={onCloseDeleteWarningDialog}
                onDelete={onDelete}
                deleteItemName="client type"
            />
            {/*  ============== WARNING MODAL: END ============== */}

            {/*  ============== DETAILS MODAL: BEGIN ============== */}
            <Modal show={currentFormState.showForm}
                   size="xl"
                   backdrop="static"
                   keyboard={false}
                   onHide={onCloseDetails}>
                <Modal.Header className="form-header" closeButton closeVariant="white">
                    <Modal.Title>Client type details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <section className="mb-4">
                        <h2 className="h1-responsive font-weight-bold text-center my-2">{ currentFormState.formHeader }</h2>
                        <p className="text-center w-responsive mx-auto mb-5 form_test">{ currentFormState.formDescription }</p>
                        <div>
                            <p className="text-center w-responsive mx-auto mb-5 data_changed" id="data-changed"><FontAwesomeIcon icon={faExclamationCircle}/>&nbsp;{ currentFormState.formDataChangedWarning }</p>
                            <Button variant="secondary" id="btn-restore" className="btn-restore" onClick={() => {
                                restoreFormData(backupItem, setCurrentItem, currentFormState, setCurrentFormState)}}>
                                Restore
                            </Button>
                        </div>

                        <div className="row">
                            <div className="col-md-12 mb-md-0 mb-5">
                                <form id="add-equipment-category-form" name="add-equipment-category-form">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="md-form mb-0">
                                                <label htmlFor="name"
                                                       className="">Name</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    defaultValue={currentItem.name}
                                                    className="form-control"
                                                    required
                                                    onChange={(e) => {
                                                        setItemChanged(!itemChanged);
                                                        setCurrentItem({...currentItem,
                                                            name: e.target.value});
                                                        setCurrentFormState({...currentFormState, formSaveButtonDisabled: false});
                                                    }}
                                                    onClick={() => {
                                                        resetInvalidInputField("name");
                                                    }}
                                                ></input>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="md-form mb-0">
                                                <label htmlFor="description"
                                                       className="">Description</label>
                                                <textarea
                                                    id="description"
                                                    name="description"
                                                    rows="3"
                                                    defaultValue={currentItem.description}
                                                    className="form-control md-textarea"
                                                    onChange={(e) => {
                                                        setItemChanged(!itemChanged);
                                                        setCurrentItem({...currentItem,
                                                            description: e.target.value});
                                                        setCurrentFormState({...currentFormState, formSaveButtonDisabled: false});
                                                    }}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    { !currentFormState.formAddingDataMode &&
                                        <div className="row margin-top">
                                            <div className="col-md-12">
                                                <div className="md-form mb-0">
                                                    <div className="card">
                                                        <div className="card-header">
                                                            {clientsList.length > 0 ?
                                                                "Equipment in this category" :
                                                                "No equipment found in this category"
                                                            }
                                                        </div>
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    {clientsList.map((e) => (
                                                                        <div key={e.id}>
                                                                            {e.name}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </form>
                            </div>
                        </div>
                    </section>
                </Modal.Body>
                <ModalFooter
                    onFormCancelDeleteButtonClick={onFormCancelDeleteButtonClick}
                    onDelete={onDelete}
                    currentFormState={currentFormState}
                    onFormConfirmDeleteButtonClick={onFormConfirmDeleteButtonClick}
                    onFormCancelCloseButtonClick={onFormCancelCloseButtonClick}
                    onFormCloseWithoutSavingButtonClick={onFormCloseWithoutSavingButtonClick}
                    onCloseDetails={onCloseDetails}
                    onSubmit={onSubmit}
                    setCurrentFormState = {setCurrentFormState}
                    setCurrentItem = {setCurrentItem}
                    setBackupItem = {setBackupItem}
                    defaultItem = {defaultItem}
                />
            </Modal>
            {/*  ============== DETAILS MODAL: END ============== */}
        </div>
    )

}

export default ClientType;