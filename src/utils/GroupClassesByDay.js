

export const groupClassesByDay = (classes) => {
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const groupedClasses = {};

    days.forEach((day) => {
      groupedClasses[day] = classes.filter((cls) => cls.weekDays.includes(day));
    });

    return groupedClasses;
  };