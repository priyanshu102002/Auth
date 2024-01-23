import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
    const { currentUser } = useSelector((state) => state.user);
    const fileRef = useRef(null);
    const [image, setImage] = useState(null);
    const [imagePercent, setImagePercent] = useState(0);
    const [imageError, setImageError] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (image) {
            handleUploadImage(image);
        }
    }, [image]);

    const handleUploadImage = async (image) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime().toString() + image.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImagePercent(Math.round(progress));
            },
            (error) => {
                setImageError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFormData({ ...formData, profilePicture: downloadURL });
                });
            }
        );
    };

    return (
        <div className="w-2/3 md:w-1/3 mx-auto">
            <h1 className="text-center my-7 font-bold text-3xl">
                Profile Page
            </h1>
            <form className="flex flex-col gap-6 mt-4">
                <input
                    type="file"
                    ref={fileRef}
                    hidden
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <img
                    src={formData.profilePicture || currentUser.profilePicture}
                    alt="profile image"
                    className="w-24 h-24 object-cover  rounded-full self-center cursor-pointer"
                    onClick={() => fileRef.current.click()}
                />
                <p className="self-center">
                    {imageError ? (
                        <span className="text-red-500">
                            Image Upload Failed(File should be less than 2MB)
                        </span>
                    ) : imagePercent > 0 && imagePercent < 100 ? (
                        <span className="text-green-500">
                            {`Image Uploading ${imagePercent}%`}
                        </span>
                    ) : imagePercent === 100 ? (
                        <span className="text-green-500">Image Uploaded</span>
                    ) : (
                        ""
                    )}
                </p>
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
                <span className="text-red-500 cursor-pointer">
                    Delete Account
                </span>
                <span className="text-red-500 cursor-pointer">Sign Out</span>
            </div>
        </div>
    );
};

export default Profile;
