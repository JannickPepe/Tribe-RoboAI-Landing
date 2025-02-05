"use client";

import React, { useEffect, useRef, useState } from "react";
import ProtectedRoute from "../ProtectedRoute";
import Link from "next/link";
import Loader from "@/assets/images/loader-animated.svg";
import Image from "next/image";
import robotImg from "@/assets/images/robot.jpg";
import { SectionBorder } from "@/components/SectionBorder";
import { SectionContent } from "@/components/SectionContent";
import { Button } from "@/components/Button";
import underlineImage from "@/assets/images/underline.svg?url";
import { usePathname, useRouter } from "next/navigation";
import { FiZap } from "react-icons/fi";

import { motion, useScroll, useTransform } from "framer-motion"

export const navItems = [
  {
    name: "Pricing",
    href: "#pricing",
  },
];

interface Plan {
  title: string;
  description: string;
  features: string[];
  price: string | number | null;
}

const PlansPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

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

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();

    if (pathname !== "/") {
      // If user is not on home page, go to home first
      router.push(`/${href}`);
      return;
    }

    // Scroll to section if already on the homepage
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

   const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["end start", "start end"],
  });
  const transformedY = useTransform(scrollYProgress, [0, 1], [200, -200]);

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
                      </div>
                    </div>
                  </div>
                </div>
              </SectionContent>
            </SectionBorder>
          </>
          
        ) : selectedPlan ? (
          <div className="py-10 container max-w-4xl">
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
              <Button onClick={handleVerifyPlan} className="h-12">
                <p className="text-xs md:text-sm">Verify the Plan</p>
              </Button>

              <button
                onClick={handleRemovePlan}
                className="px-6 py-2 bg-red-600 text-white text-lg rounded-lg hover:bg-red-700 transition"
              >
                Remove Plan
              </button>
            </div>
          </div>
        ) : (
          <section className="container text-center py-16">
            <h1 className="text-5xl text-gray-200">No plan selected.</h1>
            <div className="text-xl mt-2 max-w-lg mx-auto">
              You can go to the{" "} 
              <span className="relative isolate">
                {navItems.map(({ name, href }) => (
                  <a  
                    href={href}
                    key={href}  
                    onClick={(e) => {
                      handleNavClick(e, href)
                      const element = document.querySelector(href);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    {name},{" "}
                  </a>
                ))}
                <span
                  className="absolute top-8 left-0 w-full -translate-y-1/2 h-4 bg-[linear-gradient(to_right,var(--color-amber-300),var(--color-teal-300),var(--color-violet-400),var(--color-fuchsia-400))]"
                  style={{
                    maskImage: `url(${underlineImage.src})`,
                    maskSize: "contain",
                    maskPosition: "top",
                    maskRepeat: "no-repeat",
                  }}
                ></span>
              </span>
              where you will be able to chose 1 out of 3 different plans.
            </div>

            <div className="relative isolate max-w-3xl mx-auto">
              <div className="absolute left-0 z-10 top-[30%] -translate-x-10 hidden lg:block">
                <motion.div
                  className="bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-xl p-4 w-72"
                  style={{
                    y: transformedY,
                  }}
                >
                  <div>
                    Can you generate an incredible frontend dev video tutorial?
                  </div>
                  <div className="text-right text-gray-400 text-sm font-semibold flex items-center justify-between">
                    <FiZap className="size-4 text-purple-600" /> <span>1m ago</span>
                  </div>
                </motion.div>
              </div>
              <div className="absolute right-0 z-10 top-[50%] translate-x-10 hidden lg:block">
                <motion.div
                  className="bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-xl p-4 w-72"
                  style={{
                    y: transformedY,
                  }}
                >
                  <div>
                    <strong>Brainwave:</strong> I created one based on videos
                    from NighteCoding!
                  </div>
                  <div className="text-right text-gray-400 text-sm font-semibold flex items-center justify-between">
                    <FiZap className="size-4 text-purple-600" /> <span>Just now</span>
                  </div>
                </motion.div>
              </div>
              <div className="mt-10 rounded-2xl border-2 overflow-hidden border-gradient relative flex">
                <Image src={robotImg} alt="Robot image" />
              </div>
              </div>
          </section>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default PlansPage;
