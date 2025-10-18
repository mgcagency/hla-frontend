import React, { useState } from "react";
import LandingPageCard from "../components/LandingPage/LandingPageCard";
import { FaAngleRight } from "react-icons/fa";
import { card_list } from "../constants/landingUtils";
import { Link } from "react-router-dom";
import { IMAGES } from "../assets";

export default function LandingPage() {
  const [selectedCard, setSelectedCard] = useState("");

  const handleSelectCard = (newCardText) => {
    setSelectedCard(newCardText);
  };

  const getRoute = () => {
    switch (selectedCard) {
      case "Admin":
        return "/admin-login";
      case "Student":
        return "/student-login";
      case "Teacher":
        return "/teacher-login";
      case "Parents":
        return "/parents-login";
      default:
        return "/";
    }
  };

  return (
    //Main Div
    <div className="bg-custom-gradient w-auto h-auto">
      <div className="flex flex-col lg:flex-row min-h-screen ">
        {/* Left Div */}
        <div className="flex-1 lg:ml-20 flex flex-col items-center justify-center lg:items-start custom_size:items-center p-4 lg:p-0">
          <div className="flex-1 flex flex-col items-center md:items-center lg:items-start text-white text-2xl font-semibold lg:text-4xl mb-8 lg:mb-2 mt-10">
            <p>Select a Category</p>
            <p>to Begin</p>
          </div>

          <div className="flex-[3] grid grid-cols-2 gap-x-4 md:grid-cols-2 lg:grid-cols-2">
            {card_list.map((card, index) => (
              <LandingPageCard
                key={index}
                image={card.image}
                text={card.text}
                alt={card.alt}
                selected={selectedCard === card.text}
                buttonClickFunction={() => handleSelectCard(card.text)}
              />
            ))}
          </div>

          <div className="flex-1 flex justify-center lg:ml-8 items-center">
            <Link
              to={getRoute()}
              className={`${
                selectedCard === "" ? "bg-customWhite70" : "bg-white"
              } text-customMaroon flex items-center justify-center text-xl font-bold px-10 py-3 rounded-full w-[250px] h-[56px]`}
            >
              <span className="mb-1 ml-2">Continue</span>
              <FaAngleRight className="ml-3 mb-1" size={25} />
            </Link>
          </div>
        </div>

        {/* Right Div */}
        <div className="flex-1 flex justify-center items-center w-[auto] lg:w-[580px] h-[300px] lg:h-auto opacity-100 m-6 rounded-2xl">
          <img
            src={IMAGES.main_logo}
            alt="Afcademy Logo"
            className="h-[380px] w-[380px] lg:h-[390px] lg:w-[390px]"
          />
        </div>
      </div>
    </div>
  );
}
