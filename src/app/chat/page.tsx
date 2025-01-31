"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import aiChatImg from "@/assets/images/ai-chat-robo.webp";

const ChatPage = () => {
    const [messages, setMessages] = useState([
        { text: "Hey Emon...", sender: "bot", time: "6:30 pm" },
        { text: "Yeah, fine. What about you?", sender: "user", time: "6:30 pm" },
        { text: "Hey, I wanted to know about your experience on the UI/UX part.", sender: "bot", time: "6:32 pm" },
        { text: "Yes, I have experience of 3+ years on UI/UX.", sender: "user", time: "6:33 pm" },
    ]);

    const [input, setInput] = useState("");

    const handleSend = () => {
        if (input.trim() === "") return;
        setMessages([...messages, { text: input, sender: "user", time: "6:34 pm" }]);
        setInput("");
    };

    return (
        <div className="py-10 bg-black text-white flex flex-col items-center">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center container"
            >
                <h1 className="text-4xl lg:text-5xl font-bold text-gradient">Your Personal AI Advisor</h1>
                <p className="mt-4 text-gray-400 max-w-xl text-center mx-auto">
                    These are just a few of the many attractions Paris has to offer. Let me know if you&apos;d like more information
                    or details on anything specific!
                </p>
                <div className="mt-6 lg:flex items-center gap-4 justify-center space-y-2 lg:space-y-0">
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="px-4 py-2 text-black rounded-lg outline-none"
                    />
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition">
                        Join Beta
                    </button>
                </div>
            </motion.div>

            {/* Main Grid Section */}
            <div className="grid grid-cols-1 lg:grid-cols-5 items-center max-w-6xl gap-6 mt-12 container">
                {/* Chatbox */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="lg:col-span-3 bg-gray-900 border border-gray-700 rounded-2xl p-4 lg:p-6"
                >
                    <div className="flex flex-col space-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`${
                                        message.sender === "user" ? "bg-purple-700" : "bg-gray-700"
                                    } px-4 py-2 rounded-lg max-w-xs text-sm`}
                                >
                                    {message.text}
                                    <div className="text-xs text-gray-300 mt-1">{message.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 flex items-center gap-4">
                        <input
                            type="text"
                            placeholder="Write a message"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 px-4 py-2 text-black rounded-lg outline-none"
                        />
                        <button
                            onClick={handleSend}
                            className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition"
                        >
                            Send
                        </button>
                    </div>
                </motion.div>

                {/* Robot Image */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="lg:col-span-2"
                >
                    <Image
                        src={aiChatImg}
                        loading="lazy"
                        alt="AI Chat Robo"
                        className="max-h-[400px] object-contain w-auto rounded-lg"
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default ChatPage;
