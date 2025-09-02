import { useState } from "react";

export const RenderScreenContent = ({ currentScreen, updateReview }) => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [reason, setReason] = useState("");

  const handleButtonClick = (screen, button) => {
    setSelectedButton({ screen, button });
    if (button === "No" && screen === 1) {
      updateReview(screen, `${button} ( ${reason} )`);
    } else {
      updateReview(screen, button);
    }
  };

  const handleTextareaChange = (screen, value) => {
    setReason(value);
    updateReview(screen, `No ( ${value} )`);
  };

  const isSelected = (screen, button) => {
    return (
      selectedButton?.screen === screen && selectedButton?.button === button
    );
  };

  return (
    <div>
      {(() => {
        switch (currentScreen) {
          case 1:
            return (
              <div className="h-[300px] px-4">
                <p className="text-lg text-customGray mb-8 font-medium">
                  Did the student attend the lesson?
                </p>
                <div className=" flex flex-row items-center justify-center space-x-4">
                  <button
                    className={`  w-1/2 py-3 text-sm font-medium rounded-lg ${
                      isSelected(1, "Yes")
                        ? "bg-customGreen text-white"
                        : "bg-customModalButtonColor text-customGray"
                    }`}
                    onClick={() => handleButtonClick(1, "Yes")}
                  >
                    Yes
                  </button>
                  <button
                    className={` w-1/2 py-3 text-sm font-medium rounded-lg ${
                      isSelected(1, "No")
                        ? "bg-customGreen text-white"
                        : "bg-customModalButtonColor text-customGray"
                    }`}
                    onClick={() => handleButtonClick(1, "No")}
                  >
                    No
                  </button>
                </div>
                {isSelected(1, "No") && (
                  <textarea
                    className="w-full mt-6 px-4 py-2 text-sm text-customGray border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
                    rows="3"
                    placeholder="What was the issue/reason?"
                    value={reason}
                    onChange={(e) => handleTextareaChange(1, e.target.value)}
                  ></textarea>
                )}
              </div>
            );
          case 2:
            return (
              <div className="h-[300px] px-4">
                <p className="text-lg text-customGray mb-6 font-medium">
                  Did the student engage in the lesson?
                </p>
                <div className="flex flex-col items-center space-y-4">
                  <button
                    className={` text-start pl-8 w-full py-3 text-sm font-medium rounded-lg ${
                      isSelected(2, "Fully")
                        ? "bg-customGreen text-white"
                        : "bg-customModalButtonColor text-customGray"
                    }`}
                    onClick={() => handleButtonClick(2, "Fully")}
                  >
                    Fully
                  </button>
                  <button
                    className={` w-full text-start pl-8 py-3 text-sm font-medium rounded-lg ${
                      isSelected(2, "Partially")
                        ? "bg-customGreen text-white"
                        : "bg-customModalButtonColor text-customGray"
                    }`}
                    onClick={() => handleButtonClick(2, "Partially")}
                  >
                    Partially
                  </button>
                  <button
                    className={` w-full text-start pl-8 py-3 text-sm font-medium rounded-lg ${
                      isSelected(2, "Not At All")
                        ? "bg-customGreen text-white"
                        : "bg-customModalButtonColor text-customGray"
                    }`}
                    onClick={() => handleButtonClick(2, "Not At All")}
                  >
                    Not at all
                  </button>
                </div>
              </div>
            );
          case 3:
            return (
              <div className="h-[300px] px-4">
                <p className="text-lg text-customGray mb-6 font-medium">
                  What was the objective of the lesson?
                </p>
                <div className="flex flex-col space-y-4">
                  <textarea
                    className="w-full px-4 py-2 text-sm text-customGray border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
                    rows="5"
                    placeholder="Enter objective of Lesson"
                    onChange={(e) => handleButtonClick(3, e.target.value)}
                  ></textarea>
                </div>
              </div>
            );
          case 4:
            return (
              <div className="h-[300px] px-4">
                <p className="text-lg text-customGray mb-6 font-medium">
                  Did the student hit the objective?
                </p>
                <div className="flex flex-col items-center space-y-4">
                  <button
                    className={` text-start pl-8 w-full py-3 text-sm font-medium rounded-lg ${
                      isSelected(4, "No")
                        ? "bg-customGreen text-white"
                        : "bg-customModalButtonColor text-customGray"
                    }`}
                    onClick={() => handleButtonClick(4, "No")}
                  >
                    No
                  </button>
                  <button
                    className={`w-full text-start pl-8 py-3 text-sm font-medium rounded-lg ${
                      isSelected(4, "Working Towards")
                        ? "bg-customGreen text-white"
                        : "bg-customModalButtonColor text-customGray"
                    }`}
                    onClick={() => handleButtonClick(4, "Working Towards")}
                  >
                    Working Towards
                  </button>
                  <button
                    className={` w-full text-start pl-8 py-3 text-sm font-medium rounded-lg ${
                      isSelected(4, "Hit")
                        ? "bg-customGreen text-white"
                        : "bg-customModalButtonColor text-customGray"
                    }`}
                    onClick={() => handleButtonClick(4, "Hit")}
                  >
                    Hit
                  </button>
                  <button
                    className={` w-full text-start pl-8 py-3 text-sm font-medium rounded-lg ${
                      isSelected(4, "Exceeded")
                        ? "bg-customGreen text-white"
                        : "bg-customModalButtonColor text-customGray"
                    }`}
                    onClick={() => handleButtonClick(4, "Exceeded")}
                  >
                    Exceeded
                  </button>
                </div>
              </div>
            );
          case 5:
            return (
              <div className="h-[300px] px-4">
                <p className="text-lg text-customGray mb-6 font-medium">
                  Has CPOMS been updated if required?
                </p>
                <div className="flex flex-row items-center justify-center space-x-4">
                  <button
                    className={`w-1/2 py-3 text-sm font-medium rounded-lg ${
                      isSelected(5, "Yes")
                        ? "bg-customGreen text-white"
                        : "bg-customModalButtonColor text-customGray"
                    }`}
                    onClick={() => handleButtonClick(5, "Yes")}
                  >
                    Yes
                  </button>
                  <button
                    className={` w-1/2 py-3 text-sm font-medium rounded-lg ${
                      isSelected(5, "No")
                        ? "bg-customGreen text-white"
                        : "bg-customModalButtonColor text-customGray"
                    }`}
                    onClick={() => handleButtonClick(5, "No")}
                  >
                    No
                  </button>
                </div>
              </div>
            );
          case 6:
            return (
              <div className="h-[300px] px-4">
                <p className="text-lg text-customGray mb-6 font-medium">
                  Has evidence of learning been saved?
                </p>
                <div className="flex flex-row items-center justify-center space-x-4">
                  <button
                    className={` w-1/2 py-3 text-sm font-medium rounded-lg ${
                      isSelected(6, "Yes")
                        ? "bg-customGreen text-white"
                        : "bg-customModalButtonColor text-customGray"
                    }`}
                    onClick={() => handleButtonClick(6, "Yes")}
                  >
                    Yes
                  </button>
                  <button
                    className={` w-1/2 py-3 text-sm font-medium rounded-lg ${
                      isSelected(6, "No")
                        ? "bg-customGreen text-white"
                        : "bg-customModalButtonColor text-customGray"
                    }`}
                    onClick={() => handleButtonClick(6, "No")}
                  >
                    No
                  </button>
                </div>
              </div>
            );
          default:
            return null;
        }
      })()}
    </div>
  );
};
