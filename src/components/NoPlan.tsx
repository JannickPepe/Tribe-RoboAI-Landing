import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import underlineImage from "@/assets/images/underline.svg?url";

export const navItems = [
    {
        name: "Pricing",
        href: "#pricing",
    },
];


const NoPlan = () => {

    const router = useRouter();
    const pathname = usePathname();

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
        <section>
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
        </section>
    )
}

export default NoPlan
