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

const CustomLineChart = ({ title, month, year, onlyYear }) => {
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
      let sum = 0;
      const formattedData = newData.map((record, index) => {
        sum += record.sumByDate;

        return {
          name: index + 1,
          expense: sum,
          income: 0,
        };
      });

      return formattedData;
    }
  };

  const getIncomeData = async (dataWithExpense) => {
    const newData = await get(generateUrl("income"));

    if (!newData || newData?.length === 0) {
      setData([]);
      return;
    }

    if (response.ok) {
      let sum = 0;
      const formattedData = dataWithExpense.map((record, index) => {
        sum += newData[index].sumByDate;

        return {
          ...record,
          income: sum,
        };
      });
      return formattedData;
    }
  };

  const configureData = async () => {
    const dataWithExpense = await getExpenseData();
    const configuredData = await getIncomeData(dataWithExpense);
    setData(configuredData);
  };

  useEffect(() => {
    const configure = async () => {
      await configureData();
    };
    configure().then(() => {
      //console.log(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, year, onlyYear]);

  return (
    <div>
      <h5 style={{ color: "whitesmoke", borderBottom: "1px solid whitesmoke" }}>
        {title}
      </h5>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "500px" }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
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
    </div>
  );
};

export default CustomLineChart;
