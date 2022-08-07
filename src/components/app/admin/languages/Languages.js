import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons/faExclamationCircle";
import ModalFooter from "../../common/ModalFooter";
import { useNavigate, useLocation } from "react-router-dom";
import { defaultFormState } from "../../../../defaults/Forms";
import { languageDefault } from "../../../../defaults/Items";
import {
  onSaveAndClose,
  compareData,
  restoreFormData,
  onItemsListDeleteButtonClick,
  onCloseDetails
} from "../../../../helpers/ComponentHelper";

import AppComponentCardHeader from "../../common/AppComponentCardHeader";
import LoadingDataDiv from "../../common/LoadingDataDiv";
import AppAddDataButton from "../../common/AppAddDataButton";
import ItemsTable from "./old_table/ItemsTable";
import DeleteWarningModal from "../../common/DeleteWarningModal";
import ItemDetailsModalHeader from "../../common/ItemDetailsModalHeader";
import TextInput from "../../../elements/TextInput";
import TextArea from "../../../elements/TextArea";
import RelatedItemsList from "../../common/RelatedItemsList";
import useCrud from "../../../../hooks/useCrud";
import { Table } from "./table/Table";

const Languages = () => {

  const dataUrl ="/admin/language";
  const relatedDataUrl = "/equipment/ownership";
  const defaultItem = languageDefault;

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
  // elements related to the item
  const [equipmentList, setEquipmentList] = useState([]);
  const columns = [
    {label: "Id", accessor: "id", sortable: true},
    {label: "Language", accessor: "propertyName", sortable: true},
  ];

  const state = {
    itemsList, setItems,
    currentItem, setCurrentItem,
    currentFormState, setCurrentFormState,
    defaultItem, backupItem, setBackupItem, itemChanged, setItemChanged,
    setAllowDelete,
    setRelatedItems: setEquipmentList
  }

  const onDelete = async () => {
    const response = await deleteItem(`${ dataUrl }/${ currentItem.id }`, currentItem.id, state);
    if (response === 401 || response === 403) {
      navigate('/login', { state: { from: location }, replace: true });
    }
  }

  const onSaveItemClick = async (e) => {
    e.preventDefault();
    if(!currentItem.propertyName) {
      let nameInput = document.getElementById("name");
      nameInput.classList.add("form-input-invalid");
      nameInput.placeholder = "Language name cannot be empty";
      return;
    }
    let response;
    const item = { id: currentItem.id, name: currentItem.propertyName };
    if (currentFormState.formAddingDataMode) {
      response = await createItem(dataUrl, item, state);
    } else {
      response = await updateItem(`${ dataUrl }/${ item.id }`, item, state);
    }
    if (response === 401 || response === 403) navigate('/login', { state: { from: location }, replace: true });
    response && onSaveAndClose({state});
  }

  const checkRelatedItems = async (id) => {
    const data = await getRelatedChildrenByParentId(`${ relatedDataUrl }/${ id }`, id, setEquipmentList);
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
      onItemsListDeleteButtonClick(currentFormState, setCurrentFormState, "language", allowDelete);
    }
  }, [allowDelete])

  useEffect(() => {
    const getData = async () => {
      const response = await getItems(dataUrl);
      if (response.status === 200) {
        setLoading(false);
        setItems(response.data);
      } else if (response.status === 401 || response.status === 403) {
        navigate('/login', { state: { from: location }, replace: true})
      } else {
        alert("Could not get the requested data.");
      }
    };
    getData();
  }, [])


  const addDataButtonProps = {
    setCurrentItem,
    setBackupItem,
    defaultItem,
    currentFormState,
    setCurrentFormState,
    formDescription: 'Here you can add new language.',
    formHeader: 'Add new language',
    buttonTitle: 'Add new language'
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
        formHeader = "Edit language"
      />
  } else {
    dataSectionContent = <h6>NO DATA FOUND, PLEASE ADD A NEW LANGUAGE</h6>
  }

  return (
    <div id="layoutSidenav_content">
      <div className="container-fluid px-4">
        <h1 className="mt-4">TEST LANGUAGES</h1>
        <AppAddDataButton props ={ addDataButtonProps }/>
        <div className="card mb-4">
          <AppComponentCardHeader title = "Languages list" />
          { dataSectionContent }
        </div>
      </div>

      <DeleteWarningModal
        state = { state }
        onDelete = { onDelete }
        deleteItemName = "language"/>

      <Modal show={ currentFormState.showForm }
             size="xl"
             backdrop="static"
             keyboard={ false }
             onHide={ onClose }>
        <ItemDetailsModalHeader title= "Language details" />
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
                <form id="add-language-form" name="add-language-form">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="md-form mb-0">
                        <label htmlFor="name" className="">Name</label>
                        <TextInput propertyName="propertyName" required="true" state={ state }/>
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
                      titleWhenPopulated = "Items using this language"
                      titleWhenEmpty = "No usages found"/>
                  }
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

export default Languages;