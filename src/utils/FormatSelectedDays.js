import { daysOfWeek } from "../constants/daysofWeek";

export const formatSelectedDays = (days) => {
  console.log("days are : ", days);
    const daysIds = days
      ?.map((day) => {
        const dayObj = daysOfWeek.find((d) => d.day === day);
        return dayObj ? dayObj.id : null;
      })
      .filter((id) => id !== null);
    daysIds?.sort();

    const dayLabels = daysIds?.map((dayNum) => daysOfWeek[dayNum - 1].label);
    const ranges = [];
    let start = dayLabels[0];
    let end = start;

    for (let i = 1; i < dayLabels.length; i++) {
      if (daysIds[i] === daysIds[i - 1] + 1) {
        end = dayLabels[i];
      } else {
        ranges.push(start === end ? start : `${start}-${end}`);
        start = dayLabels[i];
        end = start;
      }
    }
    ranges.push(start === end ? start : `${start}-${end}`);

    return ranges.join(", ");
  };