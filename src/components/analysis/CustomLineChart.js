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

const CustomLineChart = ({ title, chartFor, month, year, onlyYear }) => {
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

  const dataGet = async () => {
    const monthParam = month < 10 ? "0" + month : month;
    const yearParam = year;
    const chartForParam = chartFor;
    const periodParam = onlyYear ? "yearly" : "monthly";

    let url = `/analysis/${chartForParam}/${periodParam}`;
    if (periodParam === "monthly") {
      url += `?date=01/${monthParam}/${yearParam}`;
    }

    const newData = await get(url);

    if (!newData || newData?.length === 0) {
      setData([]);
      return;
    }

    if (response.ok) {
      const formattedData = newData.map((data, index) => {
        return {
          name: index + 1,
          sum: data.sumByDate,
        };
      });

      setData(formattedData);
    }
  };

  useEffect(() => {
    dataGet();
  }, [chartFor, month, year, onlyYear]);

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
              type="linear"
              dataKey="sum"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomLineChart;
