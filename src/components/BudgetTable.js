import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import InputSpace from "./InputSpace";

const BudgetTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recordId, setRecordId] = useState(null);

  const [inputStatus, setInputStatus] = useState("button");

  const [startDate, setStartDate] = useState(new Date());
  const [categoryInput, setCategoryInput] = useState("");
  const [amountInput, setAmountInput] = useState("");

  const loadingData = () => {
    setIsLoading(true);
    fetch(`https://webhomebudget.azurewebsites.net/api/expenses`)
      .then((response) => {
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

  const editHandler = (record) => {
    setRecordId(record.id);
    setInputStatus("edit");
    setStartDate(new Date(record.date));
    setCategoryInput(record.categoryId);
    setAmountInput(record.amount);
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
                    <EditButton record={record} editHandler={editHandler} />
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
        <InputSpace
          recordId={recordId}
          loadingData={loadingData}
          inputStatus={inputStatus}
          setInputStatus={setInputStatus}
          startDate={startDate}
          setStartDate={setStartDate}
          categoryInput={categoryInput}
          setCategoryInput={setCategoryInput}
          amountInput={amountInput}
          setAmountInput={setAmountInput}
        />
      </div>
    </div>
  );
};

export default BudgetTable;
