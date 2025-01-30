"use client";

import React, { useEffect, useState } from "react";
import ProtectedRoute from "../ProtectedRoute";
import Link from "next/link";

const PlansPage = () => {
  interface Plan {
    title: string;
    description: string;
    features: string[];
    price: string | number | null;
  }

  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // Retrieve the selected plan and verification status from localStorage
    const planData = localStorage.getItem("selectedPlan");
    const verifiedStatus = localStorage.getItem("isVerified");

    if (planData) {
      setSelectedPlan(JSON.parse(planData));
    }

    if (verifiedStatus === "true") {
      setIsVerified(true);
    }
  }, []);

  // Remove the selected plan from both state and localStorage
  const handleRemovePlan = () => {
    setSelectedPlan(null);
    localStorage.removeItem("selectedPlan");
    localStorage.removeItem("verifiedPlan"); // Also remove from profile storage
    localStorage.removeItem("isVerified"); // Reset verification state
    setIsVerified(false);
  };

  // Verify the selected plan and save it permanently
  const handleVerifyPlan = () => {
    if (selectedPlan) {
      localStorage.setItem("verifiedPlan", JSON.stringify(selectedPlan)); // Save permanently
      localStorage.setItem("isVerified", "true"); // Mark as verified
      setSelectedPlan(null); // Remove from state
      setIsVerified(true); // Show verification message
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center py-12">
        {isVerified ? (
          <h1 className="text-3xl text-gray-200">
            You have verified your plan. <Link href="/auth/profile" className="text-blue-400 underline">Go to your profile</Link>.
          </h1>
        ) : selectedPlan ? (
          <>
            <h1 className="text-4xl font-bold text-gray-200">
              You have chosen the {selectedPlan.title} plan
            </h1>
            <div className="mt-4">
              {typeof selectedPlan.price === "number" && (
                <span className="text-2xl font-semibold text-gray-200 align-top">
                  $
                </span>
              )}
              <span className="text-4xl font-semibold text-gray-200">
                {selectedPlan.price ? selectedPlan.price : <>&nbsp;</>}
              </span>
            </div>

            <div className="border border-purple-600 py-4 px-6 mt-4 rounded-xl">
              <p className="text-lg text-gray-400">
                <span className="text-2xl font-semibold">Information:</span>{" "}
                {selectedPlan.description}
              </p>

              <div className="mt-6">
                <h2 className="text-2xl font-semibold text-gray-200">
                  Features:
                </h2>
                <ul className="mt-4 list-disc list-inside text-gray-300">
                  {selectedPlan.features.map((feature: string) => (
                    <li key={feature} className="mt-2">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-4">
              <button
                onClick={handleVerifyPlan}
                className="px-6 py-3 bg-indigo-600 text-white text-lg rounded-lg hover:bg-purple-700 transition"
              >
                Verify the Plan
              </button>

              <button
                onClick={handleRemovePlan}
                className="px-6 py-3 bg-red-600 text-white text-lg rounded-lg hover:bg-red-700 transition"
              >
                Remove Plan
              </button>
            </div>
          </>
        ) : (
          <h1 className="text-3xl text-gray-200">No plan selected.</h1>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default PlansPage;
