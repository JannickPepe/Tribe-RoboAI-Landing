"use client";

import { Button } from "@/components/Button";
import { SectionBorder } from "@/components/SectionBorder";
import { SectionContent } from "@/components/SectionContent";
import { twMerge } from "tailwind-merge";
import { ButtonProps } from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const pricingTiers = [
  {
    title: "Basic",
    description: "AI chatbot, personalized recommendations",
    price: "Free",
    buttonText: "Get Started",
    buttonVariant: "secondary",
    features: [
      "Access to AI chatbot for natural language conversations",
      "Basic task automation for simple workflows",
      "Limited message history storage",
    ],
    color: "amber",
    className: "lg:py-12 lg:my-6",
  },
  {
    title: "Premium",
    description: "Advanced AI capabilities for enhanced productivity",
    price: 99,
    buttonText: "Upgrade to Premium",
    buttonVariant: "secondary",
    features: [
      "All Basic features included",
      "Priority access to new AI features and updates",
      "Advanced automation tools for seamless task management",
      "Customizable chat templates for your specific workflows",
    ],
    color: "violet",
    className: "lg:py-18 lg:my-0",
  },
  {
    title: "Enterprise",
    description: "Custom AI chatbot, advanced analytics, dedicated account",
    price: null,
    buttonText: "Contact Us",
    buttonVariant: "primary",
    features: [
      "All Premium features included",
      "Dedicated account manager and priority customer support",
      "Enhanced security and compliance features for large teams",
      "Custom AI models tailored to your organization's needs",
      "API access for seamless integration with enterprise systems",
    ],
    color: "teal",
    className: "lg:py-12 lg:my-6",
  },
] satisfies {
  title: string;
  description: string;
  price: string | number | null;
  buttonText: string;
  buttonVariant?: ButtonProps["variant"];
  features: string[];
  color: string;
  className: string;
}[];

type Plan = {
  title: string;
  description: string;
  price: string | number | null;
  buttonText: string;
  buttonVariant?: ButtonProps["variant"];
  features: string[];
  color: string;
  className: string;
};


export const Pricing = () => {
  
  const router = useRouter();
  const [verifiedPlan, setVerifiedPlan] = useState<Plan | null>(null);

  useEffect(() => {
    // Check if the user already has a verified plan
    const storedPlan = localStorage.getItem("verifiedPlan");
    if (storedPlan) {
      setVerifiedPlan(JSON.parse(storedPlan));
    }
  }, []);

  // Handle button click logic
  const handleClick = (tier: typeof pricingTiers[number]) => {
    if (verifiedPlan) return; // Prevent selecting a new plan if already verified

    const loggedIn = localStorage.getItem("loggedIn");
    localStorage.setItem("selectedPlan", JSON.stringify(tier)); // Store selected plan

    if (loggedIn === "true") {
      router.push("/auth/plans");
    } else {
      router.push("/login");
    }
  };

  return (
    <section id="pricing">
      <div className="container">
        <SectionBorder borderTop>
          <SectionContent>
            <h2 className="text-3xl md:text-4xl lg:text-5xl leading-tight font-semibold text-center text-gray-200">
              Flexible plans for every need
            </h2>

            <div className="mt-12 flex flex-col lg:flex-row lg:items-start gap-8">
              {pricingTiers.map((tier) => {
                const isPlanLocked = verifiedPlan !== null; // Check if a plan is verified

                return (
                  <div
                    key={tier.title}
                    className={twMerge(
                      "border border-[var(--color-border)] rounded-3xl px-6 py-12 max-w-sm mx-auto flex-1",
                      tier.className
                    )}
                  >
                    <h3
                      className={twMerge(
                        "font-semibold text-4xl",
                        tier.color === "violet" && "text-violet-400",
                        tier.color === "amber" && "text-amber-300",
                        tier.color === "teal" && "text-teal-300"
                      )}
                    >
                      {tier.title}
                    </h3>
                    <p className="mt-4 text-gray-400">{tier.description}</p>

                    <div className="mt-8">
                      {typeof tier.price === "number" && (
                        <span className="text-2xl font-semibold text-gray-200 align-top">
                          $
                        </span>
                      )}
                      <span className="text-7xl font-semibold text-gray-200">
                        {tier.price ? tier.price : <>&nbsp;</>}
                      </span>
                    </div>

                    {/* Button Logic */}
                    <div onClick={() => handleClick(tier)}>
                    <Button
                      className="mt-8"
                      block
                      variant={isPlanLocked ? "disabled" : tier.buttonVariant} // Disable button if verified
                      disabled={isPlanLocked} // ✅ No more type error
                    >
                      {isPlanLocked ? "Already have a plan" : tier.buttonText}
                    </Button>
                    </div>

                    <ul className="flex flex-col gap-4 mt-8">
                      {tier.features.map((feature) => (
                        <li
                          key={feature}
                          className="border-t border-[var(--color-border)] pt-4 flex gap-4"
                        >
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="size-6 text-violet-400 flex-shrink-0"
                          />
                          <span className="font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </SectionContent>
        </SectionBorder>
      </div>
    </section>
  );
};

export default Pricing;
