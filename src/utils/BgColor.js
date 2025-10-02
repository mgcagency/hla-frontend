export const giveBgColor = (index) => {
    const mod = index % 6;
    if (mod == 0) return "bg-customCard1Color";
    else if (mod == 1) return "bg-customCard2Color";
    else if (mod == 2) return "bg-customCard3Color";
    else if (mod == 3) return "bg-customCard4Color";
    else if (mod == 4) return "bg-customCard5Color";
    else if (mod == 5) return "bg-customCard6Color";
    else if (mod == 6) return "bg-customCard7Color";
    else return "bg-green-500";
  };