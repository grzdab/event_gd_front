import React, {useEffect, useState, useRef} from 'react';
import '../../../css/Form.css';
import Button from "react-bootstrap/Button";
import {Modal, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons/faQuestionCircle";
import ModalFooter from "../layout/ModalFooter";
import axios from "axios";
import {
  addItem,
  clearCurrentItem,
  compareData,
  deleteItem,
  getRelatedItemsByParentId,
  getItems,
  onAddDataClick, onFormCancelCloseButtonClick,
  onFormCancelDeleteButtonClick, onFormCloseWithoutSavingButtonClick,
  onFormConfirmDeleteButtonClick,
  onItemsListDeleteButtonClick,
  onItemsListInfoButtonClick,
  onSaveAndClose,
  restoreFormData,
  updateItem
} from "../../../helpers/ComponentHelper";
import {compareObjects, resetInvalidInputField} from "../../../js/CommonHelper";
import {faEye} from "@fortawesome/free-solid-svg-icons/faEye";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import ModalDeleteWarning from "../layout/ModalDeleteWarning";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons/faExclamationCircle";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAxiosPrivateFileUpload from "../../../hooks/useAxiosPrivateFileUpload";
import { useNavigate, useLocation } from "react-router-dom";


// TODO: react-dropzone can be used for selecting images

const Equipment = ({appSettings, setAppSettings}) => {

  const imagesFolder = "/images/equipment_photos/";
  const equipmentImagePlaceholder = "/images/equipment_photos/placeholder.jpg";
  const equipmentUrl ="/equipment";
  const equipmentCategoryUrl="/equipment-category";
  const equipmentStatusUrl="/equipment-status";
  const equipmentOwnershipUrl="/equipment-ownership";
  const equipmentBookingStatusUrl="/equipment-booking-status";

  const axiosPrivate = useAxiosPrivate();
  const axiosPrivateFileUpload = useAxiosPrivateFileUpload();
  const navigate = useNavigate();
  const location = useLocation();

  const defaultItem = {
    id: 0,
    sortingId: 0,
    name: "",
    notes: "",
    width: 0,
    length: 0,
    height: 0,
    weight: 0,
    powerRequired: 0,
    staffNeeded: 0,
    minimumAge: 0,
    maxParticipants: 0,
    equipmentCategory: {
      id: 0
    },
    inUse: false,
    photos:[],
    equipmentStatus: {
      id: 0
    },
    bookingStatus: {
      id: 0
    },
    equipmentOwnership: {
      id: 0
    }
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
  const [allowDelete, setAllowDelete] = useState(true);
  const [currentFormState, setCurrentFormState] = useState(defaultFormState);
  const [itemsList, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(defaultItem);
  const [backupItem, setBackupItem] = useState(defaultItem);
  const [itemChanged, setItemChanged] = useState(false);
  // elements related to the item
  const [categoriesList, setCategories] = useState([]);
  const [statusesList, setStatuses] = useState([]);
  const [ownershipTypesList, setOwnershipTypes] = useState([]);
  const [bookingStatusesList, setBookingStatuses] = useState([]);
  const [bookingStatusColor, setBookingStatusColor] = useState("#ffffff");

  const [imageFile, setImageFile] = useState(null);
  const [imageName, setImageName] = useState("");
  const fileInput = useRef(null);

  const deleteImageLink = () => {
    setCurrentItem({...currentItem, photoURI: ""})
  }

  const selectedFileHandler = (e) => {
    setImageFile(e.target.files[0]);
    setImageName(e.target.files[0].name);
    const formData = new FormData();
    formData.append("imageFile", e.target.files[0])
    axiosPrivate.post('http://localhost:8080/equipment/upload-image', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then(() => console.log("sent"))
      .catch(error => console.log(error))

    setCurrentItem({...currentItem, photos: [e.target.files[0].name]})
  }


  const fileUploadHandler = async () => {
    // TODO separate button for uploading images
    const response = await axiosPrivateFileUpload.post(
      'http://localhost:8080/equipment/upload-image',
      imageFile);

    // const data = await response.data;

    // fetch('http://localhost:8080/equipment/upload-image', {
    //   headers: {
    //     "Content-type": "multipart/form-data"
    //   },
    //   method: 'POST',
    //   body: imageFile
    // }).then(
    //   () => console.log("file uploaded")
    // ).catch(
    //   error => console.log(error)
    // );
  }

  const x = 1;

  const onSaveItem = async (e) => {
    e.preventDefault()
    if (!currentItem.name ||
      currentItem.equipmentCategory.id === 0 ||
      currentItem.equipmentStatus.id === 0 ||
      currentItem.equipmentOwnership.id === 0) {

      if(!currentItem.name) {
        let nameInput = document.getElementById("name");
        nameInput.classList.add("form-input-invalid");
        nameInput.placeholder = "Equipment name cannot be empty"
      }

      if(currentItem.equipmentCategory.id === 0) {
        let categoryOption = document.getElementById("equipmentCategoryId");
        categoryOption.classList.add("form-input-invalid");
      }

      if(currentItem.equipmentStatus.id === 0) {
        let statusOption = document.getElementById("equipmentStatusId");
        statusOption.classList.add("form-input-invalid");
      }

      if(currentItem.equipmentOwnership.id === 0) {
        let ownershipOption = document.getElementById("equipmentOwnershipId");
        ownershipOption.classList.add("form-input-invalid");
      }

      return;
    }

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
      equipmentCategory: {
        id: currentItem.equipmentCategory.id
      },
      equipmentStatus: {
        id: currentItem.equipmentStatus.id
      },
      equipmentOwnership: {
        id: currentItem.equipmentOwnership.id
      },
      bookingStatus: {
        id: currentItem.bookingStatus.id
      },
      inUse: currentItem.inUse,
      photos: currentItem.photos
    };

    if (currentFormState.formAddingDataMode) {
      const response = await axiosPrivate.post(equipmentUrl, item);
      setItems([...itemsList, response.data]);
      onSaveAndClose(setCurrentFormState, currentFormState, setCurrentItem, setBackupItem, defaultItem);
    } else {
      const response = await axiosPrivate.put(`${equipmentUrl}/${item.id}`, item);
      const data = await response.data;
      setItems(
        itemsList.map((i) =>
          i.id === item.id ? data : i));
      onSaveAndClose(setCurrentFormState, currentFormState, setCurrentItem, setBackupItem, defaultItem);
    }
  }

  const onDelete = async (e) => {
    e.preventDefault()
    const url = `${equipmentUrl}/${currentItem.id}`;
    try {
      await axiosPrivate.delete(url);
      setItems(itemsList.filter((i) => i.id !== currentItem.id));
      onCloseDeleteWarningDialog();
    } catch (err) {
      console.log(err.message);
    }
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

  // useEffect(() => {
  //   onItemsListDeleteButtonClick(currentFormState, setCurrentFormState, "equipment category", allowDelete);
  // }, [allowDelete])

  useEffect(() => {
    compareData(currentFormState, setCurrentFormState, currentItem, backupItem);
    if (currentItem.id !== 0) {
      setBookingStatusColor(bookingStatusesList.find(x => x.id === currentItem.bookingStatus.id).color);
    }
  }, [currentItem])


  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getItems = async () => {
      try {
        const response = await axiosPrivate.get(equipmentUrl, {
          signal: controller.signal
        });
        isMounted && setItems(response.data);
        setLoading(false);
      } catch (err) {
        navigate('/login', { state: { from: location }, replace: true });
      }
    }
    getItems();

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [])


  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getStatuses = async () => {
      try {
        const response = await axiosPrivate.get(equipmentStatusUrl, {
          signal: controller.signal
        });
        if (response.status === 404) {
          alert('Equipment statuses data not found');
        }
        isMounted && setStatuses(response.data);
        setLoading(false);
      } catch (err) {
        navigate('/login', { state: { from: location }, replace: true });
      }
    }
    getStatuses();
    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [])


  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getOwnershipTypes = async () => {
      try {
        const response = await axiosPrivate.get(equipmentOwnershipUrl, {
          signal: controller.signal
        });
        if (response.status === 404) {
          alert('Equipment ownership types data not found');
        }
        isMounted && setOwnershipTypes(response.data);
        setLoading(false);
      } catch (err) {
        navigate('/login', { state: { from: location }, replace: true });
      }
    }

    getOwnershipTypes();
    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [])


  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getCategories = async () => {
      try {
        const response = await axiosPrivate.get(equipmentCategoryUrl, {
          signal: controller.signal
        });
        if (response.status === 404) {
          alert('Categories data not found');
        }
        isMounted && setCategories(response.data);
        setLoading(false);
      } catch (err) {
        navigate('/login', { state: { from: location }, replace: true });
      }
    }

    getCategories();
    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [])


  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getCBookingStatuses = async () => {
      try {
        const response = await axiosPrivate.get(equipmentBookingStatusUrl, {
          signal: controller.signal
        });
        if (response.status === 404) {
          alert('Booking statuses data not found');
        }
        isMounted && setBookingStatuses(response.data);
        setLoading(false);
      } catch (err) {
        navigate('/login', { state: { from: location }, replace: true });
      }
    }

    getCBookingStatuses();
    return () => {
      isMounted = false;
      controller.abort();
    }
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
                            setAllowDelete(true);
                            onItemsListDeleteButtonClick(currentFormState, setCurrentFormState, "equipment", allowDelete);
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
                            defaultValue={currentItem?.name}
                            className="form-control"
                            required
                            onChange={(e) => {
                              setCurrentItem({...currentItem,
                                name: e.target.value});
                              setCurrentFormState({...currentFormState, formSaveButtonDisabled: false});
                            }}
                            onClick={() => {
                              resetInvalidInputField("name");
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
                                    aria-label="Equipment category"
                                    id="equipmentCategoryId"
                                    name="equipmentCategoryId"
                                    defaultValue = {
                                      currentItem.equipmentCategory.id > 0
                                        ? currentItem.equipmentCategory.id
                                        : ""
                                    }
                                    onChange={(e) => {
                                      setCurrentItem({...currentItem, equipmentCategory: {...currentItem.equipmentCategory, id: parseInt(e.target.value)} })
                                      setCurrentFormState({...currentFormState, formSaveButtonDisabled: false});
                                    }}
                                    onClick={() => {
                                      resetInvalidInputField("equipmentCategoryId");
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
                              defaultValue={currentItem.sortingId ? currentItem.sortingId : 0}
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
                              defaultValue={currentItem?.notes}
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
                        <label htmlFor="photos">Equipment photo</label>
                        <img
                          id="photos"
                          onClick={() => fileInput.current.click()}
                          src={
                            currentItem.photos !== [] ?
                              imagesFolder + currentItem.photos[0] :
                              equipmentImagePlaceholder} className="img-fluid" alt="Image"/>
                      </div>
                      <div>
                        <div className="mb-1 mt-1">
                          <input ref={fileInput} style={{display: 'none'}} className="form-control" type="file" accept ="image/png, image/jpg, image/jpeg" id="formFile" onChange={selectedFileHandler}/>
                        </div>
                        <Button variant="primary" className="mrx1" onClick={() => fileInput.current.click()}>Pick an image</Button>
                        <Button variant="primary" className="mrx1" onClick={fileUploadHandler}>Upload new image</Button>
                        <Button variant="danger" id="delete-image" onClick={deleteImageLink}><FontAwesomeIcon icon={faTrashAlt}/></Button>
                      </div>
                    </div>
                  </div>
                  <div className="row margin-top">
                    <div className="col-md-5">
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
                                  defaultValue={currentItem?.length ? currentItem.length : 0}
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
                                  defaultValue={currentItem?.width ? currentItem.width : 0}
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
                                  defaultValue={currentItem?.height ? currentItem.height : 0}
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
                                  type="text"
                                  id="area"
                                  name="area"
                                  value={
                                  (currentItem?.length && currentItem?.width) ?
                                    (currentItem.length * currentItem.width) : 0
                                }
                                  className="form-control"
                                  readOnly
                                />
                                <label htmlFor="weight" className="">Weight
                                  (kg)</label>
                                <input
                                  type="number"
                                  min="0"
                                  id="weight"
                                  name="weight"
                                  defaultValue={currentItem?.weight ? currentItem.weight : 0}
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
                                  id="powerRequired"
                                  name="powerRequired"
                                  defaultValue={currentItem?.powerRequired ? currentItem.powerRequired : 0}
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
                    <div className="col-md-2">
                      <div className="card">
                        <div className="card-header">
                          Conditions
                        </div>
                        <div className="card-body">
                          <label htmlFor="staff" className="">Required staff</label>
                          <input
                            type="number"
                            min="0"
                            id="staffNeeded"
                            name="staffNeeded"
                            defaultValue={currentItem?.staffNeeded ? currentItem.staffNeeded : 0}
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
                            id="minimumAge"
                            name="minimumAge"
                            defaultValue={currentItem?.minimumAge ? currentItem.minimumAge : 0}
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
                            id="maxParticipants"
                            name="maxParticipants"
                            defaultValue={currentItem?.maxParticipants ? currentItem.maxParticipants : 0}
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
                            <div className="form-check form-switch">
                              <label htmlFor="in_use" className="form-check-label">In use</label>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="inUse"
                                name="inUse"
                                checked={currentItem.inUse}
                                // defaultChecked={currentItem.inUse}
                                onChange={(e) => {
                                  setCurrentItem({...currentItem,
                                    inUse: e.currentTarget.checked});
                                  setCurrentFormState({...currentFormState, formSaveButtonDisabled: false});
                                }}
                              />
                            </div>
                            <label htmlFor="ownership" className="">Ownership</label>
                            <select className="form-select"
                                    aria-label="Ownership type"
                                    id="equipmentOwnershipId"
                                    name="equipmentOwnershipId"
                                    defaultValue = {
                                      currentItem.equipmentOwnership.id > 0
                                        ? currentItem.equipmentOwnership.id
                                        : ""
                                    }
                                    onChange={(e) => {
                                      setCurrentItem({...currentItem, equipmentOwnership: {...currentItem.equipmentOwnership, id: parseInt(e.target.value)} })
                                      setCurrentFormState({...currentFormState, formSaveButtonDisabled: false});
                                    }}
                                    onClick={() => {
                                      resetInvalidInputField("equipmentOwnershipId");
                                    }}
                            >
                              <option disabled value=""> -- Select Ownership -- </option>
                              {ownershipTypesList.map((e) => (
                                <option key={e.id} value={e.id}>{e.name}</option>))
                              }
                            </select>
                            <label htmlFor="status" className="">Status</label>
                            <select className="form-select"
                                    aria-label="Equipment status"
                                    id="equipmentStatusId"
                                    name="equipmentStatusId"
                                    defaultValue = {
                                      currentItem.equipmentStatus.id > 0
                                        ? currentItem.equipmentStatus.id
                                        : ""
                                    }
                                    onChange={(e) => {
                                      setCurrentItem({...currentItem, equipmentStatus: {...currentItem.equipmentStatus, id: parseInt(e.target.value)} })
                                      setCurrentFormState({...currentFormState, formSaveButtonDisabled: false});
                                    }}
                                    onClick={() => {
                                      resetInvalidInputField("equipmentStatusId");
                                    }}
                            >
                              <option disabled value=""> -- Select Status -- </option>
                              {statusesList.map((e) => (
                                <option key={e.id} value={e.id}>{e.name}</option>))
                              }
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="card">
                        <div className="card-header">
                          Booking status
                        </div>
                        <div className="card-body">
                          <label htmlFor="equipmentBookingStatusId" className="">Current booking status</label>
                          <input
                            disabled
                            type="text"
                            id="equipmentBookingStatusId"
                            name="equipmentBookingStatusId"
                            value={currentItem.bookingStatus.id !== 0 ? bookingStatusesList.find(x => x.id === currentItem.bookingStatus.id).name : ""}
                            className="form-control"
                            readOnly
                            style={{backgroundColor: `${bookingStatusColor}`}}
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
          currentFormState={currentFormState}
          onFormConfirmDeleteButtonClick={onFormConfirmDeleteButtonClick}
          onFormCancelCloseButtonClick={onFormCancelCloseButtonClick}
          onFormCloseWithoutSavingButtonClick={onFormCloseWithoutSavingButtonClick}
          onCloseDetails={onCloseDetails}
          onSubmit={onSaveItem}
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

