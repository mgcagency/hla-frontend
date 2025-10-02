import { useState } from "react";
import Calendar from "react-calendar";
import { IoIosArrowDown } from "react-icons/io";
// import "react-calendar/dist/Calendar.css";

export default function CustomCalendar({onDateChange}) {
  const [date, setDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState([
    new Date(),
    // new Date(new Date().getFullYear(), new Date().getMonth(), 26),
    // new Date(new Date().getFullYear(), new Date().getMonth(), 14),
    // new Date(new Date().getFullYear(), new Date().getMonth(), 18),
    // new Date(new Date().getFullYear(), new Date().getMonth(), 23),
  ]);

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const isSelected = selectedDates.some(
        (selectedDate) =>
          date.getDate() === selectedDate.getDate() &&
          date.getMonth() === selectedDate.getMonth() &&
          date.getFullYear() === selectedDate.getFullYear()
      );
      if (isSelected) {
        const day = date.getDay();
        if (day === 1) return "react-calendar__tile--highlight-monday";
        if (day === 2) return "react-calendar__tile--highlight-tuesday";
        if (day === 3) return "react-calendar__tile--highlight-wednesday";
        if (day === 4) return "react-calendar__tile--highlight-thursday";
        if (day === 5) return "react-calendar__tile--highlight-friday";
        if (day === 6) return "react-calendar__tile--highlight-saturday";
        if (day === 0) return "react-calendar__tile--highlight-sunday";
      }
    }
    return null;
  };

  const handleDateChange = (date) => {
    setDate(date);
    onDateChange(date);
    setSelectedDates((prevDates) => {
      const isAlreadySelected = prevDates.some(
        (selectedDate) =>
          date.getDate() === selectedDate.getDate() &&
          date.getMonth() === selectedDate.getMonth() &&
          date.getFullYear() === selectedDate.getFullYear()
      );
      if (isAlreadySelected) {
        return prevDates.filter(
          (selectedDate) =>
            !(
              date.getDate() === selectedDate.getDate() &&
              date.getMonth() === selectedDate.getMonth() &&
              date.getFullYear() === selectedDate.getFullYear()
            )
        );
      } else {
        // return [...prevDates, date];
        return [ date];
      }
    });
  };

  return (
    <div className="custom-calendar w-[280px] h-[280px]">
      <Calendar
        tileClassName={tileClassName}
        onChange={handleDateChange}
        value={date}
        formatMonthYear={(locale, date) => (
          <span className="flex items-center justify-center gap-2 ">
            {date.toLocaleString(locale, { month: "long", year: "numeric" })}{" "}
            <IoIosArrowDown />
          </span>
        )}
        formatShortWeekday={(locale, date) => {
          const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
          return weekdays[date.getDay()];
        }}
        formatMonth={(locale, date) => {
          const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          return months[date.getMonth()];
        }}
        showNeighboringMonth={false}
        minDetail="decade"
      />
    </div>
  );
}
