import React from 'react';
import Button from "react-bootstrap/Button";
import {clearCurrentItem, onAddDataClick} from "../../../helpers/ComponentHelper";

const AppAddDataButton = (props ) => {

  return (
    <div className="container-fluid">
      <div className="RAM_container">
      <Button className="RAM_button" id="addData"
              onClick={()=>{
                clearCurrentItem(
                  props.props.setCurrentItem,
                  props.props.setBackupItem,
                  props.props.defaultItem);
                onAddDataClick(
                  props.props.currentFormState,
                  props.props.setCurrentFormState,
                  props.props.formDescription,
                  props.props.formHeader);
              }}>
        { props.props.buttonTitle } </Button>
      </div>
    </div>
  );
};

export default AppAddDataButton;
