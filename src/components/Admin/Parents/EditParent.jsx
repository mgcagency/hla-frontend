import React, { useEffect, useState } from "react";
import { IMAGES } from "../../../assets";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RiCloseLine } from "react-icons/ri";
import { FaCircleMinus } from "react-icons/fa6";
import SelectChildrenPopup from "./SelectChildrenPopup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editUser } from "../../../api/Admin/editUser";
import { useGetUsers } from "../../../contexts/GetUsersContext";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Loader from "../../Loader/Loader";

export default function EditParent({
  parent,
  toggleFunc,
  toggleEditedPopup,
  editedPopup,
  selectPopup,
  toggleSelectPopup,
}) {
  const [selectedStudents, setSelectedStudents] = useState(
    parent.registeredChildren || []
  );
  const [name, setName] = useState(parent.name);
  const [email, setEmail] = useState(parent.email);
  const [children, setChildren] = useState(parent.registeredChildren);
  const [phoneNo, setPhoneNo] = useState(parent.phoneNo);
  const [photo, setPhoto] = useState(parent.photo);
  const [loader, setLoader] = useState(false);

  const [imageLoading, setImageLoading] = useState(true);

  const { refetch } = useGetUsers();

  const uploadFile = async () => {
    if (photo === parent.photo) {
      return parent.photo;
    }

    const storage = getStorage();
    const storageRef = ref(storage, photo?.name);
    // 'file' comes from the Blob or File API
    const response = await uploadBytes(storageRef, photo);
    const fileUrl = await getDownloadURL(response.ref);
    return fileUrl;
  };

  const handleUpdateClick = async () => {
    setLoader(true);
    const fileUrl = await uploadFile();
    if (
      name !== "" &&
      email !== "" &&
      selectedStudents.length !== 0
    ) {
      const updatedParent = {
        name,
        email,
        phoneNo,
        registeredChildren: selectedStudents,
        photo: fileUrl,
      };

      try {
        const response = await editUser(updatedParent, parent?._id);
        refetch();
        toast.success("Updating Successful"); // Show success message
        toggleEditedPopup();
      } catch (error) {
        toast.error("Failed to update parent details");
        console.error("Error updating parent details:", error);
      }
    } else {
      toast.error("Please fill all the fields");
    }
    setLoader(false);
  };

  const handleRemoveStudent = (index) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.filter((_, i) => i !== index)
    );
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <div className="h-screen overflow-y-auto register-scrollbar3 rounded-l-3xl bg-customNewStudentCardColor absolute flex justify-end right-0 font-sans ">
      {editedPopup && <div className="bg-black fixed inset-0 opacity-50"></div>}
      {selectPopup && <div className="bg-black fixed inset-0 opacity-50"></div>}
      <ToastContainer position="bottom-right" />

      <div className=" w-[400px]  items-center">
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
          <p className=" mt-6 font-medium text-2xl">Update Parent</p>
        </div>

        {/* Parent Pic  */}
        <div className="flex-1 flex justify-center">
          <img
            src={parent?.photo || IMAGES.student_avatar}
            alt="New Student Pic"
            className="w-24 h-24 rounded-full"
          ></img>
          <input
            type="file"
            id="file"
            onChange={(e) => {
              setPhoto(e.target.files[0]);
            }}
            className="hidden"
          />
          <label htmlFor="file" className="absolute mt-20 ml-14">
            <img
              src={IMAGES.edit_icon}
              alt="Edit Icon"
              className="w-[23px] h-[23px] cursor-pointer "
            ></img>
          </label>
        </div>

        {/* Form  */}
        <div className="flex-[5] p-8 text-xs ">
          {/* <form action=""> */}
          {/* Name Field  */}
          <div className="mb-5">
            <p className="text-customLightGray mb-1 ">Parent Name</p>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Parent Name"
              maxLength={35}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Select Children Field  */}
          <div className="mb-5">
            {selectedStudents.length === 0 ? (
              <>
                <p className="text-customLightGray mb-1 ">Children</p>
                <div
                  onClick={toggleSelectPopup}
                  className="w-full px-3 py-2 text-sm text-customLightGray bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  <p>+ Select Children (Student)</p>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-customLightGray mb-1 ">Children</p>
                  <button
                    onClick={toggleSelectPopup}
                    className="p-2 px-3 rounded-lg bg-customMaroon text-xs text-white font-normal"
                  >
                    + Add
                  </button>
                </div>
                {selectedStudents.map((student, index) => (
                  <div
                    key={index}
                    className="flex flex-row items-center gap-2 mb-2"
                  >
                    <div className="relative inline-block">
                      {imageLoading && (
                        <div className="mx-2 h-[30px] w-[30px] flex justify-center items-center">
                          <Loader />
                        </div>
                      )}
                      <img
                        src={student.photo}
                        alt="student avatar"
                        className={`h-[45px] w-[45px] rounded-full ${
                          imageLoading ? "hidden" : "block"
                        }`}
                        onLoad={handleImageLoad}
                      />
                      <FaCircleMinus
                        className="absolute top-0 right-0 text-customLightRed cursor-pointer"
                        size={15}
                        onClick={() => handleRemoveStudent(index)}
                      />
                    </div>
                    <p className="font-normal text-sm">{student.name}</p>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Email Field  */}
          <div className="mb-5">
            <p className="text-customLightGray mb-1 ">Email</p>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Parent's Email"
              maxLength={35}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Phone number Field  */}
          {/* <div className="mb-5 ">
            <p className="text-customLightGray mb-1 ">PhoneNo</p>
            <div className="flex flex-row border border-gray-300 rounded-md shadow-md focus-within:outline-none focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-500">
              <PhoneInput
                country={"eg"}
                enableSearch={true}
                value={phoneNo}
                onChange={(phone, country, e, formattedValue) =>
                  setPhoneNo(formattedValue)
                }
                placeholder="Enter Phone No"
                maxLength={11}
                containerClass="phone-input-container"
                inputClass="phone-input"
                buttonClass="phone-input-button"
                className={`w-full pl-1 text-sm outline-none bg-white rounded-l-lg rounded-r-md ${
                  editedPopup ? "opacity-25" : "opacity-100"
                }`}
              />
            </div>
          </div> */}

          {/* </form> */}
          {/* Register Button  */}
          <div className="w-full flex items-center justify-center mt-10">
            {loader ? (
              <Loader />
            ) : (
              <button
                type="submit"
                onClick={handleUpdateClick}
                className="bg-customMaroon w-7/10 rounded-3xl py-3"
              >
                <p className=" text-white font-medium text-base">Update</p>
              </button>
            )}
          </div>
        </div>
      </div>
      {selectPopup && (
        <SelectChildrenPopup
          toggleFunc={toggleSelectPopup}
          setSelectedStudents={setSelectedStudents}
          selectedStudents={selectedStudents}
        />
      )}
    </div>
  );
}
