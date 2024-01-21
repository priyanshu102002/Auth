import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            setError(false);
            const response = await fetch(
                "http://localhost:3000/api/auth/signin",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );
            const data = await response.json();
            setIsLoading(false);
            if (data.success === false) return setError(true);
            navigate("/");
        } catch (error) {
            setIsLoading(false);
            setError(true);
        }
    };

    return (
        <div className="w-2/3 md:w-1/3 mx-auto">
            <h1 className="text-center my-7 font-bold text-3xl">Sign In</h1>
            <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="p-4 bg-slate-100 rounded-lg outline-none"
                />
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="p-4 bg-slate-100 rounded-lg outline-none"
                />
                <button
                    disabled={isLoading}
                    className="p-4 bg-slate-700 text-white rounded-xl uppercase font-semibold hover:bg-slate-800 transition-transform disabled:bg-slate-500"
                >
                    {isLoading ? "Loading.." : "Sign In"}
                </button>
            </form>
            <div className="flex mt-4 gap-2">
                <p>Don&apos;t have an account?</p>
                <Link to="/sign-up">
                    <span className="text-blue-600 font-semibold">Sign up</span>
                </Link>
            </div>
            <p className="mt-2 text-red-600 font-semibold">
                {error && "Something went wrong!"}
            </p>
        </div>
    );
};

export default SignIn;
