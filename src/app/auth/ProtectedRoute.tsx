"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    useEffect(() => {
        const loggedIn = localStorage.getItem("loggedIn") === "true";
        if (!loggedIn) {
        router.push("/login");
        }
    }, [router]);

    return <>{children}</>;
};

export default ProtectedRoute;
