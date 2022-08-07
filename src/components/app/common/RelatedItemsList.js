import React from 'react';

const RelatedItemsList = ({itemsList, titleWhenPopulated, titleWhenEmpty }) => {

  const listContent =
    <>
      {itemsList.map((item) => (
        <div key={item.id}>
          {item.name}
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
