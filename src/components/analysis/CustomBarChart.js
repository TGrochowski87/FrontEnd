import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  ReferenceLine,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useFetch from "use-http";

const CustomBarChart = ({ title, chartFor, month, year, onlyYear }) => {
  const [data, setData] = useState([]);
  const [maxAbsValue, setMaxAbsValue] = useState(0);

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

    let url = `/analysis/${chartForParam}/${periodParam}/difference`;
    if (periodParam === "monthly") {
      url += `?date=01/${monthParam}/${yearParam}`;
    }

    const newData = await get(url);

    if (!newData || newData?.length === 0) {
      setData([]);
      return;
    }

    if (response.ok) {
      let newMax = 0;

      const formattedData = newData.map((data, index) => {
        if (Math.abs(data.difference) > newMax) {
          newMax = Math.abs(data.difference);
        }

        return {
          name: data.categoryName,
          balance: chartFor === "income" ? -data.difference : data.difference,
        };
      });

      setMaxAbsValue(Math.round(newMax + 0.1 * newMax));
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
        <ResponsiveContainer>
          <BarChart data={data} maxBarSize={120}>
            <CartesianGrid strokeDasharray="3 3" fill="#373C47" />
            <XAxis dataKey="name" />
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
            <ReferenceLine y={0} stroke="#000" ifOverflow="extendDomain" />
            <Bar dataKey="balance" fill="#E1E1E1">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.balance > 0 ? "#82ca9d" : "#C12C30"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomBarChart;
