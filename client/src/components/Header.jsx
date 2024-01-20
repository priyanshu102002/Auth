import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="bg-slate-300">
            <div className="flex justify-between px-8 py-6 text-xl items-center">
                <Link to="/">
                    <h1 className="font-bold">Auth</h1>
                </Link>
                <ul className="flex gap-8">
                    <Link to="/">
                        <li>Home</li>
                    </Link>
                    <Link to="/about">
                        <li>About</li>
                    </Link>
                    <Link to="/sign-in">
                        <li>SignIn</li>
                    </Link>
                </ul>
            </div>
        </div>
    );
};

export default Header;
