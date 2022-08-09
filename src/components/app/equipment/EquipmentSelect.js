import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons/faExclamationCircle";
import ModalFooter from "../common/ModalFooter";
import { useNavigate, useLocation } from "react-router-dom";
import { defaultFormState } from "../../../defaults/Forms";
import { equipmentDefault } from "../../../defaults/Items";
import {
  onSaveAndClose,
  compareData,
  restoreFormData,
  onItemsListDeleteButtonClick,
  onCloseDetails,
  getItemById, setForegroundColor
} from "../../../helpers/ComponentHelper";

import AppComponentCardHeader from "../common/AppComponentCardHeader";
import LoadingDataDiv from "../common/LoadingDataDiv";
import AppAddDataButton from "../common/AppAddDataButton";
import DeleteWarningModal from "../common/DeleteWarningModal";
import ItemDetailsModalHeader from "../common/ItemDetailsModalHeader";
import TextInput from "../../elements/TextInput";
import TextArea from "../../elements/TextArea";
import Select from "../../elements/Select";
import RelatedItemsList from "../common/RelatedItemsList";
import useCrud from "../../../hooks/useCrud";
import { Table } from "../../table/Table";
import useAxiosPrivateFileUpload from "../../../hooks/useAxiosPrivateFileUpload";
import {useRef} from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {resetInvalidInputField} from "../../../js/CommonHelper";
import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons/faQuestionCircle";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import NumberInput from "../../elements/NumberInput";

