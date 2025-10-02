import React, { useState } from "react";
import SimpleBackHeader from "../../components/Navbar/SimpleBackHeader";
import { ToastContainer, toast } from "react-toastify";
import { addWellbeing } from "../../api/Admin/addWellbeing";
import { getAllWellbeings } from "../../api/Admin/allWellbeings";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { editWellbeing } from "../../api/Admin/editWellbeing";

export default function EditWellBeing() {
  const location = useLocation();
  const [title, setTitle] = useState(location.state.title);
  const [content, setContent] = useState(location.state.content);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = async () => {
    setLoading(true);
    if (title === "" || content === "") {
      toast.error("Please fill all the fields");
      setLoading(false);
    } else {
      const updatedWellbeing = {
        title,
        content,
      };
      try {
        const response = await editWellbeing(updatedWellbeing, location.state?._id);
        toast.success("Wellbeing updated successfully");
        setTimeout(() => setLoading(false), 1000);
        setTimeout(() => navigate("/admin/wellbeing"), 1000);
      } catch (err) {
        console.log(err);
        toast.error("Failed to add new Wellbeing");
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div
        className={`flex flex-col p-2 rounded-tl-3xl bg-white rounded-bl-3xl h-full w-full`}
      >
        <SimpleBackHeader />

        {/* Main Page Content  */}
        <div className="font-sans text-customGray p-6 ">
          <ToastContainer position="bottom-right" />
          <p className="text-customDarkBlue font-medium text-xl mb-4">
            Update Well Being
          </p>
          <div className="mb-5">
            <p className="text-customLightGray mb-1 text-sm">Title</p>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Well Being Title"
              maxLength={35}
              className="w-8/12 md:w-7/12 lg:w-6/12 xl:w-5/12 px-4 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="mb-5">
            <p className="text-customLightGray mb-1 text-sm">Content</p>
            <textarea
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter Well Being Content"
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
              rows="13"
            ></textarea>
          </div>
          <div className=" flex justify-center ">
            {loading ? (
              <div>
                <Loader />
              </div>
            ) : (
              <button
                onClick={handleUpdate}
                className="py-3 px-9 mt-2 bg-customMaroon w-5/12 lg:w-3/12 text-customPopupBgColor text-sm font-normal rounded-3xl"
              >
                Update
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
