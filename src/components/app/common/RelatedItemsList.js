import React from 'react';

const RelatedItemsList = ({itemsList, titleWhenPopulated, titleWhenEmpty, itemProperties }) => {

  const listDetails = (item) => {
    let properties = "";
    for (const property of itemProperties) {
      properties = properties + item[property] + " "
    }
    return properties;
  }

  const listContent =
    <>
      {itemsList.map((item) => (
        <div key={item.id}>
          { listDetails(item) }
        </div>
      ))}
    </>

  const listTitle = itemsList.length > 0 ? titleWhenPopulated : titleWhenEmpty

  return (
    <>
      <div className="row margin-top">
        <div className="col-md-12">
          <div className="md-form mb-0">
            <div className="card">
              <div className="card-header">
                { listTitle }
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    { listContent }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RelatedItemsList;
