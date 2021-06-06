import React from "react";
import {
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

const PositiveNegativeChart = ({ data }) => {
  //color="#E1E1E1"
  return (
    <BarChart
      width={800}
      height={450}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      onClick={() => {
        console.log(data);
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
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
            color: "#b80000",
          },
        ]}
      />
      <ReferenceLine y={0} stroke="#000" />
      <Bar dataKey="balance" fill="#E1E1E1">
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={entry.balance > 0 ? "#82ca9d" : "#b80000"}
          />
        ))}
      </Bar>
    </BarChart>
  );
};

export default PositiveNegativeChart;
