import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useFetch from "use-http";

const CustomLineChart = ({ month, year, onlyYear }) => {
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [data, setData] = useState([]);

  const { get, response } = useFetch(
    `https://webhomebudget.azurewebsites.net/api`,
    {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("userToken"),
      },
      cachePolicy: "no-cache",
    }
  );

  const generateUrl = (type) => {
    const monthParam = month < 10 ? "0" + month : month;
    const yearParam = year;
    const chartForParam = type;
    const periodParam = onlyYear ? "yearly" : "monthly";

    let url = `/analysis/${chartForParam}/${periodParam}`;
    if (periodParam === "monthly") {
      url += `?date=01/${monthParam}/${yearParam}`;
    }

    return url;
  };

  const getExpenseData = async () => {
    const newData = await get(generateUrl("expense"));

    if (!newData || newData?.length === 0) {
      setData([]);
      return;
    }

    if (response.ok) {
      setExpenseData(newData);
    }
  };

  const getIncomeData = async (dataWithExpense) => {
    const newData = await get(generateUrl("income"));

    if (!newData || newData?.length === 0) {
      setData([]);
      return;
    }

    if (response.ok) {
      setIncomeData(newData);
    }
  };

  const configureData = async () => {
    let sumExpense = 0;
    let sumIncome = 0;
    const configuredData = expenseData.map((record, index) => {
      sumExpense += record.sumByDate;
      sumIncome += incomeData[index].sumByDate;

      return {
        name: index + 1,
        expense: sumExpense,
        income: sumIncome,
      };
    });

    setData(configuredData);
  };

  useEffect(() => {
    if (incomeData?.length !== 0 && expenseData?.length !== 0) {
      configureData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incomeData, expenseData]);

  useEffect(() => {
    const loadData = async () => {
      await getExpenseData();
      await getIncomeData();
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, year, onlyYear]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "500px" }}
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
        minHeight="100"
        minWidth="100"
      >
        <LineChart data={data} width="100%" height="100%">
          <CartesianGrid
            strokeDasharray="5 5"
            fill="#373C47"
            vertical={false}
          />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            formatter={(value) => {
              return `${value.toFixed(2)} $`;
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="income" stroke="#68E255" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
