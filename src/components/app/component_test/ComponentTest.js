import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons/faExclamationCircle";
import { compareObjects } from "../../../js/CommonHelper";
import ModalFooter from "./ModalFooter";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { defaultFormState } from "../../../defaults/Forms";
import { ownershipTypeDefault } from "../../../defaults/Items";
import { 
  clearCurrentItem,
  onSaveAndClose,
  compareData,
  restoreFormData,
  onItemsListDeleteButtonClick,
  onCloseDeleteWarningDialog,
  onCloseDetails
} from "../../../helpers/ComponentHelper";

import AppComponentCardHeader from "../common/AppComponentCardHeader";
import LoadingDataDiv from "../common/LoadingDataDiv";
import AppAddDataButton from "../common/AppButtonAddData";
import ItemsTable from "./ItemsTable";
import DeleteWarningModal from "./DeleteWarningModal";
import ItemDetailsModalHeader from "./ItemDetailsModalHeader";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import RelatedItemsList from "./RelatedItemsList";
import useCrud from "./useCrud";


const ComponentTest = () => { 

  const equipmentOwnershipUrl ="/equipment-ownership";
  const equipmentOwnershipRelatedEquipmentUrl = "/equipment/ownership";
  const defaultItem = ownershipTypeDefault;

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isLoading, fetchError, createItem, updateItem } = useCrud(equipmentOwnershipUrl);

  const [loading, setLoading] = useState(true);
  const [allowDelete, setAllowDelete] = useState(null);
  const [currentFormState, setCurrentFormState] = useState(defaultFormState);
  const [itemsList, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(defaultItem);
  const [backupItem, setBackupItem] = useState(defaultItem);
  const [itemChanged, setItemChanged] = useState(false);
  // elements related to the item
  const [equipmentList, setEquipmentList] = useState([]);
  const state = {
    itemsList, setItems,
    currentItem, setCurrentItem,
    currentFormState, setCurrentFormState,
    defaultItem, backupItem, setBackupItem, itemChanged, setItemChanged,
    setAllowDelete
  }


  const deleteItem = async (e) => {
    try { 
      await axiosPrivate.delete(`${ equipmentOwnershipUrl }/${ currentItem.id }`);
      setItems(itemsList.filter((i) => i.id !== currentItem.id));
      onCloseDeleteWarningDialog({ state });
    } catch (err) { 
      console.log(err.message);
    }
  }


  const onSaveItemClick = async (e) => { 
    e.preventDefault();
    if(!currentItem.name) { 
      let nameInput = document.getElementById("name");
      nameInput.classList.add("form-input-invalid");
      nameInput.placeholder = "Ownership type name cannot be empty";
      return;
    }
    let response;
    if (currentFormState.formAddingDataMode) { 
      const item = { id: currentItem.id, name: currentItem.name, description: currentItem.description };
      response = await createItem(equipmentOwnershipUrl, item, state);
    } else { 
      const item = { id: currentItem.id, name: currentItem.name, description: currentItem.description };
      response = await updateItem(`${ equipmentOwnershipUrl }/${ item.id }`, item, state);
    }
    response && onSaveAndClose(setCurrentFormState, currentFormState, setCurrentItem, setBackupItem, defaultItem);
  }


  const getRelatedEquipmentByOwnershipId = async (id) => {
    try {
      const response = await axiosPrivate.get(`${ equipmentOwnershipRelatedEquipmentUrl }/${ id }`);
      setEquipmentList(response.data);
      return response.data;
    } catch (err) {
      navigate('/login', { state: { from: location }, replace: true });
    }
  }


  const checkRelatedEquipment = async (id) => { 
    const data = await getRelatedEquipmentByOwnershipId(id);
    // const data = await getRelatedEquipmentByOwnershipId(equipmentOwnershipRelatedEquipmentUrl, id, setEquipmentList);
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
      onItemsListDeleteButtonClick(currentFormState, setCurrentFormState, "equipment ownership type", allowDelete);
    }
  }, [allowDelete])


  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getItems = async () => {
      try {
        const response = await axiosPrivate.get(equipmentOwnershipUrl, {
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


  const addDataButtonProps = { 
    setCurrentItem,
    setBackupItem,
    defaultItem,
    currentFormState,
    setCurrentFormState,
    formDescription: 'Here you can add new equipment ownership type.',
    formHeader: 'Add new equipment ownership type',
    buttonTitle: 'Add new equipment ownership type'
  }


  let dataSectionContent;
  if (loading) { 
    dataSectionContent = <LoadingDataDiv />
  } else if (itemsList.length > 0) { 
    dataSectionContent =
      <ItemsTable
        itemsList={ itemsList }
        setCurrentItem={ setCurrentItem }
        setBackupItem={ setBackupItem }
        currentFormState={ currentFormState }
        setCurrentFormState={ setCurrentFormState }
        checkRelatedEquipment={ checkRelatedEquipment }
        getRelatedEquipmentByOwnershipId={ getRelatedEquipmentByOwnershipId }/>
  } else {
    dataSectionContent = <h6>NO DATA FOUND, PLEASE ADD A NEW EQUIPMENT OWNERSHIP TYPE</h6>
  }




  return (
    <div id="layoutSidenav_content">
      <div className="container-fluid px-4">
        <h1 className="mt-4">TEST EQUIPMENT OWNERSHIP TYPES</h1>
        <AppAddDataButton props ={ addDataButtonProps }/>
        <div className="card mb-4">
          <AppComponentCardHeader title = "Equipment ownership types list" />
          { dataSectionContent }
        </div>
      </div>
      
      <DeleteWarningModal
        state = { state }
        onDelete = { deleteItem }
        deleteItemName = "ownership type"/>

      <Modal show={ currentFormState.showForm }
             size="xl"
             backdrop="static"
             keyboard={ false }
             onHide={ onClose }>
        <ItemDetailsModalHeader title= "Equipment ownership type details" />
        <Modal.Body>
          <section className="mb-4">
            <h2 className="h1-responsive font-weight-bold text-center my-2">{ currentFormState.formHeader }</h2>
            <p className="text-center w-responsive mx-auto mb-5 form_test">{ currentFormState.formDescription }</p>
            <div>
              <p className="text-center w-responsive mx-auto mb-5 data_changed" id="data-changed"><FontAwesomeIcon icon={ faExclamationCircle }/>&nbsp;{ currentFormState.formDataChangedWarning }</p>
              <Button variant="secondary" id="btn-restore" className="btn-restore" onClick={ () => {
                restoreFormData({ state })}}>
                Restore
              </Button>
            </div>
            <div className="row">
              <div className="col-md-12 mb-md-0 mb-5">
                <form id="add-equipment-ownership-form" name="add-equipment-ownership-form">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="md-form mb-0">
                        <label htmlFor="name" className="">Name</label>
                        <TextInput propertyName="name" required="true" state={ state }/>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="md-form mb-0">
                        <label htmlFor="description" className="">Description</label>
                        <TextArea propertyName="description" required="false" rows = "2" state = { state }/>
                      </div>
                    </div>
                  </div>
                  { !currentFormState.formAddingDataMode &&
                    <RelatedItemsList
                      itemsList = { equipmentList }
                      titleWhenPopulated = "Equipment with this ownership type"
                      titleWhenEmpty = "No equipment found with this ownership type"/>
                  }
                </form>
              </div>
            </div>
          </section>
        </Modal.Body>

        <ModalFooter
          onDelete = { deleteItem }
          onCloseDetails = { onClose }
          onSubmit = { onSaveItemClick }
          state = { state }
        />

      </Modal>
    </div>
  )

 }

export default ComponentTest;