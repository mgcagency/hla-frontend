import React, { useState } from "react";
import { submitWellness } from "../../../api/Teacher/wellness";
import { toast } from "react-toastify";
import StudentNavbar from "../../../components/Navbar/TeacherNavbar";
import { useUser } from "../../../contexts/UserContext";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";

const WellnessFrom = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const location = useLocation();


    const navigate = useNavigate();

  const handleSubmitForm = async () => {
    setLoading(true);
    const resp = await submitWellness(
      { user: location?.state?.student?.user, fileUrl: "file url from UI of teacher" },
      location?.state?.data?._id
    );
    console.log("function resp is : ", resp);
    if (resp.success) {
      toast.success("Form submitted successfully!");
      navigate("/teacher/wellness")
    }
    setLoading(false);
  };

  return (
    // Full Screen
    <>
      <div
        className={`flex flex-row rounded-tl-3xl bg-white rounded-bl-3xl h-full`}
      >
        <div className=" flex-[5] w-full ">
          {/* NavBar  */}
          <StudentNavbar
            heading={"Wellness Form"}
            img={user?.photo}
            name={user?.name}
            role={user?.role}
          />

          <div className="px-10 py-4">
            <p className="text-3xl font-medium flex gap-2 items-center cursor-pointer" onClick={() => {navigate(-1)}}>
            <IoIosArrowBack />
              Back
            </p>
          </div>

          <div className="flex justify-center items-center flex-1 flex-col gap-2">
            <div className="flex  flex-1 items-start justify-start w-1/2">
              <p className="text-3xl font-semibold">
                Wellness <span className="text-sm font-normal">Pending</span>{" "}
              </p>
            </div>
            <div className="flex flex-1 w-full justify-center">
              <div className="flex flex-col gap-4 p-8 rounded-xl w-1/2 bg-customYellow">
                <div className="flex flex-col gap-2">
                  <p>Field 1</p>
                  <input
                    type="text"
                    className="py-2 px-4 rounded-lg bg-white outline-none"
                    placeholder="Enter Information"
                  />
                </div>
                <div>
                  <p>Field 2</p>
                  <textarea
                    type="text"
                    className="py-2 w-full px-4 rounded-lg bg-white outline-none"
                    placeholder="Enter Information"
                  />
                </div>
                {loading && <Loader />}
                {!loading && 
                <div>
                  <p
                    onClick={handleSubmitForm}
                    className="bg-customMaroon rounded-full text-center text-white py-4 hover:bg-customMaroon/90 cursor-pointer"
                    >
                    Submit
                  </p>
                </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WellnessFrom;
