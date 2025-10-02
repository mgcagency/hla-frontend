import React, { useState } from "react";
import { IMAGES } from "../../../assets";
import { RiCloseLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editUser } from "../../../api/Admin/editUser";
import { useGetUsers } from "../../../contexts/GetUsersContext";
import "react-phone-input-2/lib/style.css";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../contexts/UserContext";

export default function EditProfile({
prevuser,
  toggleFunc,
  toggleEditedPopup,
  editedPopup,
}) {
  const [name, setName] = useState(prevuser.name);
  const [email, setEmail] = useState(prevuser.email);
  const [phoneNo, setPhoneNo] = useState(prevuser.phoneNo);
  const [photo, setPhoto] = useState(prevuser.photo);

  const [loader, setLoader] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState(prevuser.photo);
  const navigate = useNavigate();

  const { user,setUser } = useUser();

  const uploadFile = async () => {
    if (photo === prevuser.photo) {
      return prevuser.photo;
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
    if (name !== "" && email !== "") {
      const updatedUser = {
        name,
        email,
        phoneNo,
        photo: fileUrl,
      };

      try {
        const response = await editUser(updatedUser, prevuser?._id);
        console.log("response:", response )
        localStorage.setItem("user", JSON.stringify(response));
        // refetch();
        setUser(response);
        toast.success("Updating Successful"); // Show success message
        toggleEditedPopup();
      } catch (error) {
        toast.error("Failed to update User details");
        console.error("Error updating User details:", error);
      }
    } else {
      toast.error("Please fill all the fields");
    }
    setLoader(false);
  };

  return (
    <div className="h-screen rounded-l-3xl bg-customNewStudentCardColor absolute flex justify-end right-0 font-sans ">
      {editedPopup && <div className="bg-black fixed inset-0 opacity-50"></div>}
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
          <p className=" mt-6 font-medium text-2xl">Update Profile</p>
        </div>

        {/* Student Pic  */}
        <div className="flex-1 flex justify-center">
          {/* <img
            src={prevuser?.photo || IMAGES.student_avatar}
            alt="New Student Pic"
            className="w-[100px] h-[100px] rounded-full"
          ></img> */}
        <input
          type="file"
          id="file"
          onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            setPhoto(file); // keep file for upload
            setPreviewPhoto(URL.createObjectURL(file)); // temporary preview
          }
        }}
        className="hidden"
      />

          <img
            src={previewPhoto || IMAGES.student_avatar} // show preview
            alt="User Pic"
            className="w-[100px] h-[100px] rounded-full"
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
          <div className="mb-4">
            <p className="text-customLightGray mb-1 ">User Name</p>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
              maxLength={35}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Email Field  */}
          <div className="mb-4">
            <p className="text-customLightGray mb-1 ">Email</p>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              maxLength={35}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* </form> */}
          {/* Register Button  */}
          <div className="w-full flex items-center justify-center mt-10 mb-8">
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
    </div>
  );
}
