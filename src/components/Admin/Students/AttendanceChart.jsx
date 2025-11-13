import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const Example = ({ stats }) => {
  const data = [
    { name: "Group A", value: stats?.totalPresents },
    { name: "Group B", value: stats?.totalAbsents },
  ];

  const COLORS = ["#63ABFD", "#E697FF"];

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
      <PieChart width={400} height={400}>
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

const AttendanceChart = ({ data, ispdf }) => {
  return (
    <div className="p-4 rounded-xl border border-black/10 shadow-xl">
      <div>
        <p className="text-lg font-medium">Class Attendance</p>
      </div>
      <div className="flex text-sm gap-4">
        <p>
          <span className="text-[#63ABFD]">{data?.totalPresents}</span> Present
        </p>
        <p>
          <span className="text-[#E697FF]">{data?.totalAbsents}</span> Absent
        </p>
      </div>
        <div id="attendance" className={`gap-1 h-48 items-center mt-2 flex`}>
          <Example stats={data} />
          <div className="text-sm">
            <div className="flex gap-1 items-center">
              <div className="h-2 w-2 min-w-2 min-h-2 rounded-full bg-[#63ABFD]" />
              <p> Present</p>
            </div>
            <div className="flex gap-1 items-center">
              <div className="h-2 w-2 min-w-2 min-h-2 rounded-full bg-[#E697FF]" />
              <p>Absent</p>
            </div>
          </div>
        </div>
    </div>
  );
};

export default AttendanceChart;