const EquipmentSelect = () => {

  const dataUrl ="/equipment";

  // TODO Add events containing specified equipment!!!
  const relatedItemsUrl = "/equipment/events"; // if no need to check it, initialize with null and remove RelatedItemsList from details modal
  const defaultItem = equipmentDefault;
  const itemName = "equipment";
  const itemNames = "equipment";
  const imagesFolder = "/images/equipment_photos/";
  const equipmentImagePlaceholder = "/images/equipment_photos/placeholder.jpg";
  const equipmentCategoryUrl="/equipment-category";
  const equipmentStatusUrl="/equipment-status";
  const equipmentOwnershipUrl="/equipment-ownership";
  const equipmentBookingStatusUrl="/equipment-booking-status";

  const axiosPrivate = useAxiosPrivate();
  const axiosPrivateFileUpload = useAxiosPrivateFileUpload();;

  const navigate = useNavigate();
  const location = useLocation();
  const { createItem, updateItem, deleteItem, getItems, getRelatedChildrenByParentId } = useCrud(dataUrl);

  const [loading, setLoading] = useState(true);
  const [allowDelete, setAllowDelete] = useState(null);
  const [currentFormState, setCurrentFormState] = useState(defaultFormState);
  const [itemsList, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(defaultItem);
  const [backupItem, setBackupItem] = useState(defaultItem);
  const [itemChanged, setItemChanged] = useState(false);
  const [categoriesList, setCategories] = useState([]);
  const [statusesList, setStatuses] = useState([]);
  const [ownershipTypesList, setOwnershipTypes] = useState([]);
  const [bookingStatusesList, setBookingStatuses] = useState([]);
  const [bookingStatusColor, setBookingStatusColor] = useState("#ffffff");
  const [imageFile, setImageFile] = useState(null);
  const [imageName, setImageName] = useState("");
  // elements related to the item
  const [eventsList, setEventsList] = useState([]);

  const fileInput = useRef(null);

  const columns = [
    {label: "Id", accessor: "id", sortable: true, searchable: false},
    {label: "Name", accessor: "name", sortable: true, searchable: true},
    {label: "Notes", accessor: "notes", sortable: true, searchable: true},
    {label: "details", accessor: "editBtn", sortable: false, searchable: false},
    {label: "delete", accessor: "deleteBtn", sortable: false, searchable: false},
  ];

  const state = {
    itemsList, setItems,
    currentItem, setCurrentItem,
    currentFormState, setCurrentFormState,
    defaultItem, backupItem, setBackupItem, itemChanged, setItemChanged,
    setAllowDelete,
    setRelatedItems: null // TODO Add list and change to array in corresponding component
  }

  const onDelete = async () => {
    const response = await deleteItem(`${ dataUrl }/${ currentItem.id }`, currentItem.id, state);
    if (response === 401 || response === 403) {
      navigate('/login', { state: { from: location }, replace: true });
    }
  }

  const deleteImageLink = () => {
    setCurrentItem({...currentItem, photoURI: ""})
  }

  const onSaveItemClick = async (e) => {
    e.preventDefault();
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

    let response;

    if (currentFormState.formAddingDataMode) {
      response = await createItem(dataUrl, item, state);
    } else {
      response = await updateItem(`${ dataUrl }/${ item.id }`, item, state);
    }
    if (response === 401 || response === 403) navigate('/login', { state: { from: location }, replace: true });
    response && onSaveAndClose({state});

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


  const checkRelatedItems = async (id) => {
    const data = await getRelatedChildrenByParentId(`${ relatedItemsUrl }/${ id }`, id, setEventsList);
    data.length === 0 ? setAllowDelete(true) : setAllowDelete(false);
  }

  const onClose = () => {
    onCloseDetails({ state })
  };

  useEffect(() => {
    compareData(currentFormState, setCurrentFormState, currentItem, backupItem);
  }, [itemChanged])

  useEffect(() => {
    if (allowDelete !== null) {
      onItemsListDeleteButtonClick(currentFormState, setCurrentFormState, itemName, allowDelete);
    }
  }, [allowDelete])

  useEffect(() => {
    const getData = async () => {
      const [itemsData, equipmentStatusData, equipmentOwnershipData, equipmentCategoriesData, equipmentBookingStatusData] =
        await Promise.all([
        getItems(dataUrl),
        getItems(equipmentStatusUrl),
        getItems(equipmentOwnershipUrl),
        getItems(equipmentCategoryUrl),
        getItems(equipmentBookingStatusUrl),
      ]);

      const success =
        itemsData.status === 200 &&
        equipmentStatusData.status === 200 &&
        equipmentOwnershipData.status === 200 &&
        equipmentCategoriesData.status === 200 &&
        equipmentBookingStatusData.status === 200;

      if (success) {
        setLoading(false);
        setItems(itemsData.data);
        setStatuses(equipmentStatusData.data);
        setOwnershipTypes(equipmentOwnershipData.data);
        setCategories(equipmentCategoriesData.data);
        setBookingStatuses(equipmentBookingStatusData.data);
      } else {
        navigate('/login', { state: { from: location }, replace: true})
      }

    };
    getData();
  }, [])


  useEffect(() => {
    compareData(currentFormState, setCurrentFormState, currentItem, backupItem);
    if (currentItem.id !== 0) {
      setBookingStatusColor(bookingStatusesList.find(x => x.id === currentItem.bookingStatus.id).color);
    }
  }, [currentItem])



  const addDataButtonProps = {
    setCurrentItem,
    setBackupItem,
    defaultItem,
    currentFormState,
    setCurrentFormState,
    formDescription: `Here you can add new ${ itemName }.`,
    formHeader: `Add new ${ itemName }`,
    buttonTitle: `Add new ${ itemName }`
  }


  let dataSectionContent;
  if (loading) {
    dataSectionContent = <LoadingDataDiv />
  } else if (itemsList.length > 0) {
    dataSectionContent =
      <Table
        rows = { itemsList }
        columns = { columns }
        state = { state }
        checkRelatedItems = { checkRelatedItems }
        formHeader = {`Edit ${ itemName }`}
        relatedItemsUrl = { relatedItemsUrl }
      />
  } else {
    dataSectionContent = <h6>NO DATA FOUND, PLEASE ADD A NEW `${itemName.toUpperCase()}`</h6>
  }


  return (
    <div id="layoutSidenav_content">
      <div className="container-fluid px-4">
        <h1 className="mt-4">{itemNames.toUpperCase()}</h1>
        <AppAddDataButton props ={ addDataButtonProps }/>
        <div className="card mb-4 shadow mb-5 bg-white rounded">
          <AppComponentCardHeader title ={`${itemNames} list`} />
          { dataSectionContent }
        </div>
      </div>

      <DeleteWarningModal
        state = { state }
        onDelete = { onDelete }
        deleteItemName ={ itemName } />
      <Modal
        show={currentFormState.showForm}
        size="xl"
        backdrop="static"
        keyboard={false}
        onHide={onCloseDetails}>
        <ItemDetailsModalHeader title ={ currentFormState.formHeader } />
        <Modal.Body>
          <section className="mb-4">
            <p className="text-center w-responsive mx-auto mb-1 form_test">{ currentFormState.formDescription }</p>
            <div style={{display: "flex", justifyContent: "flex-end"}}>
              <span className="text-center w-responsive mx-auto mb-1 data_changed" id="data-changed"><FontAwesomeIcon icon={faExclamationCircle}/>&nbsp;{ currentFormState.formDataChangedWarning }</span>
              <Button variant="secondary" id="btn-restore" className="btn-restore" onClick={ () => {
                restoreFormData({ state })}}>
                Cancel all changes
              </Button>
            </div>
            <div className="row">
              <div className="col-md-12 mb-md-0 mb-5">
                <form id="add-equipment-form" name="add-equipment-form">
                  <div className="row">
                    <div className="col-md-8">
                      <div className="row">
                        <div className="md-form mb-0">
                          <label htmlFor="name" className="">Equipment name <span className="required">*</span></label>
                          <TextInput propertyName="name" required={true} state={ state }/>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-8">
                          <div className="md-form mb-0">
                            <label htmlFor="equipmentCategory" className="">Category <span className="required">*</span></label>
                            <Select
                              label = "Equipment category"
                              propertyName = "equipmentCategoryId"
                              required = { false }
                              state = { state }
                              itemsList = { categoriesList }
                              itemName = "equipmentCategory"
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="md-form mb-0">
                            Sequence<div className="form_tooltip"><FontAwesomeIcon icon={faQuestionCircle}/><span
                            className="form_tooltip_text">Setting the sequence allows you to control the placement of items in the Scheduler.</span></div>
                            <NumberInput propertyName="sortingId" state = { state } min = "0" max = "255" disabled ={ false } />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="md-form mb-0">
                            <label htmlFor="description"
                                   className="">Description</label>
                            <TextArea propertyName="notes" required={false} rows = "2" state = { state }/>
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
                          src={ currentItem?.id > 0 ?
                            (currentItem.photos !== [] ?
                              imagesFolder + currentItem.photos[0] :
                              equipmentImagePlaceholder) : ""} className="img-fluid" alt="Image"/>
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
                                <NumberInput propertyName="length" state = { state } min = "0" disabled ={ false }/>
                                <label htmlFor="width" className="">Width
                                  (cm)</label>
                                <NumberInput propertyName="width" state = { state } min = "0" disabled ={ false }/>
                                <label htmlFor="height>" className="">Height
                                  (cm)</label>
                                <NumberInput propertyName="height" state = { state } min = "0" disabled ={ false }/>
                              </div>
                              <div className="col-md-6">
                                <label htmlFor="area" className="">Area
                                  (m<sup>2</sup>)</label>
                                <TextInput propertyName="area" state = { state } disabled ={ true } value = {
                                  (currentItem?.length && currentItem?.width) ?
                                    (currentItem.length * currentItem.width) : 0
                                }/>
                                <label htmlFor="weight" className="">Weight
                                  (kg)</label>
                                <NumberInput propertyName="weight" state = { state } min = "0" disabled ={ false }/>
                                <label htmlFor="power>" className="">Power
                                  (kW)</label>
                                <NumberInput propertyName="powerRequired" state = { state } min = "0" disabled ={ false }/>
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
                          <NumberInput propertyName="staffNeeded" state = { state } min = "0" disabled ={ false } />
                          <label htmlFor="minimum_age" className="">Minimum age</label>
                          <NumberInput propertyName="minimumAge" state = { state } min = "0" max = "99" disabled ={ false } />
                          <label htmlFor="max_participants>" className="">Max participants</label>
                          <NumberInput propertyName="maxParticipants" state = { state } min = "0" disabled ={ false } />
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
                            <label htmlFor="equipmentOwnership" className="">Ownership</label>
                            <Select
                              label = "Ownership type"
                              propertyName = "equipmentOwnershipId"
                              required = { false }
                              state = { state }
                              itemsList = { ownershipTypesList }
                              itemName = "equipmentOwnership"
                            />
                            <label htmlFor="equipmentStatus" className="">Status</label>
                            <Select
                              label = "Equipment status"
                              propertyName = "equipmentStatusId"
                              required = { false }
                              state = { state }
                              itemsList = { statusesList }
                              itemName = "equipmentStatus"
                            />
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
                          <input style={{backgroundColor: `${currentItem.bookingStatus.color}`, color: setForegroundColor(currentItem.bookingStatus.color)}}
                            disabled
                            type="text"
                            id="equipmentBookingStatusId"
                            name="equipmentBookingStatusId"
                            value={currentItem.bookingStatus?.id !== 0 ? bookingStatusesList.find(x => x.id === currentItem.bookingStatus.id).name : ""}
                            className="form-control"
                            readOnly
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
          onDelete = { onDelete }
          onCloseDetails = { onClose }
          onSubmit = { onSaveItemClick }
          state = { state }
        />
      </Modal>
    </div>
  )

}

export default EquipmentSelect;