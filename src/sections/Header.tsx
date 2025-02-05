"use client";

import { useEffect, useState } from "react";
import { Button, ButtonProps } from "@/components/Button";
import { Orbit } from "@/components/Orbit";
import { twMerge } from "tailwind-merge";
import { Logo } from "@/components/Logo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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

export const navItemsAuth = [
  {
    name: "Plans",
    href: "/auth/plans",
  },
  {
    name: "Ai-Chat",
    href: "/chat",
  },
  {
    name: "Profile",
    href: "/auth/profile",
  },
];

export const loginItems = [
  {
    buttonVariant: "tertiary",
    name: "Login",
    href: "/login",
  },
  {
    buttonVariant: "primary",
    name: "Sign Up",
    href: "/register",
  },
] satisfies {
  name: string;
  href: string;
  buttonVariant: ButtonProps["variant"];
}[];

export const Header = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Check localStorage for logged-in status on mount
  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedInStatus = localStorage.getItem("loggedIn");
      setIsLoggedIn(loggedInStatus === "true");
    };

    checkLoginStatus(); // Initial check on mount
    // Listen for login/logout events
    window.addEventListener("authStatusChanged", checkLoginStatus);

    return () => {
      window.removeEventListener("authStatusChanged", checkLoginStatus);
    };
  }, []);


  // Logout function (doesn't delete user data)
  const handleLogout = () => {
    localStorage.setItem("loggedIn", "false");
    // Dispatch event to notify other components of logout
    window.dispatchEvent(new Event("authStatusChanged"));

    setIsLoggedIn(false);
    window.location.href = "/";
  };

  // Delete user function
  const handleDeleteUser = () => {
    localStorage.clear(); // Clears all user data

    // Dispatch event to notify other components of user deletion
    window.dispatchEvent(new Event("authStatusChanged"));
    setIsLoggedIn(false);
    window.location.href = "/";
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

  return (
    <>
      <header className="border-b border-gray-200/20 relative z-40">
        <div className="container">
          <div className="h-18 lg:h-20 flex justify-between items-center">
            <Link href={'/'} className="flex gap-4 items-center">
              <Logo />
              <div className="font-extrabold text-2xl">AI-Landing</div>
            </Link>

            {/* Desktop Navigation */}
            <div className="h-full hidden lg:block">
              <nav className="h-full">
                {navItems.map(({ name, href }) => (
                  <a
                    href={href}
                    key={href}
                    className="h-full px-10 relative font-bold text-xs tracking-widest text-gray-400 hover:text-purple-500 uppercase inline-flex items-center before:content-[''] before:absolute before:bottom-0 before:h-2 before:w-px before:bg-gray-200/20 before:left-0 last:after:absolute last:after:bottom-0 last:after:h-2 last:after:w-px last:after:bg-gray-200/20 last:after:right-0 transition"
                    onClick={(e) => {
                      handleNavClick(e, href)
                      const element = document.querySelector(href);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    {name}
                  </a>
                ))}
              </nav>
            </div>
            
           {/* User Dropdown for Logged-In Users */}
            {isLoggedIn ? (
              <div className="relative hidden lg:block">
                <Button onClick={() => setIsDropdownOpen((prev) => !prev)}>
                  User
                </Button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
                    {navItemsAuth.map(({ name, href }) => (
                      <Link href={href} key={name} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                        {name}
                      </Link>
                    ))}
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                    <button
                      onClick={handleDeleteUser}
                      className="block w-full px-4 py-2 text-left text-red-700 hover:bg-red-100"
                    >
                      Delete User
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Login/Register Buttons for Guests
              <div className="hidden lg:flex gap-4">
                {loginItems.map(({ buttonVariant, name, href }) => (
                  <Link href={href} key={name}>
                    <Button variant={buttonVariant}>{name}</Button>
                  </Link>
                ))}
              </div>
            )}

            {/* Mobile Navigation Button */}
            <div className="flex items-center lg:hidden">
              <button
                id="OpenMenu" 
                aria-label="labelbutton"
                className="size-10 rounded-lg border-2 border-transparent [background:linear-gradient(var(--color-gray-950),var(--color-gray-950))_content-box,conic-gradient(from_45deg,var(--color-violet-400),var(--color-fuchsia-400),var(--color-amber-300),var(--color-teal-300),var(--color-violet-400))_border-box] relative"
                onClick={() => setIsMobileNavOpen((curr) => !curr)}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div
                    className={twMerge(
                      "w-4 h-0.5 bg-gray-100 -translate-y-1 transition duration-300",
                      isMobileNavOpen && "translate-y-0 rotate-45"
                    )}
                  ></div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div
                    className={twMerge(
                      "w-4 h-0.5 bg-gray-100 translate-y-1 transition duration-300",
                      isMobileNavOpen && "translate-y-0 -rotate-45"
                    )}
                  ></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMobileNavOpen && (
        <div className="fixed top-18 left-0 bottom-0 right-0 bg-gray-950 z-30 overflow-hidden">
          <div className="absolute-center isolate -z-10">
            <Orbit />
          </div>
          <div className="absolute-center isolate -z-10">
            <Orbit className="size-[350px]" />
          </div>
          <div className="absolute-center isolate -z-10">
            <Orbit className="size-[500px]" />
          </div>
          <div className="absolute-center isolate -z-10">
            <Orbit className="size-[650px]" />
          </div>
          <div className="absolute-center isolate -z-10">
            <Orbit className="size-[800px]" />
          </div>
          <div className="container h-full">
            <nav className="flex flex-col items-center gap-4 py-8 h-full justify-center">
              {navItems.map(({ name, href }) => (
                <a
                  href={href}
                  key={name}
                  className="text-gray-400 uppercase tracking-widest font-bold text-xs h-10"
                  onClick={(e) => {
                    e.preventDefault();
                    const targetId = href.startsWith("#") ? href : `#${href.replace("/", "")}`;
                    const element = document.querySelector(targetId);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  {name}
                </a>
              ))}

              {/* Conditional rendering based on login state */}
              {isLoggedIn ? (
                <>
                  {/* Authenticated Navigation Items */}
                  {navItemsAuth.map(({ name, href }) => (
                    <Link href={href} key={name} className="text-gray-400 uppercase tracking-widest font-bold text-xs h-10">
                      {name}
                    </Link>
                  ))}
                  {/* Logout and Delete User Buttons */}
                  <Button block onClick={handleLogout} className="w-1/2">
                    Logout
                  </Button>
                  <Button block variant="tertiary" onClick={handleDeleteUser} className="w-1/2">
                    Delete User
                  </Button>
                </>
              ) : (
                <>
                  {/* Login/Signup Buttons for Guests */}
                  {loginItems.map(({ buttonVariant, name, href }) => (
                    <Link href={href} key={name} className="w-1/2">
                      <Button block variant={buttonVariant}>
                        {name}
                      </Button>
                    </Link>
                  ))}
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
