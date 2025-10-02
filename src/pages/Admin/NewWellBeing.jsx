import React, { useState } from "react";
import SimpleBackHeader from "../../components/Navbar/SimpleBackHeader";
import { ToastContainer, toast } from "react-toastify";
import { addWellbeing } from "../../api/Admin/addWellbeing";
import { getAllWellbeings } from "../../api/Admin/allWellbeings";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { uploadFile } from "../../utils/FileUpload";
import { IoMdCloseCircle } from "react-icons/io";

export default function NewWellBeing() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [docLink, setDocLink] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = async () => {
    setLoading(true);
    if (title === "" || content === "") {
      toast.error("Please fill all the fields");
      setLoading(false);
    } else {
      try {
        let newWellbeing = {
          title,
          content,
          link: docLink,
        };

        if (selectedFile) {
          const fileLink = await uploadFile(selectedFile);
          newWellbeing = {
            title,
            content,
            link: fileLink,
          };
        }

        console.log("wellbeing is : ", newWellbeing);
        const response = await addWellbeing(newWellbeing);
        console.log("add wellbeing response is : ", response);
        toast.success("Wellbeing added successfully");
        setTimeout(() => setLoading(false), 1000);
        setTimeout(() => navigate("/admin/wellbeing"), 1000);
      } catch (err) {
        console.log("error in adding wellbeing is :", err);
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
            New Well Being
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
          <div className="">
            <div className={`mb-1 ${selectedFile ? "hidden" : ""}`}>
              <p className="text-customLightGray mb-1 text-sm">Website Link</p>
              <input
                type="text"
                required
                value={docLink}
                onChange={(e) => setDocLink(e.target.value)}
                placeholder="Enter Website link"
                className="w-8/12 md:w-7/12 lg:w-6/12 xl:w-5/12 px-4 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className={`mb-5 ${docLink ? "hidden": ""}`}>
            <div className="py-4">OR</div>
              <div className="flex gap-1 items-center">
                <label
                  htmlFor="file"
                  className="w-1/12 items-center flex gap-4 cursor-pointer px-4 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
                >
                  + File
                </label>
                {selectedFile && (
                  <div className="flex">
                    <p>{selectedFile?.name} </p>
                    <p
                      className="cursor-pointer truncate w-60"
                      onClick={() => {
                        setSelectedFile("");
                      }}
                    >
                      <IoMdCloseCircle size={14} color="red" />{" "}
                    </p>
                  </div>
                )}
              </div>
              <input
                id="file"
                type="file"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                placeholder="Enter Well Being Title"
                maxLength={35}
                className="hidden w-8/12 md:w-7/12 lg:w-6/12 xl:w-5/12 px-4 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
              />
            </div>
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
                onClick={handleConfirm}
                className="py-3 px-9 mt-2 bg-customMaroon w-5/12 lg:w-3/12 text-customPopupBgColor text-sm font-normal rounded-3xl"
              >
                Confirm
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
