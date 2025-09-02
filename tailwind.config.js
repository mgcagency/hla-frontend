/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        customDetailCardShadow: "0px 12px 16px -4px #0C1A240A",
      },
      backgroundImage: {
        "custom-gradient":
          // "linear-gradient(154.87deg, #eeeee4  42.65%, #0c3e81 90.05%)",
          "linear-gradient(154.87deg, #0c3e81 42.65%, #eeeee4 90.05%)",
          // "linear-gradient(154.87deg, #5F2B38 42.65%, #C1914F 90.05%)",
        "custom-gradient2":
          "linear-gradient(180deg, #0c3e81 51.54%, #eeeee4 100%)",
        "custom-gradient3":
          "linear-gradient(268.11deg, #0c3e81 32.16%, #eeeee4 86.86%)",
      },
      fontSize: {
        xxs: "0.625rem", // 10px
      },
      colors: {
        
        customWhite30: "#FFFFFF4D", // Custom color
        customWhite70: "#FFFFFFB2",
        customWhite10: "#FFFFFF1A",
        customWhite50: "#FFFFFF80",
        customWhite80: "#FFFFFFCC",
        customWhite55: "#FFFFFF9c",
        customMaroon: "#0c3e81",
        // customMaroon: "#5F2B38",
        customMaroonShade: "#5F2B381A",
        customYellow: "#eeeee4",
        // customYellow: "#C1914F",
        customYellowShade: "#C1914F1A",
        customYellowLight: "#cda872",
        customDarkBlue: "#111827",
        customDarkerBlue: "#141736",
        customRoleColor: "#718096",
        customGray: "#414652",
        customBlue: "#344054",
        customLightBlue: "#7D8DA6",
        customLightGray: "#959595",
        customLightGrayShade: "#7F7F7F",
        customGrayText: "#8A92A6",
        customNewStudentCardColor: "#F5F0EA",
        customDeleteEditColor: "#667085",
        customStudentCardTextColor: "#232D42",
        customCard1Color: "#E1E2F6",
        customCard2Color: "#F8EFE2",
        customCard3Color: "#EFF7E2",
        customCard4Color: "#FFFBD6",
        customCard5Color: "#E3EBFF",
        customCard6Color: "#FEE9E9",
        customCard7Color: "#EFE7FF",
        customDetailCardBorderColor: "#5F2B3833",
        customTogglePageBgColor: "#EDF1F3",
        customPopupBgColor: "#FDFDFD",
        customCancelBtnColor: "#F1F1F1",
        customGreen: "#10A957",
        customPopupTextColor: "#959595",
        customLightRed: "#FF5E5E",
        customCompClassBgColor2: "#FFFBD6",
        customCompClassBgColor3: "#EFF7E2",
        customCompClassBorderColor1: "#FFC065",
        customCompClassBorderColor2: "#EDE37F",
        customCompClassBorderColor3: "#95D829",
        customLightGreyBg: "#F8F8F8",
        customClockDigitColor: "##1D1B20",
        customPurple: "#21005D",
        customPurpleShade: "#D9D9D9",
        customLightBlueShade: "#008BD91A",
        customLightYellowShade: "#FFCC471A",
        customLightRedShade: "#F445451A",
        customBlackGreyish: "#282828E5",
        customOnlineColor: "#4BCD58",
        customMsgIconsColor: "#B6B6C2",
        customModalButtonColor: "#F4F3F6",
      },
      screens: {
        custom_size: "1400px", // Custom large breakpoint
        smMd: "600px",
        mdLg: "896px",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      fontWeight: {
        normal: 400,
      },
      width: {
        "7/10": "70%",
      },
    },
  },
  plugins: [],
};
