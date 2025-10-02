import React, { useState } from "react";
import { IMAGES } from "../../../assets";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RiCloseLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { addUser } from "../../../api/Admin/addUser";
import { useGetUsers } from "../../../contexts/GetUsersContext";
import Loader from "../../Loader/Loader";
import SelectTeacherPopup from "../Schedule_Classes/SelectTeacherPopup";

export default function AddStudent({
  toggleFunc,
  toggleAddedPopup,
  addedPopup,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfrimPassword, setShowConfrimPassword] = useState(false);

  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [selectTPopup, setSelectTPopup] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const [loader, setLoader] = useState(false);

  const { refetch } = useGetUsers();

  const uploadFile = async () => {
    if (photo === "") {
      return IMAGES.student_avatar;
    }
    const storage = getStorage();
    const storageRef = ref(storage, photo?.name);

    // 'file' comes from the Blob or File API
    const response = await uploadBytes(storageRef, photo);
    const fileUrl = await getDownloadURL(response.ref);
    return fileUrl;
  };

  const handleAddClick = async () => {
    setLoader(true);
    const fileUrl = await uploadFile();
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      const newStudent = {
        name,
        email,
        teacher:selectedTeacher._id,
        phoneNo,
        photo: fileUrl,
        password,
        role: "student",
        confirmPassword,
      };
      try {
        const response = await addUser(newStudent);
        refetch();
        toast.success("New Student Added Successfully");
        toggleAddedPopup();
      } catch (error) {
        toast.error("Failed to add new student");
        console.error("Error adding new student:", error);
      }
    } else {
      toast.error("Please fill all the fields");
    }
    setLoader(false);
  };

  const toggleSelectTPopup = () => {
    setSelectTPopup(!selectTPopup);
  };


  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPassword = () => {
    setShowConfrimPassword(!showConfrimPassword);
  };
  return (
    <div className="h-screen overflow-y-auto register-scrollbar3 rounded-l-3xl bg-customNewStudentCardColor absolute flex justify-end right-0 font-sans ">
      {addedPopup && <div className="bg-black fixed inset-0 opacity-50"></div>}
      {selectTPopup && ( <div className="bg-black fixed inset-0 opacity-50"></div> )}
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
          <p className=" mt-6 font-medium text-2xl">New Student</p>
        </div>

        {/* Student Pic  */}
        <div className="flex-1 flex justify-center">
          <img
            src={IMAGES.student_avatar}
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
          <div className="mb-4">
            <p className="text-customLightGray mb-1 ">Student Name</p>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Student Name"
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
              placeholder="Enter Student's Email"
              maxLength={35}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {selectTPopup && (
            <SelectTeacherPopup toggleFunc={toggleSelectTPopup} setSelectedTeacher={setSelectedTeacher} selectedTeacher={selectedTeacher} />
          )}

          {/* Select Teacher Field  */}
          <div className="mb-5">
            {!selectedTeacher ? (
              <>
                <p className="text-customLightGray mb-1 ">Teacher</p>
                <div
                  onClick={toggleSelectTPopup}
                  className="w-full px-4 py-2 text-sm text-customLightGray bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  <p>+ Assign Teacher</p>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-customLightGray mb-1 ">Teacher</p>
                </div>
                <div
                  onClick={toggleSelectTPopup}
                  className="flex flex-row items-center gap-2 mb-2 cursor-pointer"
                >
                  <div className="relative inline-block">
                    <img
                      src={selectedTeacher.photo}
                      alt="teacher avatar"
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                  <p className="font-normal text-sm">{selectedTeacher.name}</p>
                </div>
              </>
            )}
          </div>

          {/* Phone number Field  */}
          {/* <div className="mb-4 ">
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
                  addedPopup ? "opacity-15 " : "opacity-100"
                }`}
              />
            </div>
          </div> */}
          {/* <select className="rounded-l-md outline-none pl-2">
                <option>+1</option>
                <option>+44</option>
                <option>+92</option>
                <option>+91</option>
              </select>
              <input
                type="tel"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                placeholder="Enter Phone No"
                maxLength={11}
                className="w-full px-3 py-2 text-sm outline-none rounded-r-md"
              /> */}

          {/* Password Field  */}
          <div className="mb-4">
            <p className="text-customLightGray mb-1">Password</p>
            <div className="flex flex-row items-center bg-white border border-gray-300 rounded-md shadow-md focus-within:outline-none focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-500">
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={`${showPassword ? "text" : "password"}`}
                placeholder="Enter Password"
                maxLength={25}
                className="w-full px-3 py-2 text-sm outline-none rounded-md"
              />
              <button onClick={handlePassword}>
                {showPassword ? (
                  <AiOutlineEye size={20} color="Gray" className="ml-3 mr-2" />
                ) : (
                  <AiOutlineEyeInvisible
                    size={20}
                    color="Gray"
                    className="ml-3 mr-2"
                  />
                )}
              </button>
            </div>
          </div>

          {/*Confirm Password Field  */}
          <div className="mb-4">
            <p className="text-customLightGray  mb-1">Confirm Password</p>
            <div className="flex flex-row items-center bg-white border border-gray-300 rounded-md shadow-md focus-within:outline-none focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-500">
              <input
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={`${showConfrimPassword ? "text" : "password"}`}
                placeholder="Enter Confirm Password"
                maxLength={25}
                className="w-full px-3 py-2 text-sm outline-none rounded-md"
              />
              <button onClick={handleConfirmPassword}>
                {showConfrimPassword ? (
                  <AiOutlineEye size={20} color="Gray" className="ml-3 mr-2" />
                ) : (
                  <AiOutlineEyeInvisible
                    size={20}
                    color="Gray"
                    className="ml-3 mr-2"
                  />
                )}
              </button>
            </div>
          </div>
          {/* </form> */}
          {/* Register Button  */}
          <div className="w-full flex items-center justify-center mt-10 mb-8">
            {loader ? (
              <Loader />
            ) : (
              <button
                type="submit"
                onClick={handleAddClick}
                className="bg-customMaroon w-7/10 rounded-3xl py-3"
              >
                <p className=" text-white font-medium text-base">
                  Register Account
                </p>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
