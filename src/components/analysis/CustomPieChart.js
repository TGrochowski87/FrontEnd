import React, { useEffect, useState } from "react";

import { PieChart, Pie, ResponsiveContainer, Cell, Legend } from "recharts";

import useFetch from "use-http";

import mainColors from "./colors";

const CustomPieChart = ({ title, chartFor, month, year, onlyYear }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    dataGet();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartFor, month, year, onlyYear]);

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

    let url = `/analysis/${chartForParam}/${periodParam}/categorised`;
    if (periodParam === "monthly") {
      url += `?date=01/${monthParam}/${yearParam}`;
    }

    const newData = await get(url);

    if (!newData || newData?.length === 0) {
      setData([]);
      return;
    }

    if (response.ok) {
      const formattedData = {
        main: [],
        sub: [],
      };

      let colorIndex = 0;

      newData.forEach((data) => {
        const mainEntry = {
          name: data.mainCategoryName,
          value: parseFloat(data.percentage.toFixed(2)),
          color: mainColors[colorIndex],
        };
        colorIndex = (colorIndex + 1) % mainColors.length;
        formattedData.main.push(mainEntry);

        if (data.subCategoires) {
          data.subCategoires.forEach((sub) => {
            const subEntry = {
              name: sub.categoryName,
              value: parseFloat(sub.percentage.toFixed(2)),
            };
            formattedData.sub.push(subEntry);
          });
        }
      });
      setData(formattedData);
    }
  };

  const renderInnerLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {(percent * 100).toFixed(2)}%
      </text>
    );
  };

  const renderOuterFullLabel = ({ name, percent }) => {
    return `${name} ${(percent * 100).toFixed(2)}%`;
  };

  const renderOuterPercentLabel = ({ percent }) => {
    return `${(percent * 100).toFixed(2)}%`;
  };

  return (
    <div>
      <h5 style={{ color: "whitesmoke", borderBottom: "1px solid whitesmoke" }}>
        {title}
      </h5>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "500px" }}
      >
        {data?.length !== 0 ? (
          <ResponsiveContainer>
            <PieChart label={true}>
              <Legend
                iconType="circle"
                payload={data.main.map((item) => {
                  return {
                    type: "circle",
                    id: item.name,
                    value: item.name,
                    color: item.color,
                  };
                })}
              />

              <Pie
                data={data.main}
                dataKey="value"
                nameKey="name"
                label={
                  chartFor === "income"
                    ? renderOuterPercentLabel
                    : renderInnerLabel
                }
                labelLine={chartFor === "income"}
                cx="50%"
                cy="50%"
                outerRadius="50%"
                fill="#8884d8"
              >
                {data.main.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Pie
                data={data.sub}
                dataKey="value"
                nameKey="name"
                label={renderOuterFullLabel}
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="70%"
                fill="#ffa600"
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="font-italic" style={{ color: "white" }}>
            No data available for this period
          </p>
        )}
      </div>
    </div>
  );
};

export default CustomPieChart;
