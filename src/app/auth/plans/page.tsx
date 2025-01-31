"use client";

import React, { useEffect, useState } from "react";
import ProtectedRoute from "../ProtectedRoute";
import Link from "next/link";
import Loader from "@/assets/images/loader-animated.svg";
import Image from "next/image";
import robotImg from "@/assets/images/robot.jpg";
import { SectionBorder } from "@/components/SectionBorder";
import { SectionContent } from "@/components/SectionContent";

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
      <div className="flex flex-col items-center">
        {isVerified ? (
          <>
            <SectionBorder>
              <SectionContent className="relative isolate [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
                <div className="-mt-10 lg:-mt-32 rounded-2xl border-2 overflow-hidden border-gradient relative flex">
                  <Image src={robotImg} alt="Robot image" loading="lazy" className="h-[300px] lg:h-[600px]" />
                  <div className="absolute top-2 md:bottom-4 lg:top-20 left-1/2 -translate-x-1/2 w-full px-[15px]">
                    <div className="bg-gray-950/80 flex items-center gap-4 px-4 py-2 rounded-2xl max-w-full">
                      <div className="font-semibold text-xl text-gray-100 mx-auto flex items-center gap-2">
                        <Loader className="text-violet-400" />
                        <h1 className="text-xl lg:text-4xl text-gray-200 text-center">
                          You have verified your plan.<br/> 
                          <Link href="/auth/profile" className="text-blue-400 underline">Go to your profile</Link>.
                        </h1>
                        <span className="animate-cursor-blink">|</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SectionContent>
            </SectionBorder>
          </>
          
        ) : selectedPlan ? (
          <div className="py-10 container">
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
          </div>
        ) : (
          <h1 className="text-3xl text-gray-200">No plan selected.</h1>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default PlansPage;
