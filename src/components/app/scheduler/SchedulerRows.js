import React from 'react';

const SchedulerRows = ({ itemsList }) => {

  console.log(itemsList);

  let dates = [];
  const setDates = () => {
    for (let date=1; date<32; date++) {
      dates.push({day: date})
    }
  }

  setDates();

  return (
    <div>
      <div className="p-1" style={{backgroundColor: "#ffffff", color: "black", display: "flex", flexDirection: "column"}}>
        {itemsList.map((item) => {
          return (
            <div style={{display: "flex"}}>
              <div style={{marginRight: "10px", display: "flex", alignItems: "flex-end", width: "10%", height: "50px", border: "1px solid white"}}>{item.name}</div>
              {dates.map((date) => {
                return (
                  <div key={date.day} style={{color: date.name==="Sun" ? "red" : "white", border: "1px solid #eff2f5", width: "50px", display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <div style={{fontSize: "0.7rem"}}>{date.name}</div>
                    <div style={{fontWeight: "400", fontSize: "1.4rem"}}>{date.day}</div>
                  </div>
                )})}
            </div>
          )})}


      </div>
    </div>
  );
};

export default SchedulerRows;
