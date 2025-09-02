export const giveCardColors = (index) => {
    const mod = index % 3;
    if (mod == 0) return ["bg-customCompClassBorderColor1","bg-customCard2Color", "border-customCompClassBorderColor1"];
    else if (mod == 1) return ["bg-customCompClassBorderColor2", "bg-customCompClassBgColor2", "border-customCompClassBorderColor2"];
    else if (mod == 2) return ["bg-customCompClassBorderColor3","bg-customCompClassBgColor3", "border-customCompClassBorderColor3"];
    else return "bg-green-500";
  };