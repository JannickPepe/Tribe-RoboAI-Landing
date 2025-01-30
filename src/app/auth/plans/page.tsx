"use client";

import React, { useEffect, useState } from "react";
import ProtectedRoute from "../ProtectedRoute";

const PlansPage = () => {
    interface Plan {
        title: string;
        description: string;
        features: string[];
        price: string | number | null;
    }

    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

    useEffect(() => {
        // Retrieve the selected plan from localStorage
        const planData = localStorage.getItem("selectedPlan");

        if (planData) {
            setSelectedPlan(JSON.parse(planData));
        }
    }, []);

    return (
        <ProtectedRoute>
            <div className="flex flex-col items-center py-12">
                {selectedPlan ? (
                    selectedPlan.title === "Enterprise" ? (
                    // Special case for Enterprise plan
                    <>
                        <h1 className="text-4xl font-bold text-gray-200">
                            Contact Us for Enterprise
                        </h1>
                        <p className="text-lg max-w-xl mx-auto text-center text-gray-400 mt-4">
                            Our Enterprise plan is tailored to your needs. Contact our team for more details on custom solutions and pricing.
                        </p>

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

                        <a
                            href="mailto:support@yourcompany.com"
                            className="mt-6 px-6 py-3 bg-indigo-600 text-white text-lg rounded-lg hover:bg-purple-700 transition"
                        >
                            Contact Us
                        </a>
                    </>
                ) : (
                    // Normal case for other plans
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

                        <button className="mt-6 px-6 py-3 bg-indigo-600 text-white text-lg rounded-lg hover:bg-purple-700 transition" >
                            Verify the Plan
                        </button>
                    </>
                )
                ) : (
                    <h1 className="text-3xl text-gray-200">No plan selected.</h1>
                )}
            </div>
        </ProtectedRoute>
    );
};

export default PlansPage;
