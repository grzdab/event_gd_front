import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons/faEye";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons/faExclamationCircle";
import {compareObjects, resetInvalidInputField} from "../js/helpers";

const EquipmentCategory = () => {

    const defaultItem = {        "id": "",
        "name": "",
        "description": ""
    }

    const defaultFormState = {
        "showForm": false,
        "showDeleteWarning": false,
        "showItemChangedWarning": false,
        "formHeader": "Edit equipment category",
        "formDescription": "",
        "formDataChangedWarning": "Data has been changed",
        "formAddingDataMode": false,
        "formSaveButtonDisabled": false
    }

    const [currentFormState, setCurrentFormState] = useState(defaultFormState);
    const [itemsList, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState(defaultItem);
    const [equipmentList, setEquipmentList] = useState([]);
    const [backupItem, setBackupItem] = useState(defaultItem);
    const [itemChanged, setItemChanged] = useState(false);

    const delay = (time) => {
        return new Promise(r => setTimeout(r, time));
    }




    const addEquipmentCategory = async (equipmentCategory) => {
        const response = await fetch('http://localhost:5111/categories', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(equipmentCategory)
        });
        const data = await response.json();
        setItems([...itemsList, data]);
    }

    function onSaveAndClose() {
        setCurrentFormState({
            ...currentFormState,
            showForm: false,
            formSaveButtonDisabled: true,
            formAddingDataMode: false
        })
        clearCurrentItem();
    }

    const onSubmit = (e) => {
        e.preventDefault() // prevents from submitting to the page which is default behavior
        if(!currentItem.name) {
            let nameInput = document.getElementById("name");
            nameInput.classList.add("form-input-invalid");
            nameInput.placeholder = "Category name cannot be empty"
            return;
        }
        if (currentFormState.formAddingDataMode) {
            addEquipmentCategory({name: currentItem.name, description: currentItem.description})
                .then(() => onSaveAndClose());
        } else {
            updateEquipmentCategory({id: currentItem.id, name: currentItem.name, description: currentItem.description})
                .then(() => onSaveAndClose());
        }
    }

    const onDelete = (e) => {
        e.preventDefault() // prevents from submitting to the page which is default behavior
        deleteEquipmentCategory(currentItem.id).then(() => {
            onCloseDeleteWarningDialog();
        });
    }

    const onAddDataClick = () => {
        setCurrentFormState({...currentFormState,
            formDescription: 'Here you can add new equipment category.',
            formHeader: 'Add new equipment category',
            formAddingDataMode: true,
            formSaveButtonDisabled: false,
            showForm: true})
        // delay(1000).then(() => console.log(currentFormState));
    }

    const fetchEquipmentCategory = async (id) => {
        const response = await fetch(`http://localhost:5111/categories/${id}`);
        const data = await response.json();
        return data;
    }

    const updateEquipmentCategory = async (equipmentCategory) => {
        const updated = {
            name: currentItem.name,
            description: currentItem.description
        };
        const response = await fetch(`http://localhost:5111/categories/${equipmentCategory.id}`, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(updated)
        });
        const data = await response.json();
        setItems(
            itemsList.map((item) =>
                item.id === equipmentCategory.id ? data : item));
    }

    const deleteEquipmentCategory = async (id) => {
        await fetch(`http://localhost:5111/categories/${id}`, {method: 'DELETE',});
        setItems(itemsList.filter((equipmentCategory) => equipmentCategory.id !== id));
    }

    const clearCurrentItem = () => {
        setCurrentItem(defaultItem);
        setBackupItem(defaultItem);
    }

    const onCloseDeleteWarningDialog = () => {
        clearCurrentItem();
        setCurrentFormState({...currentFormState, showDeleteWarning: false, showForm: false});
    };

    const handleShowWarning   = () => setCurrentFormState({...currentFormState, showDeleteWarning: true});

    const onCloseDetails = () => {

        if (compareObjects(backupItem, currentItem)) {
            setCurrentFormState({
                ...currentFormState,
                showForm: false,
                formSaveButtonDisabled: true,
                formAddingDataMode: false
            })
            clearCurrentItem();
        } else {
            let closeWithoutSaving = document.getElementById("confirm-close");
            let btnClose = document.getElementById("btn-close");
            closeWithoutSaving.classList.add("div-visible");
            btnClose.classList.add("btn-invisible");
        }
    };

    function onFormCancelCloseButtonClick() {
        let closeWithoutSaving = document.getElementById("confirm-close");
        let btnClose = document.getElementById("btn-close");
        closeWithoutSaving.classList.remove("div-visible");
        btnClose.classList.remove("btn-invisible");
    }

    function onFormCloseWithoutSavingButtonClick() {
        setCurrentFormState({
            ...currentFormState,
            showForm: false,
            formSaveButtonDisabled: true,
            formAddingDataMode: false
        })
        clearCurrentItem();
    }

    useEffect(() => {
        const compareData = () => {
            let dataChangedInfo = document.getElementById("data-changed");
            let confirmCloseDiv = document.getElementById("confirm-close");
            let btnClose = document.getElementById("btn-close");
            let btnRestore = document.getElementById("btn-restore");
            if (dataChangedInfo && currentFormState.showForm && !currentFormState.formAddingDataMode) {
                if (!compareObjects(backupItem, currentItem)) {
                    dataChangedInfo.classList.add("visible");
                    btnRestore.classList.add("visible");
                    setCurrentFormState({...currentFormState, formSaveButtonDisabled: false})
                } else {
                    if (confirmCloseDiv) {
                        confirmCloseDiv.classList.remove("div-visible")
                    }
                    btnClose.classList.remove("btn-invisible");
                    dataChangedInfo.classList.remove("visible");
                    btnRestore.classList.remove("visible");
                    setCurrentFormState({...currentFormState, formSaveButtonDisabled: true})
                }
            }
        }
        compareData()
    }, [itemChanged])



    const getEquipmentByCategory = async (id) => {
        const response = await fetch(`http://localhost:5111/equipment?equipmentCategoryId=${id}`);
        const data = await response.json();
        setEquipmentList(data);
    }

    // useEffect(() => {
    //     console.log(equipmentList);
    // }, [equipmentList])


    useEffect(() => {
        const getCategories = async () => {
            const response = await fetch('http://localhost:5111/categories');
            const data = await response.json();
            switch(response.status) {
                case 401:
                    // TODO Unauthenticated
                    break;
                case 403:
                    // TODO Forbidden
                    break;
                case 404:
                    // TODO Not found
                    break;
                default:
                // TODO Other errors
            }
            if (response.ok) {
                setItems(data);
            }
        }
        getCategories().catch(console.error);
    }, [])

    function onItemsListInfoButtonClick() {
        setCurrentFormState({...currentFormState,
            formAddingDataMode: false,
            formHeader: "Edit equipment category",
            formDescription: "",
            formSaveButtonDisabled: true,
            showForm: true})
    }

    function onItemsListDeleteButtonClick() {
        setCurrentFormState({...currentFormState, showDeleteWarning: true})
    }

    function onFormCancelDeleteButtonClick() {
        document.getElementById("confirm-delete").classList.add("div-hidden");
        document.getElementById("btn-delete").classList.remove("btn-invisible");
    }

    function onFormConfirmDeleteButtonClick() {
        document.getElementById("confirm-delete").classList.remove("div-hidden");
        document.getElementById("btn-delete").classList.add("btn-invisible");
    }


    function restoreFormData() {
        setCurrentItem(backupItem);
        let nameInput = document.getElementById("name");
        let descriptionInput = document.getElementById("description");
        let dataChangedInfo = document.getElementById("data-changed");
        let btnRestore = document.getElementById("btn-restore");
        let btnSave = document.getElementById("bt")
        nameInput.value = backupItem.name;
        descriptionInput.value = backupItem.description;
        dataChangedInfo.classList.remove("visible")
        btnRestore.classList.remove("visible")
        setCurrentFormState({
            ...currentFormState,
            formSaveButtonDisabled: true,
        })
    }

    return (
        <div id="layoutSidenav_content">
            <div className="container-fluid px-4">
                <h1 className="mt-4">EQUIPMENT CATEGORIES</h1>
                <div className="container-fluid">
                    <div className="RAM_container">
                        <Button className="RAM_button" id="getData">Get data</Button>
                        <Button className="RAM_button" id="addData"
                                onClick={()=>{
                                    clearCurrentItem();
                                    onAddDataClick();

                                }}>
                            Add new equipment category</Button>
                    </div>
                </div>
                <div className="card mb-4">
                    <div className="card-header">
                        <i className="fas fa-table me-1"></i>
                        Equipment categories list
                    </div>
                    { itemsList.length > 0 ? (
                        <div className="card-body">
                            <table id={"datatablesSimple"}>
                                <thead>
                                <tr>
                                    <th>id</th>
                                    <th>name</th>
                                    <th>description</th>
                                </tr>
                                </thead>
                                <tbody>
                                {itemsList.map((e) => (
                                    <tr key={e.id}>
                                        <td>{e.id}</td>
                                        <td>{e.name}</td>
                                        <td>{e.description}</td>
                                        <td><button className='btn btn-outline-info' onClick={() => {
                                            getEquipmentByCategory(e.id);
                                            setCurrentItem(e);
                                            setBackupItem(e);
                                            onItemsListInfoButtonClick();
                                        }}><FontAwesomeIcon icon={faEye}/></button></td>
                                        <td><button className='btn btn-outline-danger' onClick={() => {
                                            setCurrentItem(e);
                                            onItemsListDeleteButtonClick();
                                        }}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>) : (
                        <h6> NO DATA FOUND. PLEASE ADD NEW EQUIPMENT CATEGORY. </h6>
                    )}
                </div>
            </div>
            {/*  ============== WARNING MODAL: BEGIN ============== */}
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
                    Are you sure you want to delete this category? This operation cannot be undone!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onCloseDeleteWarningDialog}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={onDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
            {/*  ============== WARNING MODAL: END ============== */}

            {/*  ============== EQUIPMENT CATEGORY DETAILS MODAL: BEGIN ============== */}
            <Modal show={currentFormState.showForm}
                   size="xl"
                   backdrop="static"
                   keyboard={false}
                   onHide={onCloseDetails}>
                <Modal.Header className="form-header" closeButton closeVariant="white">
                    <Modal.Title>Equipment category details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <section className="mb-4">
                        <h2 className="h1-responsive font-weight-bold text-center my-2">{ currentFormState.formHeader }</h2>
                        <p className="text-center w-responsive mx-auto mb-5 form_test">{ currentFormState.formDescription }</p>
                        <div>
                            <p className="text-center w-responsive mx-auto mb-5 data_changed" id="data-changed"><FontAwesomeIcon icon={faExclamationCircle}/>&nbsp;{ currentFormState.formDataChangedWarning }</p>
                            <Button variant="secondary" id="btn-restore" className="btn-restore" onClick={() => {restoreFormData()}}>
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
                                                    type="text"
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
                                                            {equipmentList.length > 0 ?
                                                                "Equipment in this category" :
                                                                "No equipment found in this category"
                                                            }
                                                        </div>
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    {equipmentList.map((e) => (
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
                <Modal.Footer>
                    <div className="form-confirm-delete div-hidden" id="confirm-delete">
                        Confirm delete? (This operation cannot be undone)
                        <Button variant="secondary" onClick={() => onFormCancelDeleteButtonClick()}>
                            No
                        </Button>
                        <Button variant="danger" onClick={onDelete}>
                            Confirm
                        </Button>
                    </div>
                    {!currentFormState.formAddingDataMode &&
                        <Button variant="danger" id="btn-delete" onClick={() => onFormConfirmDeleteButtonClick()}>
                            Delete
                        </Button>
                    }
                    <div className="form-confirm-close" id="confirm-close">
                        Close without saving?
                        <Button variant="secondary" onClick={() => onFormCancelCloseButtonClick()}>
                            No
                        </Button>
                        <Button variant="warning" onClick={() => onFormCloseWithoutSavingButtonClick()}>
                            Close
                        </Button>
                    </div>
                    <Button variant="secondary" id="btn-close" onClick={onCloseDetails}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onSubmit} disabled={currentFormState.formSaveButtonDisabled}>
                        Save & Close
                    </Button>
                </Modal.Footer>
            </Modal>
            {/*  ============== EQUIPMENT CATEGORY DETAILS MODAL: END ============== */}
        </div>
    )

}

export default EquipmentCategory;