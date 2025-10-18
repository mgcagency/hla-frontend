import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IMAGES } from "../../assets";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Loader/Loader";
import { useUser } from "../../contexts/UserContext";
import { login, sendCode, verifyCode } from "../../api/authApi";

export default function TeacherLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [code, setCode] = useState("");
  const [verifyActive, setVerifyActive] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const { user, setUser } = useUser();

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSendCodeClick = async () => {
    setLoader(true);
    try {
      const resp = await sendCode({ email });
      if (resp.success) {
        toast.success("Check you email for an otp");
        setVerifyActive(true);
      }
    } catch (error) {
      console.log(" error wile sending the code ", error);
    }
    setLoader(false);
  };

  const handleLoginClick = async () => {
    // Add your authentication logic here if needed
    try {
      if (email === "" || password === "") {
        toast.error("Please fill all the fields.");
        return;
      }
      setLoader(true);

      // const verifyresp = await verifyCode({ email, code });
      // if (verifyresp.success) {
        const response = await login({ email, password });
        if (response === "big error") {
          toast.error("Login failed. Please check your credentials.");
          setLoader(false);
          return;
        } else {
          if (response.user.role !== "teacher") {
            toast.error("You are not authorized to login as teacher.");
            setLoader(false);
            return;
          } else {
            setUser(response.user);
            console.log(user);
            localStorage.setItem("user", JSON.stringify(response.user));
            toast.success("Login Successful");
            setTimeout(() => {
              navigate("/teacher/dashboard");
            }, 2000);
            setLoader(true);
          }
        }
      // }else{
      //   toast.error("Invalid Code!");
      //   setLoader(true);
      // }
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const handleSubmit = () => {};

  return (
    <div className="bg-custom-gradient w-auto h-auto">
      <ToastContainer position="bottom-right" />

      <div className="flex flex-col lg:flex-row min-h-screen ">
        {/* Left Div  */}
        <div className="flex-1 lg:ml-20 flex flex-col items-center font-sans justify-center custom_size:items-center p-4 lg:p-0">
          <div className="bg-white rounded-lg p-5 w-[400px]">
            {/* Login title  */}
            <div className="flex justify-center mb-4">
              <p className="text-2xl  font-medium ">Teacher Login</p>
            </div>

            {/* Email Field  */}
            {/* <form action=""> */}
            {!verifyActive && (
              <>
                <div className="mb-4">
                  <p className="text-customLightGray  text-sm mb-1 ">Email</p>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="abc@rosewood.com"
                    maxLength={35}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* Password Field  */}
                <div className="mb-4">
                  <p className="text-customLightGray  text-sm mb-1">Password</p>
                  <div className="flex flex-row items-center border border-gray-300 rounded-md shadow-md focus-within:outline-none focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-500">
                    <input
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={`${showPassword ? "text" : "password"}`}
                      placeholder="******"
                      maxLength={25}
                      className="w-full px-3 py-2 outline-none rounded-md"
                    />
                    <button onClick={handlePassword}>
                      {showPassword ? (
                        <AiOutlineEye
                          size={25}
                          color="Gray"
                          className="ml-3 mr-2"
                        />
                      ) : (
                        <AiOutlineEyeInvisible
                          size={25}
                          color="Gray"
                          className="ml-3 mr-2"
                        />
                      )}
                    </button>
                  </div>
                </div>
                {/* </form> */}

                {/* Remember me check & Forget Password Div */}
                <div className="flex flex-row justify-between mb-5">
                  {/* Remember me */}
                  <div className="flex items-center">
                    <input type="checkbox" id="rememberMe" className="mr-1" />
                    <p className="text-customLightGray  font-medium text-xs">
                      Remember me
                    </p>
                  </div>

                  {/* Forget Password */}
                   <div>
                    <Link to="/forgot-password">
                        <p className="text-customYellow font-medium text-xs hover:underline cursor-pointer">
                            Forgot Password ?
                        </p>
                    </Link>
                  </div>
                </div>

                {/* Login Button  */}
                <div className="w-full flex items-center justify-center">
                  {loader ? (
                    <Loader />
                  ) : (
                    <button
                      type="submit"
                      onClick={handleLoginClick}
                      className="bg-customMaroon w-7/10 rounded-3xl py-3"
                    >
                      <p className=" text-white font-medium">Log In</p>
                    </button>
                  )}
                </div>
              </>
            )}

            {verifyActive && (
              <>
                <div className="mb-4">
                  <p className="text-customLightGray  text-sm mb-1 ">Code</p>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="1234"
                    maxLength={35}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* Login Button  */}
                <div className="w-full flex items-center justify-center">
                  {loader ? (
                    <Loader />
                  ) : (
                    <button
                      type="submit"
                      onClick={handleLoginClick}
                      className="bg-customMaroon w-7/10 rounded-3xl py-3"
                    >
                      <p className=" text-white font-medium">Verify</p>
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Div */}
        <div className="flex-1 flex justify-center items-center w-[auto] lg:w-[580px] h-[300px] lg:h-auto opacity-100 m-6 rounded-2xl">
          <img
            src={IMAGES.main_logo}
            alt="Academy Logo"
            className="h-[380px] w-[380px] lg:h-[390px] lg:w-[390px]"
          />
        </div>
      </div> 
    </div>
  );
}
