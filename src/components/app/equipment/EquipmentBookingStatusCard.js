import React from 'react';
import {setForegroundColor} from "../../../helpers/ComponentHelper";

const EquipmentBookingStatusCard = ({ state, bookingStatusesList }) => {

  const currentItem = state.currentItem;

  return (
    <>
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
    </>
  );
};

export default EquipmentBookingStatusCard;
