import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import WellbeingCard from "../../components/Admin/Wellbeing/WellbeingCard";
import { useUser } from "../../contexts/UserContext";
import WellbeingDeletePopup from "../../components/Admin/Wellbeing/WellbeingDeletePopup";
import { getAllWellbeings } from "../../api/Admin/allWellbeings";
import { useOverLay } from "../../contexts/OverlayContext";
import Loader from "../../components/Loader/Loader";

export default function WellbeingPage() {
  const navigate = useNavigate();
  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteWellbeing, setDeleteWellbeing] = useState(null);
  const [wellbeings, setWellbeings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { user } = useUser();

  const {toggleOverlay} = useOverLay();

  console.log("main page check : ", deleteWellbeing);

  const toggleDeletePopup = (wellbeing) => {
    setDeleteWellbeing(wellbeing);
    setDeletePopup(!deletePopup);
    toggleOverlay();
  }

  const toggleRefresh = ()=> {
    setRefresh(!refresh);
  }

  useEffect(() => {
    setLoading(true);
    const fetchAllWellbeings = async () => {
      const result = await getAllWellbeings();
      setWellbeings(result);
      setLoading(false);
    };
    fetchAllWellbeings();
  }, [refresh]);

  const handleAddNewClick = () => {
    navigate("/admin/wellbeing/new-wellbeing");
  };

  return (
    <>
      <div
        className={`flex flex-row rounded-tl-3xl bg-white rounded-bl-3xl h-full `}
      >
        <div className=" flex-[5] w-full font-sans mb-10">
          {/* NavBar  */}
          <Navbar heading={"Wellbeing Signposting"} img={user?.photo} name={user?.name} />

          {/* Heading and Buttons Div  */}
          <div className="flex flex-row justify-between px-10 pt-10 pb-4">
            {/* Name and Image div  */}
            <p className="text-lg font-medium">All wellbeing signposts</p>

            <div className="text-white text-sm font-normal flex flex-col smMd:flex-row">
              <button
                onClick={handleAddNewClick}
                className="bg-customMaroon p-2 px-4 border rounded-md flex flex-row items-center"
              >
                <IoAdd size={16} />
                <p className="ml-2">Add New</p>
              </button>
            </div>
          </div>
          {loading ? (
            <div className="flex w-full h-40 justify-center font-normal items-center">
              <Loader />
            </div>
          ) : wellbeings?.length === 0 ? (
            <div className="flex w-full h-40 justify-center font-normal items-center">
              <p>No wellbeings created</p>
            </div>
          ) : (
            <div className="px-10 items-stretch flex flex-col mdLg:grid mdLg:grid-cols-2 xl:grid-cols-3 gap-2 gap-y-4">
              {wellbeings?.slice().reverse().map((wellbeing, index) => (
                <WellbeingCard
                  key={index}
                  wellbeing={wellbeing}
                  menu={true}
                  toggleDeletePopup={toggleDeletePopup}
                />
              ))}
            </div>
          )}
        </div>
        {deletePopup && (
          <WellbeingDeletePopup
            wellbeing={deleteWellbeing}
            toggleFunc={toggleDeletePopup}
            toggleRefresh={toggleRefresh}
            
          />
        )}
      </div>
    </>
  );
}
