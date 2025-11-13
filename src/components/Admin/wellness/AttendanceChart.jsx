import React from "react";
// import CanvasJSReact from "@canvasjs/react-charts";

// const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const AttendanceChart = () => {
//   const totalClasses = 10;
//   const presentPercentage = 80;
//   const absentPercentage = 20;

//   // Calculate the exact numbers
//   const presentCount = (totalClasses * presentPercentage) / 100;
//   const absentCount = (totalClasses * absentPercentage) / 100;

//   const options = {
//     exportEnabled: false,
//     animationEnabled: true,
//     height: 220,
//     width: 250,
//     title: {
//       text: "Class Attendance",
//       fontSize: 18,
//       fontColor: "#111827",
//       fontFamily: "Arial, sans-serif",
//       fontWeight: "500",
//       horizontalAlign: "left",
//       verticalAlign: "top",
//       padding: {
//         left: -2,
//         bottom: 18,
//       },
//     },
//     // subtitles: [
//     //   {
//     //     text: `${presentCount}  Presents       ${absentCount}  Absent`, // Combine subtitle text
//     //     fontSize: 14,
//     //     fontColor: "#414652",
//     //     fontFamily: "Arial, sans-serif",
//     //     fontWeight: "400",
//     //     horizontalAlign: "left",
//     //     verticalAlign: "top",
//     //     padding: {
//     //       left: -5,
//     //     },
//     //   },
//     // ],
//     legend: {
//       verticalAlign: "center",
//       horizontalAlign: "right",
//       itemWidth: 100,
//     },
//     data: [
//       {
//         type: "pie",
//         startAngle: 0,
//         axisXType: "secondary",
//         toolTipContent: "<b>{label}</b>: {y}%",
//         showInLegend: "false",
//         legendText: "{label}",
//         indexLabelFontSize: 12,
//         indexLabelFontColor: "white", 
//         indexLabelPlacement: "inside",
//         indexLabel: "{y}%",
//         // indexLabelTextAlign: "right",
//         dataPoints: [
//           { y: 80, label: "Present", color: "#63ABFD" }, 
//           { y: 20, label: "Absent", color: "#FF9898" },
//         ],
//       },
//     ],
//   };

//   return (
//     <div
//       className="shadow-lg rounded-xl border-2 border-gray-200 pl-3 pt-2 h-[250px]"
//       style={{ position: "relative" }}
//     >
//       <div
//         style={{
//           textAlign: "left",
//           paddingLeft: "-5px",
//           fontFamily: "Arial, sans-serif",
//           fontSize: "14px",
//           color: "#414652",
//           fontWeight: "400",
//           position: "absolute",
//           zIndex: 10,
//           top: "30px", 
//         }}
//       >
//         <div style={{marginTop:4}}>
//         <span style={{ color: "#63ABFD", marginLeft:3 }}>{presentCount}</span>
//         <span style={{ marginLeft: 4, marginRight: 20 }}>Presents</span>
//         <span style={{ color: "#FF9898" }}>{absentCount}</span>
//         <span style={{ marginLeft: 4 }}>Absents</span>
//         </div>
//       </div>
//       <CanvasJSChart
//         options={options}
//         />
//     </div>
//   );
};
/* onRef={ref => this.chart = ref} */
{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}

export default AttendanceChart;
