import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const Example = ({ stats }) => {
  const data = [
    { name: "Group A", value: stats?.exceeded },
    { name: "Group B", value: stats?.hit },
    { name: "Group C", value: stats?.workingTowards },
    { name: "Group D", value: stats?.no },
  ];

  const COLORS = ["#63ABFD", "#E697FF", "#FFA5CB", "#FF9898"];

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
      <PieChart width={300} height={300}>
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

const HittingObjChart = ({ data, ispdf }) => {
  return (
    <div className="p-4 rounded-xl border border-black/10 shadow-xl">
      <div>
        <p className="text-lg font-medium">Hitting Objectives</p>
      </div>
        <div id="hittingobj1" className=" hidden gap-1 items-center mt-2">
          <div className="text-sm">
            <div className="flex gap-1 items-center">
              <p className="text-[#63ABFD]">{data?.exceeded} </p>
              <p> Exceeded</p>
            </div>
            <div className="flex gap-1 items-center">
              <p className="text-[#E697FF]">{data?.hit} </p>
              <p>Hit</p>
            </div>
            <div className="flex gap-1 items-center">
              <p className="text-[#FFA5CB]">{data?.workingTowards} </p>
              <p>Working Towards</p>
            </div>
            <div className="flex gap-1 items-center">
              <p className="text-[#FF9898]">{data?.no} </p>
              <p>No</p>
            </div>
          </div>
        </div>
      
        <div id="hittingobj" className="flex gap-1 h-48 mt-2 justify-between items-center">
          <Example stats={data} />
          <div className="text-sm">
            <div className="flex gap-1 items-center">
              <div className="h-2 w-2 min-w-2 min-h-2 rounded-full bg-[#63ABFD]" />
              <p> Exceeded</p>
            </div>
            <div className="flex gap-1 items-center">
              <div className="h-2 w-2 min-w-2 min-h-2 rounded-full bg-[#E697FF] " />
              <p>Hit</p>
            </div>
            <div className="flex gap-1 items-center">
              <div className="h-2 w-2 min-w-2 min-h-2 rounded-full bg-[#FFA5CB]" />
              <p>Working Towards</p>
            </div>
            <div className="flex gap-1 items-center">
              <div className="h-2 w-2 min-w-2 min-h-2 rounded-full bg-[#FF9898]" />
              <p>No</p>
            </div>
          </div>
        </div>
      
    </div>
  );
};

export default HittingObjChart;
