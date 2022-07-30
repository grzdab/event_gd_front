import {compareObjects} from "../js/CommonHelper";
import useAxiosPrivate from "../hooks/useAxiosPrivate";


export const delay = (time) => {
    return new Promise(r => setTimeout(r, time));
}

export const addItem = async (item, url, setItems, itemsList) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(item)
    });
    const data = await response.json();
    setItems([...itemsList, data]);
}

export const updateItem = async (item, currentItem, url, setItems, itemsList) => {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(currentItem)
    });
    const data = await response.json();
    setItems(
        itemsList.map((i) =>
            i.id === item.id ? data : i));
}

export const deleteItem = async (id, url, setItems, itemsList) => {
    await fetch(url, {method: 'DELETE',});
    setItems(itemsList.filter((i) => i.id !== id));
}

export const onSaveAndClose = (setCurrentFormState, currentFormState, setCurrentItem, setBackupItem, defaultItem) => {
    setCurrentFormState({...currentFormState,
        showForm: false,
        formSaveButtonDisabled: true,
        formAddingDataMode: false
    })
    clearCurrentItem(setCurrentItem, setBackupItem, defaultItem);
}

export const clearCurrentItem = (setCurrentItem, setBackupItem, defaultItem) => {
    setCurrentItem(defaultItem);
    setBackupItem(defaultItem);
}

export const onAddDataClick = (currentFormState, setCurrentFormState, formDescription, formHeader) => {
  setCurrentFormState({...currentFormState,
    formDescription: formDescription,
    formHeader: formHeader,
    formAddingDataMode: true,
    formSaveButtonDisabled: false,
    showForm: true})
}

export const onFormCancelCloseButtonClick = () => {
    let closeWithoutSaving = document.getElementById("confirm-close");
    let btnClose = document.getElementById("btn-close");
    closeWithoutSaving.classList.remove("div-visible");
    btnClose.classList.remove("btn-invisible");
}

export const onFormCancelDeleteButtonClick = () =>  {
    document.getElementById("confirm-delete").classList.add("div-hidden");
    document.getElementById("btn-delete").classList.remove("btn-invisible");
}

export const onFormConfirmDeleteButtonClick = () =>  {
    document.getElementById("confirm-delete").classList.remove("div-hidden");
    document.getElementById("btn-delete").classList.add("btn-invisible");
}

export const onItemsListInfoButtonClick = (currentFormState, setCurrentFormState, formHeader) => {

    setCurrentFormState({...currentFormState,
        formAddingDataMode: false,
        formHeader: formHeader,
        formDescription: "",
        formSaveButtonDisabled: true,
        showForm: true})
}

export const compareData = (currentFormState, setCurrentFormState, currentItem, backupItem) => {
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

export const onFormCloseWithoutSavingButtonClick = (currentFormState, setCurrentFormState, setCurrentItem, setBackupItem, defaultItem) => {
    setCurrentFormState({
        ...currentFormState,
        showForm: false,
        formSaveButtonDisabled: true,
        formAddingDataMode: false
    })
    clearCurrentItem(setCurrentItem, setBackupItem, defaultItem);
}

export const getRelatedItemsByParentId = async (url, setItemsList) => {
    const response = await fetch(url);
    const data = await response.json();
    setItemsList(data);
    return data;

}

export const restoreFormData = (backupItem, setCurrentItem, currentFormState, setCurrentFormState) =>  {
    setCurrentItem(backupItem);
    for (let key in backupItem) {
        if (backupItem.hasOwnProperty(key)) {
            let element = document.getElementById(key);
            if (element) {
                element.value = backupItem[key]
            }
        }
    }

    let dataChangedInfo = document.getElementById("data-changed");
    let btnRestore = document.getElementById("btn-restore");
    let confirmClose = document.getElementById("confirm-close");
    let btnClose = document.getElementById("btn-close");
    dataChangedInfo.classList.remove("visible");
    btnRestore.classList.remove("visible");
    confirmClose.classList.remove("div-visible");
    btnClose.classList.remove("btn-invisible");

    setCurrentFormState({
        ...currentFormState,
        formSaveButtonDisabled: true,
    });
}

export const onItemsListDeleteButtonClick = (currentFormState, setCurrentFormState, itemName, allowDelete) =>  {
    console.log(allowDelete);
    if (allowDelete) {
        setCurrentFormState({...currentFormState,
            showDeleteWarning: true,
            warningDescription: "Are you sure, you want to delete this " + itemName +"? This action cannot be undone!",
            warningDeleteButtonDisabled: false,
            warningWarningIconVisible: false})
    } else {
        setCurrentFormState({...currentFormState,
            showDeleteWarning: true,
            warningDescription: "Cannot delete this " + itemName +", because there are items related to it.",
            warningDeleteButtonDisabled: true,
            warningWarningIconVisible: true
        })

    }
}

export const getItems = async (url, setItems) => {

    const response = await fetch(url);
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

export const numberFilter = () => {



}
