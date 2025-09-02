import React from "react";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const Example = ({ stats }) => {
  const data = [
    { name: "Group A", value: stats?.fully },
    { name: "Group B", value: stats?.partially },
    { name: "Group C", value: stats?.notAtAll },
  ];

  const COLORS = ["#63ABFD", "#E697FF", "#FFA5CB"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={90}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

const ClassEngChart = ({ data, ispdf }) => {
  return (
    <div className="p-4 rounded-xl border border-black/10 shadow-xl">
      <div>
        <p className="text-lg font-medium">Class Engagement</p>
      </div>
        <div id="classeng1" className="gap-1 hidden items-center mt-2">
          <div className="text-sm">
            <div className="flex gap-1 items-center">
              <p className="text-[#63ABFD]">{data?.fully} </p>
              <p> Fully</p>
            </div>
            <div className="flex gap-1 items-center">
              <p className="text-[#E697FF]">{data?.partially}</p>
              <p> Partially</p>
            </div>
            <div className="flex gap-1 min-w-2 min-h-2 items-center">
              <p className="text-[#FFA5CB]">{data?.notAtAll} </p>
              <p>Not at All</p>
            </div>
          </div>
        </div>

        <div id="classeng" className={`flex gap-1 h-48 items-center mt-2 `}>
          <Example stats={data} />
          <div className="text-sm">
            <div className="flex gap-1 items-center">
              <div className="h-2 w-2 min-w-2 min-h-2 rounded-full bg-[#63ABFD]" />
              <p> Fully</p>
            </div>
            <div className="flex gap-1 items-center">
              <div className="h-2 w-2 min-w-2 min-h-2 rounded-full bg-[#E697FF]" />
              <p> Partially</p>
            </div>
            <div className="flex gap-1 min-w-2 min-h-2 items-center">
              <div className="h-2 w-2 rounded-full bg-[#FFA5CB]" />
              <p>Not at All</p>
            </div>
          </div>
        </div>
      
    </div>
  );
};

export default ClassEngChart;
