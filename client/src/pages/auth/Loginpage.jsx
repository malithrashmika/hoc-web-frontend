import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { loginRequest } from "../../api/Authapi";
import loginPageImg from "../../assets/loginpage.png";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [showPass, setShowPass]     = useState(false);
  const [keepSigned, setKeepSigned] = useState(false);
  const [error, setError]           = useState("");
  const [loading, setLoading]       = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const data = await loginRequest({ email, password });
    setLoading(false);
    if (data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("admin", JSON.stringify(data.admin));
      navigate("/admin/dashboard");
    } else {
      setError(data.message || "Incorrect email or password. Please try again.");
    }
  };

  return (
    <div className="h-screen w-screen bg-[#fdf6ee] flex items-center justify-center overflow-hidden">
      <div className="flex w-full h-full max-w-5xl items-center justify-center gap-6 px-6">

        <div className="hidden lg:flex flex-col justify-between flex-1 h-full max-h-[600px] relative pr-4">
          <div className="absolute top-6 left-10 w-3 h-3 bg-[#FFB700] rotate-45 opacity-80" />
          <div className="absolute top-14 left-2 w-2 h-2 bg-[#FFB700] rotate-45 opacity-50" />
          <div className="absolute top-3 right-12 w-2 h-2 bg-gray-400 rotate-45 opacity-50" />
          <div className="absolute top-10 right-4 w-3 h-3 bg-gray-400 rotate-45 opacity-40" />
          <div className="absolute top-20 right-20 w-1.5 h-1.5 bg-[#FFB700] rotate-45 opacity-40" />
          <div className="absolute bottom-8 right-6 w-2 h-2 bg-[#FFB700] rotate-45 opacity-50" />

          <div className="relative z-10 pt-8">
            <h1 className="text-3xl xl:text-4xl font-extrabold text-gray-900 leading-tight mb-1">
              WELCOME BACK!
            </h1>
            <h2 className="text-3xl xl:text-4xl font-extrabold text-[#FFB700] leading-tight">
              SHOP SMARTER,<br />FASTER & EASIER.
            </h2>
          </div>

          <div className="relative z-10 flex-1 flex items-end pb-0">
            <img
              src={loginPageImg}
              alt="Products"
              className="w-full max-h-72 xl:max-h-80 object-contain object-bottom drop-shadow-xl"
            />
            <div className="absolute -bottom-2 -right-2 w-24 h-14 bg-[#FFB700] rounded-tl-full opacity-20 -z-10" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-sm flex-shrink-0">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-gray-900">Welcome Back</h2>
            <span className="text-xl">👋</span>
          </div>
          <p className="text-xs text-gray-500 mb-4">Sign in to your account</p>

          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg px-3 py-2.5 mb-4">
              <span className="mt-0.5">⚠️</span>
              <span>
                {error}{" "}
                <button
                  onClick={() => setError("")}
                  className="underline text-red-600 hover:text-red-800"
                >
                  reset your password.
                </button>
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="amara@gmail.com"
                required
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent placeholder-gray-400"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-semibold text-gray-600 uppercase">
                  Password <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  className="text-xs text-gray-500 hover:text-yellow-500 underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  required
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="keepSigned"
                checked={keepSigned}
                onChange={(e) => setKeepSigned(e.target.checked)}
                className="w-4 h-4 accent-yellow-400 cursor-pointer"
              />
              <label htmlFor="keepSigned" className="text-xs text-gray-600 cursor-pointer">
                Keep me signed in on this device
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2.5 rounded-lg transition-colors disabled:opacity-60 text-sm tracking-wide"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-4">
            <hr className="flex-1 border-gray-200" />
            <span className="text-xs text-gray-400">or continue with</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          <div className="space-y-2">
            <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continue with Facebook
            </button>
          </div>

          <div className="mt-4 text-center space-y-1.5">
            <p className="text-xs text-gray-500">
              Don't have an account?{" "}
              <span className="text-yellow-500 font-semibold cursor-pointer hover:underline">
                Create one free →
              </span>
            </p>
            <p className="text-xs">
              <span className="text-yellow-500 font-semibold cursor-pointer hover:underline">
                Continue as Guest →
              </span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}