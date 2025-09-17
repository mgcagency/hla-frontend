import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="bg-custom-gradient w-auto h-auto">
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        {/* Card */}
        <div className="bg-white rounded-lg p-6 w-full max-w-[600px] shadow-lg">
          {/* Title */}
          <div className="flex justify-center mb-4">
            <p className="text-2xl font-medium">Privacy & Policy</p>
          </div>

          {/* Content */}
          <div className="text-gray-600 text-sm leading-relaxed space-y-4">
            <p>
              This Privacy Policy explains how we collect, use, and safeguard your information when you use our services.
            </p>
            <p>
              We are committed to protecting your personal data and ensuring that your privacy is respected.
            </p>
            <p>
              Any information collected will only be used to improve our services, communicate with you, and comply with legal requirements.
            </p>
            <p>
              By using our platform, you agree to the terms outlined in this Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
