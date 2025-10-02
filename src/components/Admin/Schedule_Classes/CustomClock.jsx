import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import TextField from "@mui/material/TextField";
import { IMAGES } from "../../../assets";
import dayjs from "dayjs";
import { enUS } from "@mui/x-date-pickers/locales";

export default function CustomClock({ onConfirm, onCancel }) {
  const [value, setValue] = React.useState(null); // Initialize to null
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [isStartTimeSelected, setIsStartTimeSelected] = React.useState(false);
  const [isEndTimeMode, setIsEndTimeMode] = React.useState(false);
  const [selectedPeriod, setSelectedPeriod] = React.useState("AM"); // State for selected period
  const [localeText, setLocaleText] = React.useState({
    ...enUS.components.MuiLocalizationProvider.defaultProps.localeText,
    timePickerToolbarTitle: "Start time",
  });

  const handleNextClick = () => {
    setStartTime(value.format("hh:mm A"));
    setValue(null); // Reset value to null
    setIsEndTimeMode(true);
    setIsStartTimeSelected(false); // Reset start time selection state
    setLocaleText((prev) => ({
      ...prev,
      timePickerToolbarTitle: "End time",
    }));
    setOpenView("hours");
  };

  const handleConfirmClick = () => {
    setEndTime(value.format("hh:mm A"));
    onConfirm(startTime, value.format("hh:mm A"));
  };
console.log('parems',localeText)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} localeText={localeText}>
      <StaticTimePicker
        orientation="landscape"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          setIsStartTimeSelected(true);
          setSelectedPeriod(newValue.format("A"));
        }}
        openTo="hours" // Ensure the picker opens to the hour view
        views={["hours", "minutes"]} // Specify the order of views
        renderInput={(params) => <TextField {...params} />}
      />
      <div className="p-1 px-4 flex justify-between items-center w-[460px]">
        {isEndTimeMode ? (
          <p className="text-customLightBlue text-sm">
            From <span className="text-customYellow">{startTime}</span> to
          </p>
        ) : (
          <img src={IMAGES.keyboard_icon} alt="" className="w-5 h-4" />
        )}
        <div className="text-customMaroon font-medium text-sm">
          <button className="p-3" onClick={onCancel}>
            Cancel
          </button>
          {isEndTimeMode ? (
            <button
              className="p-3"
              disabled={!isStartTimeSelected}
              onClick={handleConfirmClick}
            >
              Confirm
            </button>
          ) : (
            <button
              className="p-3"
              disabled={!isStartTimeSelected}
              onClick={handleNextClick}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </LocalizationProvider>
  );
}
