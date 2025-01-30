"use client";

import React, { useEffect, useState } from "react";
import { faYoutube, faXTwitter, faDiscord, } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export const navItems = [
  {
    name: "Features",
    href: "#features",
  },
  {
    name: "Pricing",
    href: "#pricing",
  },
  {
    name: "Testimonials",
    href: "#testimonials",
  },
];

export const socialLinks = [
  {
    name: "Youtube",
    icon: faYoutube,
    href: "https://www.youtube.com/",
    label: "Our Youtube Channel",
  },
  {
    name: "X",
    icon: faXTwitter,
    href: "https://x.com/",
    label: "Our Tweeter/X account",
  },
  {
    name: "Discord",
    icon: faDiscord,
    href: "https://discord.com/",
    label: "Our Discord channel",
  },
];

export const Footer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check localStorage for logged-in status on mount
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("loggedIn");
    setIsLoggedIn(loggedInStatus === "true");
  }, []);

  const handleLogout = () => {
    localStorage.setItem("loggedIn", "false");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="container py-8">
        <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-8">
          <Link href={"/"} className="font-extrabold text-2xl">
            sphereal.ai
          </Link>
          <nav className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
            {navItems.map((item) => (
              <a
                href={item.href}
                key={item.href}
                className="uppercase text-xs tracking-widest font-bold text-gray-400"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector(item.href);
                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth",
                    });
                  }
                }}
              >
                {item.name}
              </a>
            ))}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="uppercase text-xs tracking-widest font-bold text-gray-400"
              >
                Logout
              </button>
            ) : (
              <Link href={"/login"} className="uppercase text-xs tracking-widest font-bold text-gray-400">
                Login
              </Link>
            )}
          </nav>
        </div>
        <div className="mt-16 flex flex-col md:flex-row-reverse md:justify-between items-center gap-8">
          <div className="flex justify-center gap-6">
            {socialLinks.map((link) => (
              <a href={link.href} key={link.name} aria-label={link.label}>
                <div className="size-10 rounded-full bg-gray-900 inline-flex items-center justify-center">
                  <FontAwesomeIcon icon={link.icon} className="size-4" />
                </div>
              </a>
            ))}
          </div>
          <p className="text-gray-400 text-sm">
            &copy;NighteCoding, All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
