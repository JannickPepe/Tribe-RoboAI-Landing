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
  const [chatEmail, setChatEmail] = useState<string | null>(null);
  const [messageCount, setMessageCount] = useState<number>(0);

  // Function to calculate message count
  const updateMessageCount = (email: string | null) => {
    if (!email) {
      setMessageCount(0);
      return;
    }
    const savedMessages = localStorage.getItem(`chatMessages_${email}`);
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages);
      const userMessages = parsedMessages.filter((msg: { sender: string }) => msg.sender === "user");
      setMessageCount(userMessages.length);
    } else {
      setMessageCount(0);
    }
  };

  useEffect(() => {
    // Retrieve user information from localStorage
    const storedPlan = localStorage.getItem("verifiedPlan");
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");
    const storedDate = localStorage.getItem("createdAt");
    const storedChatEmail = localStorage.getItem("chatEmail");

    if (storedPlan) setVerifiedPlan(JSON.parse(storedPlan));
    if (storedName) setUserName(storedName);
    if (storedEmail) setUserEmail(storedEmail);
    if (storedDate) setCreatedAt(storedDate);
    if (storedChatEmail) setChatEmail(storedChatEmail);

    // Update message count for either storedChatEmail or userEmail
    updateMessageCount(storedChatEmail || storedEmail);
  }, []);

  // Handle chat activity removal (delete messages and session)
  const handleRemoveChatActivity = () => {
    if (chatEmail) {
      localStorage.removeItem(`chatMessages_${chatEmail}`);
      localStorage.removeItem("chatEmail");
      setChatEmail(null);
      setMessageCount(0);
    }
  };

  // Handle session removal (end chat session but retain messages)
  const handleRemoveChatHistory = () => {
    localStorage.removeItem("chatEmail");
    setChatEmail(null);
    updateMessageCount(userEmail); // Refresh the count based on stored user email
  };

  // Handle plan removal
  const handleRemoveVerifiedPlan = () => {
    setVerifiedPlan(null);
    localStorage.removeItem("verifiedPlan");
    localStorage.removeItem("isVerified");
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

                  {chatEmail || messageCount > 0 ? (
                    <div>
                      <p className="text-lg text-green-400 mt-4">
                        <span className="text-xl font-semibold">AI Chat Status:</span>{" "}
                        {chatEmail ? "Active" : "Session Ended"}
                      </p>
                      <p className="text-lg text-gray-400 mt-2">
                        <span className="text-xl font-semibold">Messages Sent:</span> {messageCount}
                      </p>

                      <div className="flex justify-start items-center gap-4">
                        <button
                          onClick={handleRemoveChatActivity}
                          className="mt-4 px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition"
                        >
                          Delete AI Chat
                        </button>

                        {chatEmail && (
                          <div className="flex justify-start items-center gap-4">
                            <button
                              onClick={handleRemoveChatHistory}
                              className="mt-4 px-4 py-2 border border-red-600 text-neutral-300 text-sm rounded-lg hover:bg-red-700 hover:text-white transition"
                            >
                              End Chat Session
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4">
                      <p className="text-lg text-gray-400">
                        No AI chat,{" "}
                        <a href="/chat" className="text-blue-400 hover:underline">
                          start here
                        </a>.
                      </p>
                      <p className="text-lg text-gray-400 mt-2">
                        <span className="text-xl font-semibold">Messages Sent:</span> {messageCount}
                      </p>
                    </div>
                  )}
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
