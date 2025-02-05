"use client"

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from "framer-motion"
import Image from 'next/image';
import robotImg from "@/assets/images/robot.jpg";
import { FiZap } from "react-icons/fi";

const VerifyPlan = () => {

    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["end start", "start end"],
    });
    const transformedY = useTransform(scrollYProgress, [0, 1], [200, -200]);

    return (
        <section>
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
    )
}

export default VerifyPlan
