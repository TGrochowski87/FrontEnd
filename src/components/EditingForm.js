import React, { useState } from "react";
import { Form, InputGroup, Button, FormControl } from "react-bootstrap";
import DatePicker from "react-datepicker";
import AddButton from "./AddButton";
import "react-datepicker/dist/react-datepicker.css";

const AddingForm = ({ loadingData, data }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [formActive, setFormActive] = useState(false);

  const [categoryInput, setCategoryInput] = useState("");
  const [amountInput, setAmountInput] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(startDate.toJSON());

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

  const addHandler = () => {
    setFormActive(true);
  };

  const cancelHandler = () => {
    setFormActive(false);
  };

  if (formActive) {
    return (
      <div className="form-space">
        <Form
          inline
          onSubmit={(event) => {
            submitHandler(event);
            setFormActive(false);
          }}
        >
          {/* <Form.Label htmlFor="inlineFormInputName2" srOnly>
            Category
          </Form.Label>
    
          <Form.Label htmlFor="inlineFormInputGroupUsername2" srOnly>
            Amount
          </Form.Label> */}
          <InputGroup className="mb-2 mr-sm-2">
            <Form.Control
              value={categoryInput}
              onChange={(event) => {
                setCategoryInput(event.target.value);
              }}
              className="mb-2 mr-sm-2"
              id="inlineFormInputName2"
              placeholder="Category"
            />
            <FormControl
              value={amountInput}
              onChange={(event) => {
                setAmountInput(event.target.value);
              }}
              className="mb-2 mr-sm-2"
              id="inlineFormInputGroupUsername2"
              placeholder="Amount"
            />
            <DatePicker
              className="form-control mb-2 mr-sm-2"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            <Button type="submit" className="mb-2 mr-sm-2">
              Submit
            </Button>
            <Button
              type="submit"
              className="mb-2 mr-sm-2"
              onClick={cancelHandler}
            >
              Cancel
            </Button>
          </InputGroup>
        </Form>
      </div>
    );
  }

  return (
    <div className="button-space">
      <AddButton addHandler={addHandler} />
    </div>
  );
};

export default AddingForm;
