import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  FormControl,
} from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import Slider from "@material-ui/core/Slider";
import DatePicker from "react-datepicker";

function valuetext(value) {
  return `${value}°C`;
}

const FilterPanel = ({
  isScrolled,
  categories,
  expenses,
  setFilteredExpenses,
}) => {
  const [filterTabStatus, setFilterTabStatus] = useState(false);

  const [category, setCategory] = useState([]);
  const [price, setPrice] = useState([0.0, 10000.0]);
  const [date, setDate] = useState([new Date(2021, 1, 1), new Date()]);

  const [categoryFilterActive, setCategoryFilterActive] = useState(false);
  const [priceFilterActive, setPriceFilterActive] = useState(false);
  const [userFilterActive, setUserFilterActive] = useState(false);
  const [dateFilterActive, setDateFilterActive] = useState(false);

  useEffect(() => {
    if (expenses === undefined) {
      return;
    }

    let newArray = [];

    for (let record of expenses) {
      if (categoryFilterActive && category.length !== 0) {
        if (record.category !== category[0]) {
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

    setFilteredExpenses(newArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    category,
    price,
    date,
    categoryFilterActive,
    priceFilterActive,
    dateFilterActive,
    expenses,
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

      <Container className="filter-panel">
        <Form.Group>
          <Row style={{ marginTop: "1rem" }}>
            <Form.Label>
              Categories
              <input
                type="checkbox"
                checked={categoryFilterActive}
                onChange={(event) => {
                  setCategoryFilterActive(event.target.checked);
                }}
              />
            </Form.Label>
          </Row>
          <Row>
            <Col>
              <Typeahead
                id="basic-typeahead-single"
                labelKey="name"
                onChange={setCategory}
                options={categories.map((cat) => cat.name)}
                placeholder="Choose a category"
                selected={category}
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group>
          <Row>
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
          </Row>
          <Row>
            <Col xs={3} style={{ padding: "0 1rem", textAlign: "right" }}>
              <Form.Control
                className="slider-side-input"
                type="number"
                value={price[0]}
                onChange={(event) => setPrice([event.target.value, price[1]])}
              />
            </Col>
            <Col xs={6}></Col>
            <Col xs={3} style={{ padding: "0 1rem", textAlign: "left" }}>
              <Form.Control
                className="slider-side-input"
                type="number"
                value={price[1]}
                onChange={(event) => setPrice([price[0], event.target.value])}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={2}></Col>
            <Col xs={8}>
              <Slider
                className="slider"
                min={0.0}
                max={1000}
                value={price}
                onChange={(event, newValue) => {
                  setPrice([newValue[0], newValue[1]]);
                }}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
              />
            </Col>
            <Col xs={2}></Col>
          </Row>
        </Form.Group>

        <Form.Group>
          <Row>
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
          </Row>
          <Row>
            <Col>
              <Typeahead
                id="basic-typeahead-single"
                labelKey="name"
                onChange={setCategory}
                options={categories}
                placeholder="Choose a category"
                selected={category}
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group>
          <Row>
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
          </Row>
          <Row>
            <Col xs={3} style={{ padding: "0 0.6rem", textAlign: "right" }}>
              <DatePicker
                as={FormControl}
                className="form-control slider-side-input"
                id="inputDateFrom"
                name="inputDate"
                onChange={(newDate) => {
                  setDate([newDate, date[1]]);
                }}
                selected={date[0]}
              />
            </Col>
            <Col xs={6}></Col>
            <Col xs={3} style={{ padding: "0 0.6rem", textAlign: "left" }}>
              <DatePicker
                as={FormControl}
                className="form-control slider-side-input"
                id="inputDateTo"
                name="inputDate"
                onChange={(newDate) => {
                  setDate([date[0], newDate]);
                }}
                selected={date[1]}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={2}></Col>
            <Col xs={8}>
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
            </Col>
            <Col xs={2}></Col>
          </Row>
        </Form.Group>

        <Row style={{ textAlign: "center", marginTop: "3rem" }}>
          <Col>
            <Form.Group>
              <Button onClick={clearHandler}>Clear filters</Button>
            </Form.Group>
          </Col>
        </Row>
      </Container>
      {/* <div className="filter-panel">
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
      </div> */}
    </div>
  );
};

export default FilterPanel;
