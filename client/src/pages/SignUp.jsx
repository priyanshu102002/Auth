import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const SignUp = () => {
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
                "http://localhost:3000/api/auth/signup",
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
            <h1 className="text-center my-7 font-bold text-3xl">Signup</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
                <input
                    type="text"
                    placeholder="Username"
                    id="username"
                    onChange={handleChange}
                    className="p-4 bg-slate-100 rounded-lg outline-none"
                />
                <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    onChange={handleChange}
                    className="p-4 bg-slate-100 rounded-lg outline-none"
                />
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    onChange={handleChange}
                    className="p-4 bg-slate-100 rounded-lg outline-none"
                />
                <button
                    disabled={isLoading}
                    className="p-4 bg-slate-700 text-white rounded-xl uppercase font-semibold hover:bg-slate-800 transition-transform disabled:bg-slate-500"
                >
                    {isLoading ? "Loading..." : "Sign up"}
                </button>
            </form>
            <div className="flex gap-1 mt-4">
                <p>Have an account?</p>
                <Link to="/sign-in">
                    <span className="text-blue-500 font-semibold">Sign in</span>
                </Link>
            </div>
            <p className="mt-2 text-red-600 font-semibold">
                {error && "Something went wrong!"}
            </p>
        </div>
    );
};

export default SignUp;
