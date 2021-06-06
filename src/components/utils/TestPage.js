import React, { useEffect, useState } from "react";

import PositiveNegativeChart from "./PositiveNegativeChart";
import useFetch from "use-http";

const TestPage = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [differenceData, setDifferenceData] = useState([]);

  const [monthNames] = useState([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]);

  const { get } = useFetch(
    `https://webhomebudget.azurewebsites.net/api/analysis`,
    {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("userToken"),
      },
      cachePolicy: "no-cache",
    }
  );

  const expenseAnalysisGet = async () => {
    await get("/expense/yearly").then((response) => {
      setExpenseData(response);
    });
  };

  const incomeAnalysisGet = async () => {
    await get("/income/yearly").then((response) => {
      setIncomeData(response);
    });
  };

  const calculateDifference = async () => {
    const newDifferenceData = incomeData.map((data, index) => {
      return {
        date: monthNames[new Date(data.date).getMonth()],
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
  }, []);

  useEffect(() => {
    if (incomeData?.length !== 0 && expenseData?.length !== 0) {
      calculateDifference();
    }
  }, [incomeData, expenseData]);

  return (
    <>
      <h1
        onClick={() => {
          console.log(differenceData);
        }}
      >
        XD
      </h1>
      <h1>XD</h1>
      <PositiveNegativeChart data={differenceData} />
    </>
  );
};

export default TestPage;
