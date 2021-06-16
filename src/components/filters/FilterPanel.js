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
import useFetch from "use-http";

function valuetext(value) {
  return `${value}°C`;
}

const FilterPanel = ({ expenses, setFilteredExpenses }) => {
  const [scrollY, setScrollY] = useState(window.scrollY);

  const [filterTabStatus, setFilterTabStatus] = useState(false);

  const [filterCategory, setFilterCategory] = useState([]);
  const [filterUser, setFilterUser] = useState([]);
  const [filterPrice, setFilterPrice] = useState([0.0, 10000.0]);
  const [filterDate, setFilterDate] = useState([
    new Date(2021, 1, 1),
    new Date(),
  ]);

  const [categoryFilterActive, setCategoryFilterActive] = useState(false);
  const [priceFilterActive, setPriceFilterActive] = useState(false);
  const [userFilterActive, setUserFilterActive] = useState(false);
  const [dateFilterActive, setDateFilterActive] = useState(false);

  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [filterProperties, setFilterProperties] = useState({
    maxPrice: 0,
    minDate: new Date(2021, 1, 1),
    maxDate: new Date(),
  });

  window.addEventListener("scroll", (event) => {
    setScrollY(window.scrollY);
  });

  const { get } = useFetch(`https://webhomebudget.azurewebsites.net/api`, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("userToken"),
    },
    cachePolicy: "no-cache",
  });

  const categoryGet = async () => {
    await get("/category/expense/notarchived").then((response) => {
      setCategories(response.map((cat) => cat.name));
    });
  };

  const userGet = async () => {
    await get("/users").then((response) => {
      setUsers(response.map((user) => user.data.name));
    });
  };

  const getProperties = async () => {
    await get("/budget/expenses/properties").then((response) => {
      console.log(response);
      setFilterProperties({
        maxPrice: response.maxPrice,
        maxDate: new Date(response.maxDate),
        minDate: new Date(response.minDate),
      });
    });
  };

  useEffect(() => {
    setFilterPrice([0.0, filterProperties.maxPrice]);
    setFilterDate([filterProperties.minDate, filterProperties.maxDate]);
  }, [filterProperties]);

  useEffect(() => {
    categoryGet();
    userGet();

    if (expenses.length > 0) {
      getProperties();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expenses]);

  useEffect(() => {
    if (expenses === undefined) {
      return;
    }

    let newArray = [...expenses];

    if (categoryFilterActive) {
      newArray = newArray.filter(
        (record) => record.category === filterCategory[0]
      );
    }
    if (priceFilterActive) {
      newArray = newArray.filter(
        (record) =>
          record.price >= filterPrice[0] && record.price <= filterPrice[1]
      );
    }
    if (userFilterActive) {
      newArray = newArray.filter((record) => record.user === filterUser[0]);
    }
    if (dateFilterActive) {
      newArray = newArray.filter(
        (record) =>
          new Date(record.date) >= filterDate[0] &&
          new Date(record.date) <= filterDate[1]
      );
    }

    setFilteredExpenses(newArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filterCategory,
    filterPrice,
    filterDate,
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

    setFilterCategory([]);
    setFilterUser([]);
    setFilterPrice([0.0, filterProperties.maxPrice]);
    setFilterDate([filterProperties.minDate, filterProperties.maxDate]);
  };

  return (
    <div
      className={`filter-space ${filterTabStatus ? "tab-active" : ""} ${
        scrollY > 66.357 ? "" : "at-top"
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
                onChange={setFilterCategory}
                options={categories}
                placeholder="Choose a category"
                selected={filterCategory}
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
                value={filterPrice[0]}
                onChange={(event) => {
                  if (event.target.value < 0.0) {
                    setFilterPrice([0.0, filterPrice[1]]);
                  } else if (event.target.value > filterProperties.maxPrice) {
                    setFilterPrice([filterProperties.maxPrice, filterPrice[1]]);
                  } else {
                    setFilterPrice([event.target.value, filterPrice[1]]);
                  }
                }}
              />
            </Col>
            <Col xs={6}></Col>
            <Col xs={3} style={{ padding: "0 1rem", textAlign: "left" }}>
              <Form.Control
                className="slider-side-input"
                type="number"
                value={filterPrice[1]}
                onChange={(event) => {
                  if (event.target.value < 0.0) {
                    setFilterPrice([filterPrice[0], 0.0]);
                  } else if (event.target.value > filterProperties.maxPrice) {
                    setFilterPrice([filterPrice[0], filterProperties.maxPrice]);
                  } else {
                    setFilterPrice([filterPrice[0], event.target.value]);
                  }
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={2}></Col>
            <Col xs={8}>
              <Slider
                className="slider"
                min={0.0}
                max={filterProperties.maxPrice}
                value={filterPrice}
                onChange={(event, newValue) => {
                  setFilterPrice([newValue[0], newValue[1]]);
                }}
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
                onChange={setFilterUser}
                options={users}
                placeholder="Choose an entry creator"
                selected={filterUser}
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
                popperPlacement="top-start"
                closeOnScroll={true}
                minDate={filterProperties.minDate}
                maxDate={filterProperties.maxDate}
                as={FormControl}
                className="form-control slider-side-input"
                id="inputDateFrom"
                name="inputDate"
                onChange={(newDate) => {
                  if (newDate < filterProperties.minDate) {
                    setFilterDate([filterProperties.minDate, filterDate[1]]);
                  } else if (newDate > filterProperties.maxDate) {
                    setFilterDate([filterProperties.maxDate, filterDate[1]]);
                  } else {
                    setFilterDate([newDate, filterDate[1]]);
                  }
                }}
                selected={filterDate[0]}
              />
            </Col>
            <Col xs={6}></Col>
            <Col xs={3} style={{ padding: "0 0.6rem", textAlign: "left" }}>
              <DatePicker
                popperPlacement="top-end"
                closeOnScroll={true}
                minDate={filterProperties.minDate}
                maxDate={filterProperties.maxDate}
                as={FormControl}
                className="form-control slider-side-input"
                id="inputDateTo"
                name="inputDate"
                onChange={(newDate) => {
                  if (newDate < filterProperties.minDate) {
                    setFilterDate([filterDate[0], filterProperties.minDate]);
                  } else if (newDate > filterProperties.maxDate) {
                    setFilterDate([filterDate[0], filterProperties.maxDate]);
                  } else {
                    setFilterDate([filterDate[0], newDate]);
                  }
                }}
                selected={filterDate[1]}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={2}></Col>
            <Col xs={8}>
              <Slider
                className="slider"
                min={filterProperties.minDate.getTime()}
                max={filterProperties.maxDate.getTime()}
                value={[filterDate[0].getTime(), filterDate[1].getTime()]}
                onChange={(event, newValue) => {
                  setFilterDate([new Date(newValue[0]), new Date(newValue[1])]);
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
    </div>
  );
};

export default FilterPanel;
