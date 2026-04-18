import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // EMAIL CHECK
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // REGISTER
  const handleRegister = (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const password = form.password;
    const confirmPassword = form.confirmPassword;

    // ❌ VALIDATIONS
    if (!name || !email || !password || !confirmPassword) {
      toast.error("⚠️ All fields are required");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("⚠️ Invalid email format");
      return;
    }

    if (password.length < 6) {
      toast.error("⚠️ Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("⚠️ Passwords do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find((u) => u.email === email);

    if (userExists) {
      toast.error("⚠️ User already exists");
      return;
    }

    // ✅ CREATE USER
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // AUTO LOGIN
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    // 🎉 SUCCESS TOAST
    toast.success("🎉 Account created successfully!");

    // smooth redirect
    setTimeout(() => {
      navigate("/");
    }, 800);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#FCFBFA] py-16 px-6 relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/40 rounded-full -mr-48 -mt-48 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-100 rounded-full -ml-48 -mb-48 blur-3xl"></div>

      <div className="bg-white rounded-[3rem] shadow-[0_20px_70px_rgba(0,0,0,0.03)] border border-gray-100 w-full max-w-xl overflow-hidden flex flex-col md:flex-row relative z-10">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex w-2/5 bg-black p-12 text-white flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mt-10 leading-tight">
              Begin Your <br />
              <span className="text-orange-500 italic">Spiritual</span> Journey.
            </h2>
          </div>
          <p className="text-gray-400 text-xs uppercase font-bold">
            Vastukkalp © 2026
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 p-8 md:p-12">

          <div className="mb-10">
            <h1 className="text-3xl font-bold text-black">
              Create <span className="text-orange-600 italic">Account</span>
            </h1>
            <p className="text-gray-400 text-sm">
              Join the community of Vastu experts.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleRegister}>

            {/* NAME */}
            <div>
              <label className="text-xs text-gray-400 flex items-center gap-2">
                <FaUser size={10} /> Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Pandya Hetvi"
                className="w-full mt-2 px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-xs text-gray-400 flex items-center gap-2">
                <FaEnvelope size={10} /> Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                className="w-full mt-2 px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* PASSWORD */}
            <div className="grid md:grid-cols-2 gap-4">

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

            </div>

            {/* BUTTON */}
            <button className="w-full bg-black text-white py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-orange-600 transition">
              Sign Up <FaArrowRight />
            </button>

          </form>

          {/* LOGIN */}
          <p className="text-center mt-6 text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-black font-bold">
              Login
            </Link>
          </p>

        </div>
      </div>
    </section>
  );
} 