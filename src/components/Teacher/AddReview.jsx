import React, { useEffect, useState } from "react";
import { IMAGES } from "../../assets";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RiCloseLine } from "react-icons/ri";
import { MdArrowForwardIos } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { RenderScreenContent } from "./RenderScreenContent";
import { addReview } from "../../api/Teacher/createReview";
import Loader from "../Loader/Loader";

export default function AddReview({
  toggleFunc,
  toggleReviewSubmittedPopup,
  reviewSubmittedPopup,
  classs,
  setReviewCompleted
}) {
  const [loader, setLoader] = useState(false);

  const [currentScreen, setCurrentScreen] = useState(1);
  const [review, setReview] = useState({
    1: { q: "Did the student attend the lesson?", a: null },
    2: { q: "Did the student engage in the lesson?", a: null },
    3: { q: "What was the objective of the lesson?", a: "" },
    4: { q: "Did the student hit the objective?", a: null },
    5: { q: "Has CPOMS been updated if required?", a: null },
    6: { q: "Has evidence of learning been saved?", a: null },
  });

  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    const currentAnswer = review[currentScreen].a;
    if (currentScreen === 1 && currentAnswer?.startsWith("No (") && currentAnswer?.endsWith(")")) {
      const reason = currentAnswer.slice(4, -1).trim();
      setIsNextDisabled(reason.length === 0);
    }
    else if (currentScreen === 3) {
      setIsNextDisabled(currentAnswer.trim() === "");
    }
    else {
      setIsNextDisabled(currentAnswer === null);
    }
  }, [currentScreen, review]);

  useEffect(() => {
    setIsSubmitDisabled(review[6].a === null);
  }, [review]);

  const handleNext = () => {
    if (currentScreen < 6) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const handleSubmit = async () => {
    setLoader(true);
    try {
      const response = await addReview({ class_id: classs._id, question: Object.values(review) });
      console.log(response);
      toast.success("Review submitted successfully!");
      setReviewCompleted(true);
      toggleReviewSubmittedPopup();
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit review.");
    } finally {
      setLoader(false);
    }
  };

  const updateReview = (screen, answer) => {
    setReview((prevReview) => ({
      ...prevReview,
      [screen]: {
        ...prevReview[screen],
        a : answer,
      },
    }));
  };

  return (
    <div className="min-h-screen top-0 overflow-y-auto register-scrollbar3 rounded-l-3xl bg-customNewStudentCardColor absolute flex justify-end right-0 font-sans ">
      <ToastContainer position="bottom-right" />
      {reviewSubmittedPopup && (
        <div className="bg-black fixed inset-0 opacity-50"></div>
      )}
      <div className=" w-[400px] h-full items-center">
        {/* close button  */}
        <div className="flex justify-start flex-1">
          <div
            onClick={toggleFunc}
            className="bg-white mt-3 ml-4 border border-gray-200 rounded-full w-[35px] h-[35px] shadow-xl flex justify-center items-center cursor-pointer"
          >
            <RiCloseLine className="text-customGrayText" />
          </div>
        </div>
        {/* Heading  */}
        <div className="flex flex-1 justify-center mb-6">
          <p className=" mt-6 font-medium text-2xl">Give Review</p>
        </div>

        <div className="pl-12 pr-8">
          {/* Progress Bar  */}
          <div className="flex flex-row items-center space-x-2 px-4 mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-customYellow h-2.5 rounded-full"
                style={{ width: `${(currentScreen / 6) * 100}%` }}
              ></div>
            </div>
            <p className="text-customLightGray text-xs font-semibold">
              {currentScreen}/6
            </p>
          </div>

          {/* Changing Div  */}

          <RenderScreenContent
            currentScreen={currentScreen}
            updateReview={updateReview}
            setIsNextDisabled={setIsNextDisabled}
          />

          {/* Register Button  */}
          <div className="w-full flex items-center justify-center mt-10 px-4 mb-10">
            {currentScreen === 6 ? (
              loader ? (
                <Loader />
              ) : (
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className={`bg-customMaroon w-full flex flex-row items-center justify-center rounded-3xl py-3 ${
                    isSubmitDisabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isSubmitDisabled}
                >
                  <p className=" text-white font-medium text-base">Submit</p>
                </button>
              )
            ) : (
              <button
                type="submit"
                onClick={handleNext}
                className={`bg-customMaroon w-full flex flex-row items-center justify-center rounded-3xl py-3 ${
                  isNextDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isNextDisabled}
              >
                <p className=" text-white font-medium text-base">Next</p>
                <MdArrowForwardIos className="text-white ml-2 w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
