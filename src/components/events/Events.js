// import React, {Component, useMemo} from 'react';
// import { useState, useEffect } from 'react';
import React, {useEffect, useState, useRef, useMemo} from 'react';
import Pagination from "@mui/material/Pagination";
import {Fab} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
// import ReactPaginate from "react-paginate";
// import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";
import ModalFooter from "../layout/ModalFooter";
import ModalDeleteWarning from "../layout/ModalDeleteWarning";
import {compareObjects, resetInvalidInputField} from "../../js/CommonHelper";
import {
    clearCurrentItem, compareData,
    deleteItem, getItems, onAddDataClick,
    onFormCancelCloseButtonClick,
    onFormCancelDeleteButtonClick, onFormCloseWithoutSavingButtonClick,
    onFormConfirmDeleteButtonClick,
    onSaveAndClose, restoreFormData,
    updateItem
} from "../helpers/ComponentHelper";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons/faExclamationCircle";
import Button from "react-bootstrap/Button";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";

// import axios from "axios";
// import {useRef} from "@types/react";
// let tableData;
let clickedId = 0;
let pageNum;

const Events = () => {

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
    const [eventsList, setLanguages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [itemsList, setItems] = useState([]);
    const [error, setError] = useState('');
    const [showEditModalDetails, setShowEditModalDetails] = useState(defaultEditModalDetails);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [modalHeader, setModalHeader] = useState('Edit equipment');
    const [modalDescription, setModalDescription] = useState('');
    const [currentItem, setCurrentItem] = useState(defaultItem);
    const [currentPage, setCurrentPage] = useState(1);
    const [languageName, setLanguageName] = useState('');
    const [showAddModalDetails, setShowAddModalDetails] = useState(defaultAddModalDetails);
    const [backupItem, setBackupItem] = useState(defaultItem);
    const [data, setData] = useState([]);
    const [sortType, setSortType] = useState('albums');

     // //
    // const handleCloseDetails = () => {
    //     setShowDetails(false);
    //     setCurrentItem(defaultItem);
    // };
    // const handleShowDetails = () => setShowDetails(true);

    // useEffect(() => {
    //     const getEvents = async(pageNum =1) => {
    //         const response = await fetch(`http://localhost:8080/admin/language/languagePage/${pageNum}`);
    //         const data = await response.json();
    //         if (response.status === 404) {
    //             setError('Equipment data not found');
    //         }
    //         setItems(data);
    //         itemsList = data;
    //         console.log(itemsList);
    //         // console.log(itemsList);
    //         setLoading(false);
    //         // console.log(response);
    //     }
    //     getEvents().catch(console.error)
    // }, []);
    //
    // const paginationSize = useMemo(() => {
    //     return Math.ceil(itemsList.length / 10);
    // });
    //
    // const fetchById = async (id) => {
    //     const response = await fetch(`http://localhost:8080/admin/language/${id}`);
    //     const data = await response.json();
    //     return data;
    // }
/////
    const addItem = async (item, url, setItems, itemsList) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(item)
        });
        const data = await response.json();
        setItems([...itemsList, data]);
    }

    const onSubmit = (e) => {
        e.preventDefault()


        const checkItem = {
            id: currentItem.id,
            propertyName: currentItem.propertyName
        };

        if (!currentItem.propertyName || currentItem.id === 0) {
            if(!currentItem.propertyName) {
                let nameInput = document.getElementById("name");
                nameInput.classList.add("form-input-invalid");
                nameInput.placeholder = "Language name cannot be empty"
            }

            if(currentItem.id === 0) {
                let categoryOption = document.getElementById("equipmentCategoryId");
                categoryOption.classList.add("form-input-invalid");
            }
            return;
        }

        if (showAddModalDetails.formAddingDataMode) {
            const item = {

                propertyName: currentItem.propertyName
            };
            console.log(item);
            addItem(item, `http://localhost:8081/admin/language`, setItems, itemsList)
                .then(() => onSaveAndClose(setShowAddModalDetails, showAddModalDetails, setCurrentItem, setBackupItem, defaultItem));
        } else {
            const item = {
                id: currentItem.id,
                propertyName: currentItem.propertyName
            };
            updateItem(item, currentItem, `http://localhost:8081/admin/language/${clickedId}`, setItems, itemsList)
                .then(() => onSaveAndClose(setShowAddModalDetails, showAddModalDetails, setCurrentItem, setBackupItem, defaultItem));;
        }
    }

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

    const onCloseDetails = () => {
        if (compareObjects(backupItem, currentItem)) {
            if (setShowAddModalDetails){
            setShowAddModalDetails({
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
        }}
    };

    const onCloseEditDetails = () => {
        if (compareObjects(backupItem, currentItem)) {
            if (setShowEditModalDetails) {
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
            }       }
    };

    useEffect(() => {
        compareData(showAddModalDetails, setShowAddModalDetails, currentItem, backupItem)
    }, [currentItem])

    //przyhardkodowane pierwsze 10 rekiordów

    //get na  noey endpoint ilość rekordów

    // useEffect(() => {
    //     getItems(`http://localhost:8080/admin/language/languagePage/1`, setItems)
    //         .then(() => setLoading(false))
    //         .catch(console.error);
    // }, [])

    const paginationSize = useMemo(() => {
        useEffect(() => {
            getItems(`http://localhost:8081/admin/language`, setItems)
                .then(() => setLoading(false))
                .catch(console.error);},[]);
        return Math.ceil(itemsList.length / 10);
    });


    function saveId(id) {
        console.log("id");
        console.log(id);
        clickedId = id;
    }

    useEffect(() => {
        const sortArray = type => {
            const types = {
                up: 'up',
                down: 'down',
            };
            const sortProperty = types[type];
            const sorted = [...itemsList].sort((a, b) => b[sortProperty] - a[sortProperty]);
            setData(sorted);
        };
        sortArray(sortType);
    }, [sortType]);

    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Events</h1>
                    <ol className="breadcrumb mb-4">

                        <li className="breadcrumb-item active">Events list</li>
                    </ol>
                    <div className="RAM_container">
                        <Button className="RAM_button" id="addData"
                                onClick={()=> {
                                    setModalDescription('Here you can add new language details.');
                                    setModalHeader('Add');
                                    // setShowAddModalDetails(true);
                                    clearCurrentItem(setCurrentItem,
                                        setBackupItem, defaultItem);
                                    onAddDataClick(showAddModalDetails,
                                        setShowAddModalDetails,
                                        'Here you can add new language.', 'Add new language');
                                }
                                }
                        >
                            Add new language</Button>
                    </div>
                    <div className="card mb-4">
                        <div className="card-header">
                            <i className="fas fa-table me-1"></i>
                            Language - Admin section
                        </div>
                        <div className="card-body">
                            <table id="datatablesSimple">
                                <thead>
                                <tr>
                                    <th>id</th>
                                    <th>
                                        Language
                                        <select onChange={ (e) => setSortType(e.target.value)}>
                                            <option value="up">up</option>
                                            <option value="down">down</option>
                                        </select>
                                    </th>
                                    <th>Details</th>
                                </tr>
                                </thead>
                                <tbody>
                                {itemsList.map((e) => (
                                    <tr key={e.id}>
                                        <td>{e.id}</td>
                                        <td>{e.propertyName}</td>
                                        <td>
                                            <Fab
                                                variant='extended'
                                                size="small"
                                            color="inherit"
                                            aria-label="edit">
                                            <EditIcon
                                                onClick={()=>{
                                                    setModalDescription('Here you can edit language details.');
                                                    setModalHeader('Edit');
                                                    // setShowEditModalDetails(true);
                                                    clearCurrentItem(setCurrentItem,
                                                        setBackupItem, defaultItem);
                                                    onAddDataClick(showEditModalDetails,
                                                        setShowEditModalDetails,
                                                        'Here you can edit language.', 'Edit language');
                                                    saveId(e.id);
                                                    setLanguageName(e.propertyName);
                                                }}
                                            />
                                        </Fab>
                                        </td>
                                        <td>
                                            <Button variant="danger" id="delete-image"
                                                    onClick={()=>{
                                                        setShowDeleteModal(true);
                                                        saveId(e.id);
                                                    }}>
                                                <FontAwesomeIcon icon={faTrashAlt}/>
                                            </Button>
                                        </td>
                                        <td>
                                            <Fab
                                                variant='extended'
                                                size='small'
                                                color='warning'
                                                aria-label="delete">
                                                <DeleteForeverOutlinedIcon
                                                    onClick={()=> {
                                                        saveId(e.id);
                                                        setShowDeleteModal(true);
                                                    }}
                                                />
                                            </Fab>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <Pagination
                                    count={paginationSize}
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    // totalItems={itemsList.length}
                                    // itemPerPage={10}
                                    // onChangePage={(pageNum) => setCurrentPage(pageNum)}
                                    boundaryCount={1}
                                    showFirstButton
                                    showLastButton
                            />
                        </div>
                    </div>
                </div>
            </main>
            <footer className="py-4 bg-light mt-auto">
                <div className="container-fluid px-4">
                    <div className="d-flex align-items-center justify-content-between small">
                        <div className="text-muted">Copyright &copy; R.A.M. 2022</div>
                        <div>
                            <a href="src/components/events/Events#">Privacy Policy</a>
                            &middot;
                            <a href="src/components/events/Events#">Terms &amp; Conditions</a>
                        </div>
                    </div>
                </div>
            </footer>
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
            {/*  ============== WARNING MODAL: END ============== */}

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
                                                defaultValue={ currentItem.propertyName }
                                                className="form-control"
                                                required
                                                onChange={(e)=>{
                                                setCurrentItem({
                                                    ...currentItem,
                                                propertyName: e.target.value});
                                                setShowAddModalDetails({...showAddModalDetails, formSaveButtonDisable: false});
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
            currentFormState={showAddModalDetails}
            onFormConfirmDeleteButtonClick={onFormConfirmDeleteButtonClick}
            onFormCancelCloseButtonClick={onFormCancelCloseButtonClick}
            onFormCloseWithoutSavingButtonClick={onFormCloseWithoutSavingButtonClick}
            onCloseDetails={onCloseDetails}
            onSubmit={onSubmit}
            setCurrentFormState = {setShowAddModalDetails}
            setCurrentItem = {setCurrentItem}
            setBackupItem = {setBackupItem}
            defaultItem = {defaultItem}
        />
    </Modal>
    {/*  ============== EQUIPMENT ADD DETAILS MODAL: END ============== */}

    {/*  ============== EQUIPMENT EDIT DETAILS MODAL: BEGIN ============== */}
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
            {/*  ============== EQUIPMENT EDIT DETAILS MODAL: END ============== */}
        </div>
    );
}

export default Events;

