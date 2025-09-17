import React, { useState } from "react";
import { IMAGES } from "../../assets";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../api/authApi";


export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); 
  const [loading, setLoading] = useState(false);


   const handleResetPassword = async () => {
  if (!email) {
    setMessage("Please enter your email");
    return;
  }

  setLoading(true);
  setMessage(""); // clear previous

  const msg = await forgotPassword({ email });
  setMessage(msg); // always a string now

  setLoading(false);
};

  return (
    <div className="bg-custom-gradient w-auto h-auto">
      <div className="flex flex-col lg:flex-row min-h-screen ">
        {/* Left Div */}
        <div className="flex-1 lg:ml-20 flex flex-col items-center font-sans justify-center custom_size:items-center p-4 lg:p-0">
          <div className="bg-white rounded-lg p-5 w-[400px]">
            {/* Title */}
            <div className="flex justify-center mb-4">
              <p className="text-2xl font-medium">Forgot Password</p>
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <p className="text-customLightGray text-sm mb-1">Email</p>
              <input
                type="email"
                required
                placeholder="abc@rosewood.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={35}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            {message && (
              <p className="text-center text-sm mb-3 text-red-500">{message}</p>
            )}

            {/* Reset Button */}
          <div className="w-full flex items-center justify-center mt-6">
              <button
                type="button"
                onClick={handleResetPassword}
                disabled={loading}
                className={`bg-customMaroon w-7/10 rounded-3xl py-3 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <p className="text-white font-medium">
                  {loading ? "Sending..." : "Reset Password"}
                </p>
              </button>
            </div>

            {/* Back to Login */}
            {/* <div className="flex justify-center mt-4">
              <Link to="/admin/login">
                <p className="text-customYellow font-medium text-xs hover:underline cursor-pointer">
                  Back to Login
                </p>
              </Link>
            </div> */}
          </div>
        </div>

        {/* Right Div */}
        <div className="flex-1 flex justify-center items-center bg-customWhite30 w-[auto] lg:w-[580px] h-[300px] lg:h-auto border-2 border-customWhite30 opacity-100 m-6 rounded-2xl">
          <img
            src={IMAGES.main_logo}
            alt="Academy Logo"
            className="h-[150px] w-[150px] lg:h-[230px] lg:w-[230px]"
          />
        </div>
      </div>
    </div>
  );
}
