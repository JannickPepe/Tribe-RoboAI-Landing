"use client";

import React, { useEffect, useState } from "react";
import ProtectedRoute from "../ProtectedRoute";
import { SectionBorder } from "@/components/SectionBorder";
import { SectionContent } from "@/components/SectionContent";

interface Plan {
  title: string;
  description: string;
  price: string | number | null;
}

const ProfilePage = () => {
  const [verifiedPlan, setVerifiedPlan] = useState<Plan | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [createdAt, setCreatedAt] = useState<string | null>(null);


  useEffect(() => {
    // Retrieve the verified plan from localStorage
    const storedPlan = localStorage.getItem("verifiedPlan");
    if (storedPlan) {
      setVerifiedPlan(JSON.parse(storedPlan));
    }
    // Retrieve user email and account creation date
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");
    const storedDate = localStorage.getItem("createdAt");

    if (storedName) setUserName(storedName);
    if (storedEmail) setUserEmail(storedEmail);
    if (storedDate) {
      setCreatedAt(storedDate);
    }
  }, []);

  // Remove verified plan from localStorage
  const handleRemoveVerifiedPlan = () => {
    setVerifiedPlan(null);
    localStorage.removeItem("verifiedPlan"); // Delete from storage
    localStorage.removeItem("isVerified"); // Reset verification state
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center -mt-10 lg:-mt-32">
        <SectionBorder>
          <SectionContent className="relative isolate [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
            <div className="flex flex-col items-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-200">Profile</h1>

              <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-6">
                {/* User Info Box */}
                <div className="mt-6 border border-blue-500 bg-gray-900 py-4 px-6 rounded-xl w-full max-w-lg">
                  <div className="flex justify-between items-center gap-4"> 
                    <h2 className="text-2xl font-semibold text-gray-200">User Information</h2>
                    <p className="text-sm text-gray-400 ">
                      <span className="font-semibold">Created:</span> {createdAt || "Not available"}
                    </p>
                  </div>
                  <p className="text-lg text-gray-400 mt-4">
                    <span className="text-xl font-semibold">Name:</span> {userName || "Not available"}
                  </p>
                  <p className="text-lg text-gray-400 mt-2">
                    <span className="text-xl font-semibold">Email:</span> {userEmail || "Not available"}
                  </p>
                </div>

                {/* Plan Info Box */}
                <div className="mt-6 border border-purple-600 py-4 px-6 rounded-xl">
                  {verifiedPlan ? (
                    <>
                      <h2 className="text-2xl font-semibold text-gray-200">
                        Your chosen plan is {verifiedPlan.title}
                      </h2>
                      <p className="text-lg text-gray-400 mt-4">
                        <span className="text-xl font-semibold">Plan details:</span> {verifiedPlan.description}
                      </p>
                      {typeof verifiedPlan.price === "number" && (
                        <p className="text-lg text-gray-400 mt-2">
                          <span className="text-xl font-semibold">Price:</span> ${verifiedPlan.price}
                        </p>
                      )}

                      <button
                        onClick={handleRemoveVerifiedPlan}
                        className="mt-6 px-6 py-3 bg-red-600 text-white text-lg rounded-lg hover:bg-red-700 transition"
                      >
                        Remove Verified Plan
                      </button>
                    </>
                  ) : (
                    <p className="text-lg text-gray-400">No verified plan chosen.</p>
                  )}
                </div>
              </section>
            </div>
          </SectionContent>
        </SectionBorder>
      </div>
    </ProtectedRoute>
  );
};

export default ProfilePage;
