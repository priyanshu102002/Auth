import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
    const { currentUser } = useSelector((state) => state.user);
    return (
        <div className="bg-slate-300">
            <div className="flex justify-between px-8 py-6 text-xl items-center">
                <Link to="/">
                    <h1 className="font-bold">Auth</h1>
                </Link>
                <ul className="flex gap-8 items-center">
                    <Link to="/">
                        <li>Home</li>
                    </Link>
                    <Link to="/about">
                        <li>About</li>
                    </Link>
                    <Link to="/profile">
                        {currentUser ? (
                            <img
                                className="rounded-full w-7 h-7 object-cover"
                                src={currentUser.profilePicture}
                            />
                        ) : (
                            <li>Sign In</li>
                        )}
                    </Link>
                </ul>
            </div>
        </div>
    );
};

export default Header;
