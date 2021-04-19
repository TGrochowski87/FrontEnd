import React, { useEffect, useState } from "react";

import { Table, Spinner } from "react-bootstrap";
import { useHistory } from "react-router";

import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import InputSpace from "./InputSpace";

const BudgetTable = ({ setData, filteredData, setFilteredData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [recordId, setRecordId] = useState(null);

  const [inputStatus, setInputStatus] = useState("button");

  const [startDate, setStartDate] = useState(new Date());
  const [categoryInput, setCategoryInput] = useState("");
  const [priceInput, setPriceInput] = useState("");

  const history = useHistory();

  const loadingData = () => {
    setIsLoading(true);
    fetch(`https://webhomebudget.azurewebsites.net/api/expenses`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setData(response);
        setFilteredData(response);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setPriceInput(record.price);
  };

  const recordClickHandler = (event, id) => {
    if (event.target.tagName !== "TD") {
      return;
    }
    history.push(`/expenses/${id}`);
  };

  return (
    <div className="table-space">
      <Table responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Price</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="4" className="loading-cell">
                <Spinner animation="border" />
              </td>
            </tr>
          ) : (
            filteredData.map((record) => {
              let today = new Date(record.date);

              return (
                <tr
                  key={record.id}
                  onClick={(event) => recordClickHandler(event, record.id)}
                >
                  <td>{record.id}</td>
                  <td>{record.category}</td>
                  <td>{record.price}</td>
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
          priceInput={priceInput}
          setPriceInput={setPriceInput}
        />
      </div>
    </div>
  );
};

export default BudgetTable;
