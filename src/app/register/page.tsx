"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission

        // Save user data in localStorage
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("loggedIn", "true");

        router.push("/auth/plans"); // Redirect to a protected page
    };

    return (
        <main className="py-24">
            <section className="flex flex-col items-center justify-center">
                <h1 className="text-6xl font-bold">Register</h1>
                <p className="text-xl mt-2">This is a LocalStorage approach</p>
                <p>
                    Use either{" "}
                    <Link href={"https://appwrite.io/"} className="text-indigo-400 font-bold">
                        Appwrite
                    </Link>{" "}
                    or{" "}
                    <Link href={"https://neon.tech/"} className="text-indigo-400 font-bold">
                        Neon
                    </Link>{" "}
                    for easy DB setup.
                </p>

                <form className="grid grid-cols-1 mt-6" onSubmit={handleRegister}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-4 p-2 border text-slate-800"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-4 p-2 border text-slate-800"
                        required
                    />

                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-neutral-800 text-slate-300 rounded hover:bg-transparent hover:underline transition"
                    >
                        Register
                    </button>
                </form>
            </section>
        </main>
    );
};

export default RegisterPage;
