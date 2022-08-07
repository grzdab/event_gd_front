import React from 'react';
import {Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons/faExclamationCircle";
import Button from "react-bootstrap/Button";
import {
  onFormCancelCloseButtonClick,
  onFormCancelDeleteButtonClick, onFormCloseWithoutSavingButtonClick,
  onFormConfirmDeleteButtonClick,
  restoreFormData
} from "../../../../helpers/ComponentHelper";
import {resetInvalidInputField} from "../../../../js/CommonHelper";
import {HexColorPicker} from "react-colorful";
import ModalFooter from "../../../layout/ModalFooter";
import ItemDetailsModalHeader from "../../common/ItemDetailsModalHeader";
import TextInput from "../../../elements/TextInput";
import TextArea from "../../../elements/TextArea";
import RelatedItemsList from "../../common/RelatedItemsList";

const EBSModal = () => {
  return (
    <>
      <Modal show={currentFormState.showForm}
             size="xl"
             backdrop="static"
             keyboard={false}
             onHide={ onClose }>
        <ItemDetailsModalHeader title ={`${itemName} details`} />
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
                <form id="add-equipment-booking-status-form" name="add-equipment-booking-status-form">
                  <div className="row">
                    <div className="col-md-9">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="md-form mb-0">
                            <label htmlFor="name" className="">Name</label>
                            <TextInput style={{backgroundColor: currentItem.color}} propertyName="name" required="true" state={ state }/>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="md-form mb-0">
                            <label htmlFor="description" className="">Description</label>
                            <TextArea propertyName="description" required="false" rows = "2" state = { state }/>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="row">
                        <div>Booking Status Color
                          <HexColorPicker
                            style={{width: "100%"}}
                            color={currentItem?.id > 0 ? currentItem.color : equipmentBookingStatusColor}
                            onChange={changeColor}/>
                        </div>
                      </div>
                    </div>
                  </div>
                  { !currentFormState.formAddingDataMode &&
                    <RelatedItemsList
                      itemsList = { equipmentList }
                      titleWhenPopulated ={`Items using this ${ itemName }`}
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
    </>
  );
};

export default EBSModal;
