import { useSelector } from "react-redux";

const Profile = () => {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <div className="w-2/3 md:w-1/3 mx-auto">
            <h1 className="text-center my-7 font-bold text-3xl">
                Profile Page
            </h1>
            <form className="flex flex-col gap-6 mt-4">
                <img
                    src={currentUser.profilePicture}
                    alt="profile image"
                    className="w-24 h-w-24 object-cover  rounded-full self-center"
                />
                <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    defaultValue={currentUser.username}
                    className="p-4 bg-slate-100 rounded-lg outline-none"
                />
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    defaultValue={currentUser.email}
                    className="p-4 bg-slate-100 rounded-lg outline-none"
                />
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="p-4 bg-slate-100 rounded-lg outline-none"
                />
                <button className="p-4 bg-slate-700 text-white rounded-xl uppercase font-semibold hover:bg-slate-800 transition-transform disabled:bg-slate-500">
                    Update
                </button>
            </form>
            <div className="flex justify-between mt-4">
              <span className="text-red-500 cursor-pointer">Delete Account</span>
              <span className="text-red-500 cursor-pointer">Sign Out</span>
            </div>
        </div>
    );
};

export default Profile;
