import React, {useEffect, useState} from 'react';
import '../css/Form.css';
import Button from "react-bootstrap/Button";
import {Modal, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons/faQuestionCircle";
import ModalFooter from "./ModalFooter";
import {
    addItem,
    clearCurrentItem,
    compareData,
    deleteItem,
    getItemById,
    getItems,
    onAddDataClick, onFormCancelCloseButtonClick,
    onFormCancelDeleteButtonClick, onFormCloseWithoutSavingButtonClick,
    onFormConfirmDeleteButtonClick,
    onItemsListDeleteButtonClick,
    onItemsListInfoButtonClick,
    onSaveAndClose,
    restoreFormData,
    updateItem
} from "./ComponentHelper";
import {compareObjects} from "../js/CommonHelper";
import {faEye} from "@fortawesome/free-solid-svg-icons/faEye";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import ModalDeleteWarning from "./ModalDeleteWarning";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons/faExclamationCircle";

const Equipment = () => {

    const defaultItem = {
        "id": "",
        "sortingId": 0,
        "name": "",
        "notes": "",
        "width": 0,
        "length": 0,
        "height": 0,
        "weight": 0,
        "powerRequired": 0,
        "staffNeeded": 0,
        "minimumAge": 0,
        "maxParticipants": 0,
        "equipmentCategoryId": 0,
        "inUse": false
    }

    const defaultFormState = {
        "showForm": false,
        "showDeleteWarning": false,
        "showItemChangedWarning": false,
        "formHeader": "Edit equipment",
        "formDescription": "",
        "formDataChangedWarning": "Data has been changed",
        "formAddingDataMode": false,
        "formSaveButtonDisabled": false
    }

    const [loading, setLoading] = useState(true);
    const [currentFormState, setCurrentFormState] = useState(defaultFormState);
    const [itemsList, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState(defaultItem);
    const [backupItem, setBackupItem] = useState(defaultItem);
    const [itemChanged, setItemChanged] = useState(false);
    // elements related to the item
    const [categoriesList, setCategories] = useState([]);

    const onSubmit = (e) => {
        e.preventDefault()

        const checkItem = {
            id: currentItem.id,
            sortingId: currentItem.sortingId,
            name: currentItem.name,
            notes: currentItem.notes,
            width: currentItem.width,
            length: currentItem.length,
            height: currentItem.height,
            weight: currentItem.weight,
            powerRequired: currentItem.powerRequired,
            staffNeeded: currentItem.staffNeeded,
            minimumAge: currentItem.minimumAge,
            maxParticipants: currentItem.maxParticipants,
            equipmentCategoryId: currentItem.equipmentCategoryId,
            inUse: currentItem.inUse
        };
        console.log(checkItem);

        if(!currentItem.name) {
            let nameInput = document.getElementById("name");
            nameInput.classList.add("form-input-invalid");
            nameInput.placeholder = "Equipment name cannot be empty"
            return;
        }

        if(currentItem.equipmentCategoryId === 0) {
            alert("You have to choose an equipment category")
        }

        if (currentFormState.formAddingDataMode) {
            const item = {
                sortingId: currentItem.sortingId,
                name: currentItem.name,
                notes: currentItem.notes,
                width: currentItem.width,
                length: currentItem.length,
                height: currentItem.height,
                weight: currentItem.weight,
                powerRequired: currentItem.powerRequired,
                staffNeeded: currentItem.staffNeeded,
                minimumAge: currentItem.minimumAge,
                maxParticipants: currentItem.maxParticipants,
                equipmentCategoryId: currentItem.equipmentCategoryId,
                inUse: currentItem.inUse
            };
            addItem(item, 'http://localhost:5111/equipment', setItems, itemsList)
                .then(() => onSaveAndClose(setCurrentFormState, currentFormState, setCurrentItem, setBackupItem, defaultItem));
        } else {
            const item = {
                id: currentItem.id,
                sortingId: currentItem.sortingId,
                name: currentItem.name,
                notes: currentItem.notes,
                width: currentItem.width,
                length: currentItem.length,
                height: currentItem.height,
                weight: currentItem.weight,
                powerRequired: currentItem.powerRequired,
                staffNeeded: currentItem.staffNeeded,
                minimumAge: currentItem.minimumAge,
                maxParticipants: currentItem.maxParticipants,
                equipmentCategoryId: currentItem.equipmentCategoryId,
                inUse: currentItem.inUse
                };

            updateItem(item, currentItem, `http://localhost:5111/equipment/${item.id}`, setItems, itemsList)
                .then(() => onSaveAndClose(setCurrentFormState, currentFormState, setCurrentItem, setBackupItem, defaultItem));;
        }
    }

    const onDelete = (e) => {
        e.preventDefault()
        deleteItem(currentItem.id, `http://localhost:5111/equipment/${currentItem.id}`, setItems, itemsList)
            .then(() => {
                onCloseDeleteWarningDialog();
            });
    }

    const onCloseDeleteWarningDialog = () => {
        clearCurrentItem(setCurrentItem, setBackupItem, defaultItem);
        setCurrentFormState({...currentFormState, showDeleteWarning: false, showForm: false});
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
    }, [currentItem])

    useEffect(() => {
        getItems('http://localhost:5111/equipment', setItems)
            .then(() => setLoading(false))
            .catch(console.error);
    }, [])

    useEffect(() => {
        const getCategories = async () => {
            const response = await fetch('http://localhost:5111/categories');
            const data = await response.json();
            if (response.status === 404) {
                alert('Categories data not found');
            }
            setCategories(data);
        }
        getCategories().catch(console.error);

    }, [])

    return (
        <div id="layoutSidenav_content">
            <div className="container-fluid px-4">
                <h1 className="mt-4">EQUIPMENT</h1>
                <div className="container-fluid">
                    <div className="RAM_container">
                        <Button className="RAM_button" id="addData"
                                onClick={()=>{
                                    clearCurrentItem(setCurrentItem, setBackupItem, defaultItem);
                                    onAddDataClick(currentFormState, setCurrentFormState, 'Here you can add new equipment.', 'Add new equipment');
                                }}>
                            Add new equipment</Button>
                    </div>
                </div>
                <div className="card mb-4">
                    <div className="card-header">
                        <i className="fas fa-table me-1"></i>
                            Equipment list
                    </div>
                    {(() => {
                      if (loading) {
                          return (
                              <h6>LOADING DATA, PLEASE WAIT...</h6>
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
                                                <th>notes</th>
                                                <th>details</th>
                                                <th>delete</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {itemsList.map((e) => (
                                                <tr key={e.id}>
                                                    <td>{e.id}</td>
                                                    <td>{e.name}</td>
                                                    <td>{e.notes}</td>
                                                    <td><button className='btn btn-outline-info' onClick={() => {
                                                        setCurrentItem(e);
                                                        setBackupItem(e);
                                                        onItemsListInfoButtonClick(currentFormState, setCurrentFormState, "Edit equipment data");
                                                    }}><FontAwesomeIcon icon={faEye}/></button></td>
                                                    <td><button className='btn btn-outline-danger' onClick={() => {
                                                        setCurrentItem(e);
                                                        onItemsListDeleteButtonClick(currentFormState, setCurrentFormState);
                                                    }}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                )
                          } else {
                              return (<h6>NO DATA FOUND, PLEASE ADD A NEW EQUIPMENT</h6>)
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
                deleteItemName="equipment"
            />
            {/*  ============== WARNING MODAL: END ============== */}

            {/*  ============== EQUIPMENT DETAILS MODAL: BEGIN ============== */}
            <Modal show={currentFormState.showForm}
                   size="xl"
                   backdrop="static"
                   keyboard={false}
                   onHide={onCloseDetails}>
                <Modal.Header className="form-header" closeButton closeVariant="white">
                    <Modal.Title>Equipment details</Modal.Title>
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
                                <form id="add-equipment-form" name="add-equipment-form">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="row">
                                                <div className="md-form mb-0">
                                                    <label htmlFor="name" className="">Equipment name <span
                                                        className="required">*</span></label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        defaultValue={currentItem.name}
                                                        className="form-control"
                                                        required
                                                        onChange={(e) => {
                                                            setCurrentItem({...currentItem,
                                                                name: e.target.value});
                                                            setCurrentFormState({...currentFormState, formSaveButtonDisabled: false});
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <div className="md-form mb-0">
                                                        <label htmlFor="category" className="">Category <span
                                                            className="required">*</span></label>
                                                        <select className="form-select"
                                                                aria-label="Default select example"
                                                                defaultValue = {
                                                                    currentItem.equipmentCategoryId > 0
                                                                        ? currentItem.equipmentCategoryId
                                                                        : ""
                                                                }
                                                                onChange={(e) => {
                                                                    setCurrentItem({...currentItem,
                                                                        equipmentCategoryId: parseInt(e.target.value)});
                                                                    console.log(e.target.value);
                                                                    setCurrentFormState({...currentFormState, formSaveButtonDisabled: false});
                                                                }}
                                                        >
                                                            <option disabled value=""> -- Select Category -- </option>
                                                            {categoriesList.map((e) => (
                                                                <option key={e.id} value={e.id}>{e.name}</option>))
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="md-form mb-0">
                                                        Sequence<div className="form_tooltip"><FontAwesomeIcon icon={faQuestionCircle}/><span
                                                            className="form_tooltip_text">Setting the sequence allows you to control the placement of items in the Scheduler.</span></div>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            max="255"
                                                            id="sortingId"
                                                            name="sortingId"
                                                            defaultValue={currentItem.sortingId}
                                                            className="form-control"
                                                            onChange={(e) => {
                                                                setCurrentItem({...currentItem,
                                                                    sortingId: parseInt(e.target.value)});
                                                                setCurrentFormState({...currentFormState, formSaveButtonDisabled: false});
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="md-form mb-0">
                                                        <label htmlFor="description"
                                                               className="">Description</label>
                                                        <textarea
                                                            type="text"
                                                            id="notes"
                                                            name="notes"
                                                            rows="2"
                                                            defaultValue={currentItem.notes}
                                                            className="form-control md-textarea"
                                                            onChange={(e) => {
                                                                setCurrentItem({...currentItem,
                                                                    notes: e.target.value});
                                                                setCurrentFormState({...currentFormState, formSaveButtonDisabled: false});
                                                            }}
                                                        ></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="md-form">
                                                <label htmlFor="photos">Photos</label>
                                                <textarea type="text" id="photos" name="photos" rows="2"
                                                          className="form-control md-textarea"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row margin-top">
                                        <div className="col-md-7">
                                            <div className="md-form mb-0">
                                                <div className="card">
                                                    <div className="card-header">
                                                        Technical data
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <label htmlFor="length" className="">Length
                                                                    (cm)</label>
                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    id="length"
                                                                    name="length"
                                                                    defaultValue={currentItem.length}
                                                                    className="form-control"
                                                                    onChange={(e) => {
                                                                        setCurrentItem({...currentItem,
                                                                            length: parseInt(e.target.value)});
                                                                        setCurrentFormState({...currentFormState, formSaveButtonDisabled: false});
                                                                    }}
                                                                />
                                                                <label htmlFor="width" className="">Width
                                                                    (cm)</label>
                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    id="width"
                                                                    name="width"
                                                                    defaultValue={currentItem.width}
                                                                    className="form-control"
                                                                    onChange={(e) => {
                                                                        setCurrentItem({...currentItem,
                                                                            width: parseInt(e.target.value)});
                                                                        setCurrentFormState({...currentFormState, formSaveButtonDisabled: false});
                                                                    }}
                                                                />
                                                                <label htmlFor="height>" className="">Height
                                                                    (cm)</label>
                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    id="height"
                                                                    name="height"
                                                                    defaultValue={currentItem.height}
                                                                    className="form-control"
                                                                    onChange={(e) => {
                                                                        setCurrentItem({...currentItem,
                                                                            height: parseInt(e.target.value)});
                                                                        setCurrentFormState({...currentFormState, formSaveButtonDisabled: false});
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label htmlFor="area" className="">Area
                                                                    (m<sup>2</sup>)</label>
                                                                <input
                                                                    disabled
                                                                    type="number"
                                                                    id="area"
                                                                    name="area"
                                                                    value={currentItem.length * currentItem.width}
                                                                    className="form-control"
                                                                />
                                                                <label htmlFor="weight" className="">Weight
                                                                    (kg)</label>
                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    id="weight"
                                                                    name="weight"
                                                                    defaultValue={currentItem.weight}
                                                                    className="form-control"
                                                                    onChange={(e) => {
                                                                        setCurrentItem({...currentItem,
                                                                            weight: parseInt(e.target.value)});
                                                                        setCurrentFormState({...currentFormState, formSaveButtonDisabled: false});
                                                                    }}
                                                                />
                                                                <label htmlFor="power>" className="">Power
                                                                    (kW)</label>
                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    id="power"
                                                                    name="power"
                                                                    defaultValue={currentItem.powerRequired}
                                                                    className="form-control"
                                                                    onChange={(e) => {
                                                                        setCurrentItem({...currentItem,
                                                                            powerRequired: parseInt(e.target.value)});
                                                                        setCurrentFormState({...currentFormState, formSaveButtonDisabled: false});
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="card">
                                                <div className="card-header">
                                                    Conditions
                                                </div>
                                                <div className="card-body">
                                                    <label htmlFor="staff" className="">Required staff</label>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        id="staff"
                                                        name="staff"
                                                        defaultValue={currentItem.staffNeeded}
                                                        className="form-control"
                                                        onChange={(e) => {
                                                            setCurrentItem({...currentItem,
                                                                staffNeeded: parseInt(e.target.value)});
                                                            setCurrentFormState({...currentFormState, formSaveButtonDisabled: false});
                                                        }}
                                                    />
                                                    <label htmlFor="minimum_age" className="">Minimum age</label>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        id="minimum_age"
                                                        name="minimum_age"
                                                        defaultValue={currentItem.minimumAge}
                                                        className="form-control"
                                                        onChange={(e) => {
                                                            setCurrentItem({...currentItem,
                                                                minimumAge: parseInt(e.target.value)});
                                                            setCurrentFormState({...currentFormState, formSaveButtonDisabled: false});
                                                        }}
                                                    />
                                                    <label htmlFor="max_participants>" className="">Max
                                                        participants</label>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        id="max_participants"
                                                        name="max_participants"
                                                        defaultValue={currentItem.maxParticipants}
                                                        className="form-control"
                                                        onChange={(e) => {
                                                            setCurrentItem({...currentItem,
                                                                maxParticipants: parseInt(e.target.value)});
                                                            setCurrentFormState({...currentFormState, formSaveButtonDisabled: false});
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="md-form mb-0">
                                                <div className="card">
                                                    <div className="card-header">
                                                        Status
                                                    </div>
                                                    <div className="card-body">
                                                        <label htmlFor="in_use" className="">In use</label>
                                                        <input
                                                            type="checkbox"
                                                            id="in_use"
                                                            name="in_use"
                                                            defaultValue={currentItem.inUse}
                                                            className="form-control"
                                                            onChange={(e) => {
                                                                setCurrentItem({...currentItem,
                                                                    maxParticipants: e.currentTarget.checked});
                                                                setCurrentFormState({...currentFormState, formSaveButtonDisabled: false});
                                                            }}


                                                        />
                                                        <label htmlFor="ownership" className="">Ownership</label>
                                                        <input
                                                            type="text"
                                                            id="ownership"
                                                            name="ownership"
                                                            value="TODO"
                                                            className="form-control"
                                                        />
                                                        <label htmlFor="status" className="">Status</label>
                                                        <input
                                                            type="text"
                                                            id="status"
                                                            name="status"
                                                            value="TODO"
                                                            className="form-control"
                                                        />
                                                    </div>
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
            {/*  ============== EQUIPMENT DETAILS MODAL: END ============== */}
    </div>
    )

}

export default Equipment;