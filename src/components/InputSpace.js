import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import AddButton from "./AddButton";
import ExpenseForm from "./ExpenseForm";

const InputSpace = ({
  loadingData,
  inputStatus,
  setInputStatus,
  recordId,
  startDate,
  setStartDate,
  categoryInput,
  setCategoryInput,
  amountInput,
  setAmountInput,
}) => {
  const postHandler = async (event) => {
    event.preventDefault();
    setInputStatus("button");

    fetch("https://webhomebudget.azurewebsites.net/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: startDate.toJSON(),
        categoryId: categoryInput,
        amount: amountInput,
        budgetId: 1,
      }),
    })
      .then(() => {
        loadingData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const putHandler = async (event) => {
    event.preventDefault();
    setInputStatus("button");

    fetch(`https://webhomebudget.azurewebsites.net/api/expenses/${recordId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: startDate.toJSON(),
        categoryId: categoryInput,
        amount: amountInput,
        budgetId: 1,
      }),
    })
      .then(() => {
        loadingData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addHandler = (data) => {
    setInputStatus("add");
  };

  const cancelHandler = () => {
    setStartDate(new Date());
    setCategoryInput("");
    setAmountInput("");
    setInputStatus("button");
  };

  switch (inputStatus) {
    case "add":
      return (
        <div className="form-space">
          <ExpenseForm
            submitHandler={postHandler}
            cancelHandler={cancelHandler}
            startDate={startDate}
            setStartDate={setStartDate}
            categoryInput={categoryInput}
            setCategoryInput={setCategoryInput}
            amountInput={amountInput}
            setAmountInput={setAmountInput}
          />
        </div>
      );
    case "edit":
      return (
        <div className="form-space">
          <ExpenseForm
            submitHandler={putHandler}
            cancelHandler={cancelHandler}
            startDate={startDate}
            setStartDate={setStartDate}
            categoryInput={categoryInput}
            setCategoryInput={setCategoryInput}
            amountInput={amountInput}
            setAmountInput={setAmountInput}
          />
        </div>
      );
    default:
      return (
        <div className="button-space">
          <AddButton addHandler={addHandler} />
        </div>
      );
  }
};

export default InputSpace;
