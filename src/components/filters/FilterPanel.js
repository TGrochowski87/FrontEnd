import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import Slider from "@material-ui/core/Slider";

function valuetext(value) {
  return `${value}°C`;
}

const FilterPanel = ({
  filterTabStatus,
  setFilterTabStatus,
  isScrolled,
  categories,
  data,
  setFilteredData,
}) => {
  const [category, setCategory] = useState([]);
  const [price, setPrice] = useState([0.0, 10000.0]);
  const [date, setDate] = useState([new Date(2021, 1, 1), new Date()]);

  const [categoryFilterActive, setCategoryFilterActive] = useState(false);
  const [priceFilterActive, setPriceFilterActive] = useState(false);
  const [userFilterActive, setUserFilterActive] = useState(false);
  const [dateFilterActive, setDateFilterActive] = useState(false);

  useEffect(() => {
    if (data === undefined) {
      return;
    }

    let newArray = [];

    for (let record of data) {
      if (categoryFilterActive && category !== undefined) {
        if (record.category.name !== category) {
          continue;
        }
      }

      if (priceFilterActive) {
        if (record.price < price[0] || record.price > price[1]) {
          continue;
        }
      }

      // if(userFilterActive && user !== undefined){
      //   if(record.user !== user){
      //     continue;
      //   }
      // }

      if (dateFilterActive) {
        let recordDate = new Date(record.date).getTime();
        if (recordDate < date[0].getTime() || recordDate > date[1].getTime()) {
          continue;
        }
      }

      newArray.push(record);
    }

    setFilteredData(newArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    category,
    price,
    date,
    categoryFilterActive,
    priceFilterActive,
    dateFilterActive,
    data,
  ]);

  const clearHandler = () => {
    setCategoryFilterActive(false);
    setPriceFilterActive(false);
    setUserFilterActive(false);
    setDateFilterActive(false);

    setCategory([]);
    setPrice([0.0, 10000.0]);
    //setUser()
    setDate([new Date(2021, 1, 1), new Date()]);
  };

  return (
    <div
      className={`filter-space ${filterTabStatus ? "tab-active" : ""} ${
        isScrolled ? "scrolled" : ""
      }`}
    >
      <div
        className="panel-name"
        onClick={() => {
          setFilterTabStatus(!filterTabStatus);
        }}
      >
        <p>FILTER</p>
      </div>

      <div className="filter-panel">
        <Form.Group>
          <Form.Label>
            Categories{" "}
            <input
              type="checkbox"
              checked={categoryFilterActive}
              onChange={(event) => {
                setCategoryFilterActive(event.target.checked);
              }}
            />
          </Form.Label>
          <Typeahead
            id="basic-typeahead-single"
            labelKey="name"
            onChange={setCategory}
            options={categories.map((cat) => cat.name)}
            placeholder="Choose a category"
            selected={category}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>
            Price
            <input
              type="checkbox"
              checked={priceFilterActive}
              onChange={(event) => {
                setPriceFilterActive(event.target.checked);
              }}
            />
          </Form.Label>
          <div className="slider-space">
            <p>{price[0]}</p>
            <Slider
              className="slider"
              min={0.0}
              max={10000.0}
              value={price}
              onChange={(event, newValue) => {
                setPrice([newValue[0], newValue[1]]);
              }}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
            />
            <p>{price[1]}</p>
          </div>
        </Form.Group>

        <Form.Group>
          <Form.Label>
            User
            <input
              type="checkbox"
              checked={userFilterActive}
              onChange={(event) => {
                setUserFilterActive(event.target.checked);
              }}
            />
          </Form.Label>
          <Typeahead
            id="basic-typeahead-single"
            labelKey="name"
            onChange={setCategory}
            options={categories}
            placeholder="Choose a category"
            selected={category}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>
            Date
            <input
              type="checkbox"
              checked={dateFilterActive}
              onChange={(event) => {
                setDateFilterActive(event.target.checked);
              }}
            />
          </Form.Label>
          <div className="slider-space">
            <p>{date[0].toLocaleDateString().toString()}</p>
            <Slider
              className="slider"
              min={new Date(2021, 1, 1).getTime()}
              max={new Date().getTime()}
              value={[date[0].getTime(), date[1].getTime()]}
              onChange={(event, newValue) => {
                setDate([new Date(newValue[0]), new Date(newValue[1])]);
              }}
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
            />
            <p>{date[1].toLocaleDateString().toString()}</p>
          </div>
        </Form.Group>

        <Form.Group>
          <Button onClick={clearHandler}>Clear filters</Button>
        </Form.Group>
      </div>
    </div>
  );
};

export default FilterPanel;
