import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const res = await api.post("/auth/register", {
        email,
        password,
        username,
        confirmPassword,
      });

      const { token } = res.data;

      login(token);
      navigate("/");
    }  catch (error) {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      setError("Unable to connect to the server. Please try again.");
    } else if (error.response.status === 409) {
      setError("Email is already in use. Please try a different email.");
    } else {
      setError("Something went wrong. Please try again.");
    }
  } else {
    setError("Something went wrong. Please try again.");
  }
}
  }

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 px-4">
      <img
        src="/Car2.svg"
        alt="Car illustration"
        className="
                    hidden lg:block
                    absolute
                    -left-56
                    top-1/2
                    -translate-y-1/2
                    w-[550px]
                    opacity-60
                    pointer-events-none
                "
      />

      <img
        src="/Car2.svg"
        alt="Car illustration"
        className="
                    hidden lg:block
                    absolute
                    -right-56
                    top-1/2
                    -translate-y-1/2
                    w-[550px]
                    scale-x-[-1]
                    opacity-60
                    pointer-events-none
                "
      />

      <div className="relative z-10 max-w-xl w-full mx-auto">
        <img
          src="/Car2.svg"
          alt="Car illustration"
          className="
                        block
                        lg:hidden
                        w-[220px]
                        mx-auto
                        mb-5
                        opacity-70
                        pointer-events-none
                    "
        />

        <h1 className="text-3xl sm:text-4xl font-bold text-center">Sign Up</h1>

        <form
          onSubmit={handleSubmit}
          className="
                        flex
                        flex-col
                        items-center
                        gap-5
                        mt-8
                        w-full
                    "
        >
          {error && (
            <p
              className="
                            text-red-500
                            bg-red-50
                            p-3
                            rounded-2xl
                            text-center
                            text-sm
                            w-full
                            max-w-[320px]
                        "
            >
              {error}
            </p>
          )}

          <div className="flex flex-col gap-1 w-full max-w-[320px]">
            <label htmlFor="username">Username</label>

            <input
              id="username"
              type="text"
              className="
                                w-full
                                h-11
                                rounded-2xl
                                border
                                border-neutral-200
                                bg-neutral-100/50
                                p-3
                            "
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1 w-full max-w-[320px]">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              className="
                                w-full
                                h-11
                                rounded-2xl
                                border
                                border-neutral-200
                                bg-neutral-100/50
                                p-3
                            "
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1 w-full max-w-[320px]">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              className="
                                w-full
                                h-11
                                rounded-2xl
                                border
                                border-neutral-200
                                bg-neutral-100/50
                                p-3
                            "
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1 w-full max-w-[320px]">
            <label htmlFor="confirmpassword">Confirm Password</label>

            <input
              id="confirmpassword"
              type="password"
              className="
                                w-full
                                h-11
                                rounded-2xl
                                border
                                border-neutral-200
                                bg-neutral-100/50
                                p-3
                            "
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
                            w-full
                            max-w-[320px]
                            rounded-full
                            bg-yellow-400
                            py-3
                            font-medium
                            text-black
                            transition-colors
                            hover:bg-yellow-300
                            disabled:opacity-50
                        "
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <Link
            className="
                            text-neutral-500
                            hover:text-yellow-500
                            transition-colors
                        "
            to="/login"
          >
            Already have an account?
          </Link>
        </form>
      </div>
    </section>
  );
}
