import React from 'react';
import {setForegroundColor} from "../../../helpers/ComponentHelper";

const EquipmentBookingStatusCard = ({ state, bookingStatusesList }) => {

  const currentItem = state.currentItem;
  const value = currentItem.bookingStatus?.id !== 0 ?
    bookingStatusesList.find(x => x.id === currentItem.bookingStatus.id).name :
    bookingStatusesList.find(x => x.defaultSetting === true).name;
  const backgroundColor = currentItem.bookingStatus?.id !== 0 ?
    bookingStatusesList.find(x => x.id === currentItem.bookingStatus.id).color :
    bookingStatusesList.find(x => x.defaultSetting === true).color;

  return (
    <>
      <div className="card-header">
        Booking status
      </div>
      <div className="card-body">
        <label htmlFor="equipmentBookingStatusId" className="">Current booking status</label>
        <input style={{backgroundColor: `${backgroundColor}`}}
               disabled
               type="text"
               id="equipmentBookingStatusId"
               name="equipmentBookingStatusId"
               value={ value }
               className="form-control"
               readOnly
        />
      </div>
    </>
  );
};

export default EquipmentBookingStatusCard;
