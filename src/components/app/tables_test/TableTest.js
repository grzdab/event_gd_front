import tableData1 from "./tableData1.json";
import categories from "./categories.json";
import Table from "./Table";
import RenderAnotherTable from "./RenderAnotherTable";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import React, {useState, useEffect} from "react";


const columns = [
  { label: "Full Name", accessor: "full_name", sortable: true },
  { label: "Email", accessor: "email", sortable: false },
  { label: "Gender", accessor: "gender", sortable: true, sortbyOrder: "desc" },
  { label: "Age", accessor: "age", sortable: true },
  { label: "Start date", accessor: "start_date", sortable: true },
];



const TableTest = () => {
  const equipmentCategoryUrl ="/equipment-category";
  const axiosPrivate = useAxiosPrivate();
  const columns1 = [
    { label: "Sorting id", accessor: "sortingGroup", sortable: true },
    { label: "Name", accessor: "name", sortable: false },
    { label: "Description", accessor: "description", sortable: true, sortbyOrder: "desc" },
  ];

  const defaultPerson = {
    name: "Grzegorz",
    contact: {
      phone: 1,
      email: "aaa"
    }
  }

  const [itemsList, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(defaultPerson);



  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getItems = async () => {
      try {
        const response = await axiosPrivate.get(equipmentCategoryUrl, {
          signal: controller.signal
        });
        isMounted && setItems(response.data);
        console.log(categories);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getItems();

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [])

  useEffect(() => {
    alert(person.contact.phone);
  }, [person])


  return (
    <>
      <div>
    <button
      onClick={() => {
        setPerson({...person, contact: {...person.contact, phone: person.contact.phone + 1} })
      }}
    >Change</button>
      </div>

    <div className="table_container">
      <h1>Reusable sortable table with React</h1>
      {itemsList?.length ? (
        <Table
          caption="Developers currently enrolled in this course. The table below is ordered (descending) by the Gender column."
          data={itemsList}
          columns={columns1}
        />
      ) : (
        <>LOADING</>
      )
      }
      <br />
      <RenderAnotherTable />
      <br />
    </div>
    </>
  );
};

export default TableTest;
