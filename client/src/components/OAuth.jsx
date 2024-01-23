import React from "react";
import Button from "react-bootstrap/esm/Button";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: resultsFromGoogle.user.displayName,
            email: resultsFromGoogle.user.email,
            googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
      })
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleGoogleClick}
      className="mt-2 mb-2 d-flex align-items-center justify-content-center"
      style={{
        background: "transparent",
        border: "2px solid",
        borderImage:
          "linear-gradient(259deg, rgba(34,76,152,1) 0%, rgba(45,206,253,1) 100%)",
        borderImageSlice: 1,
        width: "100%",
        color: "black",
        borderRadius: "10px !important",
      }}
    >
      <AiFillGoogleCircle size={24} className="mr-2" />
      <span style={{ fontSize: "1rem" }}>Continue with Google</span>
    </Button>
  );
}
