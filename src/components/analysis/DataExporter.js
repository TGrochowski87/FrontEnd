import React, { useState, useEffect } from 'react';

import {
  Accordion,
  Card,
  Button,
  Form,
  Col,
  ButtonGroup,
  ToggleButton,
} from 'react-bootstrap';

import useFetch from 'use-http';

import { saveAs } from 'file-saver';

import monthNames from './months';

const DataExporter = () => {
  const [period, setPeriod] = useState('month');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [years, setYears] = useState([]);

  const { get: getFile, response: responseFile } = useFetch(
    `https://webhomebudget.azurewebsites.net/api`,
    {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('userToken'),
      },
      cachePolicy: 'no-cache',
      responseType: 'blob',
    }
  );

  const { get: getDate, response: responseDate } = useFetch(
    `https://webhomebudget.azurewebsites.net/api`,
    {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('userToken'),
      },
      cachePolicy: 'no-cache',
    }
  );

  useEffect(() => {
    dataMinMaxGet();
  }, []);

  const dataMinMaxGet = async () => {
    const newData = await getDate('/budget/expenses/properties');
    if (responseDate.ok) {
      const minYear = new Date(newData.minDate).getFullYear();
      const maxYear = new Date(newData.maxDate).getFullYear();
      const newYears = [];
      for (let year = minYear; year <= maxYear; year++) {
        newYears.push(year);
      }
      setYears(newYears);
    }
  };

  const downloadFile = async () => {
    const monthParam = selectedMonth < 10 ? '0' + selectedMonth : selectedMonth;
    const url = `/export?date=01/${monthParam}/${selectedYear}&type=${period}`;
    const data = await getFile(url);
    if (responseFile.ok) {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, 'export.xlsx');
    }
  };

  return (
    <Accordion className='mt-3 data-exporter'>
      <Card>
        <Accordion.Toggle
          as={Card.Header}
          className='p-2'
          variant='link'
          eventKey='0'
        >
          Export data
        </Accordion.Toggle>
        <Accordion.Collapse eventKey='0'>
          <Card.Body className='p-2'>
            <div>Get data from</div>
            <Form className='mb-3'>
              <ButtonGroup toggle className='mb-1'>
                <ToggleButton
                  type='radio'
                  variant='outline-secondary'
                  name='radio'
                  value='month'
                  checked={period === 'month'}
                  onChange={(e) => setPeriod(e.currentTarget.value)}
                >
                  Month only
                </ToggleButton>
                <ToggleButton
                  type='radio'
                  variant='outline-secondary'
                  name='radio'
                  value='year'
                  checked={period === 'year'}
                  onChange={(e) => setPeriod(e.currentTarget.value)}
                >
                  Whole year
                </ToggleButton>
              </ButtonGroup>
              <div>Choose date</div>
              <Form.Row>
                <Col>
                  <Form.Control
                    className='my-1'
                    as='select'
                    size='sm'
                    aria-label='Select month'
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    disabled={period === 'year'}
                  >
                    {monthNames.map((month, index) => {
                      return (
                        <option key={`month-${index}`} value={index + 1}>
                          {month}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Col>
                <Col>
                  <Form.Control
                    className='my-1'
                    as='select'
                    size='sm'
                    aria-label='Select year'
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    {years.map((year, index) => {
                      return (
                        <option key={`year-${index}`} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Col>
              </Form.Row>
            </Form>

            <div className='d-flex justify-content-center'>
              <Button variant='outline-light' onClick={() => downloadFile()}>
                Download
              </Button>
            </div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default DataExporter;
