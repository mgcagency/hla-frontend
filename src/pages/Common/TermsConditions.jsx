import React from "react";

export default function TermsConditions() {
  return (
    <div className="bg-custom-gradient w-auto h-auto">
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        {/* Card */}
        <div className="bg-white rounded-lg p-6 w-full max-w-[600px] shadow-lg">
          {/* Title */}
          <div className="flex justify-center mb-4">
            <p className="text-2xl font-medium">Terms & Conditions</p>
          </div>

          {/* Content */}
          <div className="text-gray-600 text-sm leading-relaxed space-y-4">
            <p>
              Welcome to our platform. By accessing or using our services, you agree to comply with the following Terms & Conditions. 
            </p>
            <p>
              You must not misuse our services or attempt to disrupt their functionality. Any unauthorized use may result in termination of your account. 
            </p>
            <p>
              All content, trademarks, and data provided on this platform are owned by us and may not be copied or redistributed without permission. 
            </p>
            <p>
              We reserve the right to update these Terms & Conditions at any time. Continued use of our services indicates your acceptance of any changes.
            </p>
            <p>
              If you do not agree with any part of these Terms, please discontinue use of our services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
