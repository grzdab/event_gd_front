import React, {useEffect, useState, useRef} from 'react';
import '../../../css/Form.css';
import Button from "react-bootstrap/Button";
import {Modal, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
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
import {faEye} from "@fortawesome/free-solid-svg-icons/faEye";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import ModalDeleteWarning from "../layout/ModalDeleteWarning";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";


const Client = () => {

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

  const defaultItem = {
    id: 0,
    login: "",
    firstName: "",
    lastName: ""
  }


  const [loading, setLoading] = useState(true);
  const [allowDelete, setAllowDelete] = useState(true);
  const [currentFormState, setCurrentFormState] = useState(defaultFormState);
  const [itemsList, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(defaultItem);
  const [backupItem, setBackupItem] = useState(defaultItem);
  const [itemChanged, setItemChanged] = useState(false);

  const clientsUrl ="/client";
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getItems = async () => {
      try {
        const response = await axiosPrivate.get(clientsUrl, {
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


  return (
    <div>CLIENTS</div>
  )




};

export default Client;
