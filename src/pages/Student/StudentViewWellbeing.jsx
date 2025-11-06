import React, { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import WellbeingCard from "../../components/Admin/Wellbeing/WellbeingCard";
import { useUser } from "../../contexts/UserContext";
import Loader from "../../components/Loader/Loader";
import { getAllWellbeings } from "../../api/Admin/allWellbeings";
import ParentsNavbar from "../../components/Navbar/ParentsNavbar";
import StudentNavbar from "../../components/Navbar/StudentNavbar";

export default function StudentViewWellbeing() {
  const [wellbeings, setWellbeings] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    setLoading(true);
    const fetchAllWellbeings = async () => {
      const result = await getAllWellbeings();
      setWellbeings(result);
      setLoading(false);
    };
    fetchAllWellbeings();
  }, []);

  return (
    <>
      <div
        className={`flex flex-row rounded-tl-3xl bg-white rounded-bl-3xl h-full `}
      >
        <div className=" flex-[5] w-full font-sans mb-10">
          {/* NavBar  */}
          <StudentNavbar name={user?.name} img={user?.photo} />

          {/* Heading and Buttons Div  */}
          <div className="flex flex-row justify-between px-10 pt-10 pb-4">
            {/* Name and Image div  */}
            <p className="text-lg font-medium">All Wellbeing signposting</p>
          </div>
          {loading ? (
            <div className="flex w-full h-40 justify-center font-normal items-center">
              <Loader />
            </div>
          ) : wellbeings?.length === 0 ? (
            <div className="flex w-full h-40 justify-center font-normal items-center">
              <p>No Wellbeing signposting created</p>
            </div>
          ) : (
            <div className="px-10 items-stretch flex flex-col mdLg:grid mdLg:grid-cols-2 xl:grid-cols-3 gap-2 gap-y-4">
              {wellbeings
                ?.slice()
                .reverse()
                .map((wellbeing, index) => (
                  <WellbeingCard
                    key={index}
                    wellbeing={wellbeing}
                    menu={false}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
