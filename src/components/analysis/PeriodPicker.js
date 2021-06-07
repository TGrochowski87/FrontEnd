import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

import monthNames from "./months";

const PeriodPicker = ({ pickMonth, pickYear, onlyYear }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showYear, setShowYear] = useState(false);
  const [monthList, setMonthList] = useState([]);

  useEffect(() => {
    pickMonth && pickMonth(selectedMonth);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonth]);

  useEffect(() => {
    pickYear && pickYear(selectedYear);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear]);

  useEffect(() => {
    onlyYear && onlyYear(showYear);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showYear]);

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const newMonthList = [];

    const currentYearMonths = { year: currentYear, months: [] };
    for (let i = currentMonth; i >= 0; i--) {
      currentYearMonths.months.push({ id: i, name: monthNames[i] });
    }
    newMonthList.push(currentYearMonths);

    if (currentMonth < 11) {
      const pastYear = currentYear - 1;
      const pastYearMonths = { year: pastYear, months: [] };
      for (let i = 11; i > currentMonth; i--) {
        pastYearMonths.months.push({ id: i, name: monthNames[i] });
      }
      newMonthList.push(pastYearMonths);
    }
    setMonthList(newMonthList);
  }, []);

  const handleSelectedMonthChange = (newSelectedMonth) => {
    if (parseInt(newSelectedMonth) <= new Date().getMonth() + 1) {
      setSelectedYear(new Date().getFullYear());
    } else {
      setSelectedYear(new Date().getFullYear() - 1);
    }
    setSelectedMonth(newSelectedMonth);
  };

  const handleShowYearChange = (isSelected) => {
    setShowYear(isSelected);
  };

  return (
    <div>
      <Form>
        <Row>
          <Col>
            <Form.Check
              type="checkbox"
              id="year-checkbox"
              label="Show year"
              onChange={(e) => handleShowYearChange(e.target.checked)}
            />
          </Col>
          <Col>
            <Form.Control
              as="select"
              size="sm"
              aria-label="Select month"
              value={selectedMonth}
              onChange={(e) => handleSelectedMonthChange(e.target.value)}
              disabled={showYear}
            >
              {monthList.map((year) => {
                return (
                  <optgroup key={year.year} label={year.year}>
                    {year.months.map((month) => {
                      return (
                        <option key={month.id} value={month.id + 1}>
                          {month.name}
                        </option>
                      );
                    })}
                  </optgroup>
                );
              })}
            </Form.Control>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default PeriodPicker;
