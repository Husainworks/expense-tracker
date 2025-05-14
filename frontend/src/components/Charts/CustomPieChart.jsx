import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { CustomPieTooltip } from "./CustomPieTooltip";
import { CustomPieLegend } from "./CustomPieLegend";

export const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
}) => {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const interval = duration / steps;
    let current = 0;

    const animate = setInterval(() => {
      current += 6;
      if (current >= 360) {
        current = 360;
        clearInterval(animate);
      }
      setAngle(current);
    }, interval);

    return () => clearInterval(animate);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
          startAngle={0}
          endAngle={angle} // dynamically animate end angle
          isAnimationActive={false} // disable default radius animation
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip content={CustomPieTooltip} />
        <Legend content={CustomPieLegend} />

        <text
          x="50%"
          y="50%"
          dy={-25}
          textAnchor="middle"
          fill="#666"
          fontSize="14px"
          className={showTextAnchor ? "block" : "hidden"}
        >
          {label}
        </text>
        <text
          x="50%"
          y="50%"
          dy={8}
          textAnchor="middle"
          fill="#333"
          fontSize="24px"
          fontWeight="600"
          className={showTextAnchor ? "block" : "hidden"}
        >
          {totalAmount}
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
};
