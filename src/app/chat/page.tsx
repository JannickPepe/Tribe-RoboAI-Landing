"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Link from "next/link";
import aiChatImg from "@/assets/images/ai-chat-robo.webp";
import { getRandomResponse } from "@/utils/chatResponses";

interface ChatModalProps {
    onClose: () => void;
    messages: { text: string; sender: string; time: string }[];
    handleSend: () => void;
    input: string;
    setInput: (input: string) => void;
}

const ChatModal = ({ onClose, messages, handleSend, input, setInput }: ChatModalProps) => {
    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-900 rounded-2xl max-w-lg w-full p-6"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">Chat with AI</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-300 hover:text-white transition text-sm"
                    >
                        Close
                    </button>
                </div>
                <div className="flex flex-col space-y-4 h-[300px] overflow-y-auto">
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
                <div className="mt-4 flex items-center gap-4">
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
        </div>,
        document.body
    );
};

const ChatPage = () => {
    const [messages, setMessages] = useState<{ text: string; sender: string; time: string }[]>([]);
    const [input, setInput] = useState("");
    const [email, setEmail] = useState("");
    const [chatEmail, setChatEmail] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const savedEmail = localStorage.getItem("chatEmail");
        if (savedEmail) {
            setChatEmail(savedEmail);
            const savedMessages = localStorage.getItem(`chatMessages_${savedEmail}`);
            if (savedMessages) {
                setMessages(JSON.parse(savedMessages));
            }
        }
    }, []);

    const saveMessagesToLocalStorage = (updatedMessages: { text: string; sender: string; time: string }[]) => {
        if (chatEmail) {
            localStorage.setItem(`chatMessages_${chatEmail}`, JSON.stringify(updatedMessages));
        }
    };

    const handleJoinBeta = () => {
        if (email.trim() === "") return;
        localStorage.setItem("chatEmail", email);
        setChatEmail(email);
        setEmail("");
    };

    const handleSend = () => {
        if (input.trim() === "") return;
        const userMessage = { text: input, sender: "user", time: new Date().toLocaleTimeString() };
        const updatedMessages = [...messages, userMessage];

        setMessages(updatedMessages);
        saveMessagesToLocalStorage(updatedMessages);
        setInput("");

        // Simulate AI response after delay
        setTimeout(() => {
            const botMessage = { text: getRandomResponse(), sender: "bot", time: new Date().toLocaleTimeString() };
            const newUpdatedMessages = [...updatedMessages, botMessage];
            setMessages(newUpdatedMessages);
            saveMessagesToLocalStorage(newUpdatedMessages);
        }, 1000);
    };

    const handleStartChat = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
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
                {!chatEmail ? (
                    <div className="mt-6 lg:flex items-center gap-4 justify-center space-y-2 lg:space-y-0">
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-4 py-2 text-black rounded-lg outline-none"
                        />
                        <button
                            onClick={handleJoinBeta}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition"
                        >
                            Join Beta
                        </button>
                    </div>
                ) : (
                    <div className="mt-6 flex flex-col items-center gap-4">
                        <button
                            onClick={handleStartChat}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
                        >
                            Start Chat
                        </button>
                        <Link
                            href={'/auth/profile'}
                            className="text-neutral-300 hover:text-neutral-400 transition"
                        >
                            Remove Chat Activity
                        </Link>
                    </div>
                )}
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

            {/* Chat Modal */}
            {isModalOpen && (
                <ChatModal
                    onClose={handleCloseModal}
                    messages={messages}
                    handleSend={handleSend}
                    input={input}
                    setInput={setInput}
                />
            )}
        </div>
    );
};

export default ChatPage;
