import React, { useState } from "react";
import { Mail, User, Phone, MapPin, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth } from "../src/Firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import axios from "../src/api/axios";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [college, setCollege] = useState("");
  const [hostel, setHostel] = useState("");
  const [password, setPassword] = useState("");
  const [cnfrnPass, setCnfrnPass] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== cnfrnPass) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const firebaseUser = userCred.user;
      const token = await firebaseUser.getIdToken();
      localStorage.setItem("token", token);

      await axios.post("/users/signup", {
        firebaseUid: firebaseUser.uid,
        name,
        email,
        contact,
        college,
        hostel,
        profileImage: "",
      });

      alert("Sign-up Successful");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-center mb-8">
          <img src="/logo-1.png" className="w-12 h-12" />
          <span className="ml-3 text-2xl font-bold">uniXchange</span>
        </div>

        <h1 className="text-4xl font-black text-center mb-6">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input"
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />

          <input
            placeholder="Contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            className="input"
          />

          <input
            placeholder="College"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            required
            className="input"
          />

          <input
            placeholder="Hostel"
            value={hostel}
            onChange={(e) => setHostel(e.target.value)}
            className="input"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={cnfrnPass}
            onChange={(e) => setCnfrnPass(e.target.value)}
            required
            className="input"
          />

          <button
            disabled={loading}
            className="w-full py-3 bg-black text-white font-bold rounded-lg"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
