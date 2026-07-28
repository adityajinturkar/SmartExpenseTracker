import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      return toast.error("Please enter your registered email.");
    }

    try {
      setLoading(true);

      const { data } = await api.post("/auth/forgot-password", {
        email: email.trim(),
      });

      toast.success(data.message);
      setEmail("");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Unable to send reset link."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-2 text-center text-3xl font-bold">
          Forgot Password
        </h2>

        <p className="mb-6 text-center text-sm text-gray-600">
          Enter your registered email address and we'll send you a password
          reset link.
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="mb-5 w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleForgotPassword}
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <p className="mt-5 text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}