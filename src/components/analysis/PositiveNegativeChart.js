import React, { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";
import useFetch from "use-http";

import months from "./months";

const PositiveNegativeChart = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [differenceData, setDifferenceData] = useState([]);
  const [maxAbsValue, setMaxAbsValue] = useState(0);

  const { get, response } = useFetch(
    `https://webhomebudget.azurewebsites.net/api/analysis`,
    {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("userToken"),
      },
      cachePolicy: "no-cache",
    }
  );

  const expenseAnalysisGet = async () => {
    const data = await get("/expense/yearly");

    if (response.ok) {
      setExpenseData(data);
    }
  };

  const incomeAnalysisGet = async () => {
    const data = await get("/income/yearly");

    if (response.ok) {
      setIncomeData(data);
    }
  };

  const calculateDifference = async () => {
    const newDifferenceData = incomeData.map((data, index) => {
      return {
        date: months[new Date(data.date).getMonth()].substring(0, 3),
        balance: data.sumByDate - expenseData[index].sumByDate,
      };
    });

    setDifferenceData(newDifferenceData);
  };

  useEffect(() => {
    const setData = async () => {
      await expenseAnalysisGet();
      await incomeAnalysisGet();
    };
    setData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (incomeData?.length !== 0 && expenseData?.length !== 0) {
      calculateDifference();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incomeData, expenseData]);

  useEffect(() => {
    if (differenceData?.length !== 0) {
      let newMax = 0;

      differenceData.forEach((data) => {
        if (Math.abs(data.balance) > newMax) {
          newMax = Math.abs(data.balance);
        }
      });

      setMaxAbsValue(Math.round(newMax + 0.1 * newMax));
    }
  }, [differenceData]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "500px" }}
    >
      <ResponsiveContainer>
        <BarChart data={differenceData} maxBarSize={100}>
          <CartesianGrid strokeDasharray="3 3" fill="#373C47" />
          <XAxis dataKey="date" />
          <YAxis type="number" domain={[-maxAbsValue, maxAbsValue]} />
          <Tooltip
            formatter={(value) => {
              return `${value.toFixed(2)} $`;
            }}
          />
          <Legend
            payload={[
              {
                id: 0,
                type: "square",
                value: "positive",
                color: "#82ca9d",
              },
              {
                id: 1,
                type: "square",
                value: "negative",
                color: "#C12C30",
              },
            ]}
          />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="balance" fill="#E1E1E1">
            {differenceData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.balance > 0 ? "#82ca9d" : "#C12C30"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PositiveNegativeChart;
