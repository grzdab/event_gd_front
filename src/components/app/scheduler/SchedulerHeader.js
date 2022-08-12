import React from 'react';
import SchedulerRows from "./SchedulerRows";

const SchedulerHeader = ({ title }) => {

  // TODO days has to be filled with actual dates

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  let dates = [];
  const setDates = () => {
    let day;
    for (let date=0; date<31; date++) {
      day = day < 6 ? day + 1 : 0;
      dates.push({day: date + 1, name: days[day]})
    }
  }

  setDates();

  return (

    <div className="card-header p-1" style={{backgroundColor: "#26313E", color: "white", display: "flex"}}>
      <div style={{marginRight: "10px", display: "flex", alignItems: "flex-end", width: "10%"}}>Equipment</div>
      {dates.map((date) => {
        return (
          <div key={date.day} style={{color: date.name==="Sun" ? "red" : "white", border: "1px solid #3a4b5f", width: "50px", display: "flex", flexDirection: "column", alignItems: "center"}}>
            <div style={{fontSize: "0.7rem"}}>{date.name}</div>
            <div style={{fontWeight: "400", fontSize: "1.4rem"}}>{date.day}</div>
          </div>
        )
      })
      }
    </div>

  );
};

export default SchedulerHeader;
