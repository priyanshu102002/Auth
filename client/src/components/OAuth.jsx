import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";

const OAuth = () => {
    const dispatch = useDispatch();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);

            // Sending the data to the backend for auth
            const res = await fetch("http://localhost:3000/api/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            });

            const data = await res.json();
            dispatch(signInSuccess(data))
        } catch (error) {
            console.log("Could not sign in with Google", error);
        }
    };

    return (
        <button
            type="button"
            onClick={handleGoogleClick}
            className="p-4 bg-red-700 text-white rounded-xl uppercase font-semibold hover:bg-red-800 transition-transform disabled:bg-red-400"
        >
            Continue with Google
        </button>
    );
};

export default OAuth;
