import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock, 
  FaArrowRight,
} from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // EMAIL VALIDATION
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // LOGIN
  const handleLogin = (e) => {
    e.preventDefault();

    const email = form.email.trim();
    const password = form.password;

    // ❌ EMPTY CHECK
    if (!email || !password) {
      toast.error("⚠️ All fields are required");
      return;
    }

    // ❌ EMAIL CHECK
    if (!isValidEmail(email)) {
      toast.error("⚠️ Invalid email format");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      toast.error("⚠️ Invalid email or password");
      return;
    }

    // ✅ SAVE USER
    localStorage.setItem("currentUser", JSON.stringify(user));

    // 🎉 SUCCESS TOAST
    toast.success(`🎉 Welcome ${user.name.split(" ")[0]}!`);

    // smooth redirect
    setTimeout(() => {
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo);
    }, 800);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#FCFBFA] py-16 px-6 relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-100/40 rounded-full -ml-48 -mt-48 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gray-100 rounded-full -mr-40 -mb-40 blur-3xl"></div>

      <div className="bg-white rounded-[3rem] shadow-[0_20px_70px_rgba(0,0,0,0.03)] border border-gray-100 w-full max-w-md overflow-hidden relative z-10">

        {/* HEADER */}
        <div className="bg-black p-10 text-center">
          <h2 className="text-2xl font-bold text-white">
            Welcome <span className="text-orange-500 italic">Back</span>
          </h2>
        </div>

        {/* FORM */}
        <div className="p-8 md:p-10">

          <form className="space-y-6" onSubmit={handleLogin}>

            {/* EMAIL */}
            <div>
              <label className="text-xs text-gray-400 flex items-center gap-2">
                <FaEnvelope size={10} /> Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                className="w-full mt-2 px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-orange-600"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <div className="flex justify-between items-center">
                <label className="text-xs text-gray-400 flex items-center gap-2">
                  <FaLock size={10} /> Password
                </label>
                <Link to="/forgot-password" className="text-xs text-orange-600 font-bold">
                  Forgot?
                </Link>
              </div>

              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-orange-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-black text-white py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-orange-600 transition uppercase text-xs font-bold"
            >
              Sign In <FaArrowRight size={12} />
            </button>

          </form>

          {/* REGISTER */}
          <div className="mt-10 text-center">
            <p className="text-xs text-gray-400">New to Vastukkalp?</p>
            <Link to="/register" className="text-black font-bold hover:text-orange-600 underline">
              Create an Account
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}