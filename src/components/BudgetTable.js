import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import AddingForm from "./AddingForm";

const BudgetTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadingData = () => {
    setIsLoading(true);
    fetch(`https://webhomebudget.azurewebsites.net/api/expenses`)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((response) => {
        setData(response);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadingData();
  }, []);

  const deleteHandler = async (id) => {
    fetch(`https://webhomebudget.azurewebsites.net/api/expenses/${id}`, {
      method: "DELETE",
    }).then(() => {
      loadingData();
    });
  };

  return (
    <div className="table-space">
      <Table responsive style={{ marginLeft: "2rem" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td>Loading...</td>
            </tr>
          ) : (
            data.map((record) => {
              let today = new Date(record.date);

              return (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td>{record.category}</td>
                  <td>{record.amount}</td>
                  <td>{today.toLocaleDateString()}</td>
                  <td>
                    <EditButton id={record.id} />
                  </td>
                  <td>
                    <DeleteButton
                      deleteHandler={deleteHandler}
                      id={record.id}
                    />
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
      <div className="form-space">
        <AddingForm loadingData={loadingData} data={data} />
      </div>
    </div>
  );
};

export default BudgetTable;
