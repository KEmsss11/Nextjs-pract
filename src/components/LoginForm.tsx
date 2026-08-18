"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");
    setLoading(true);

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
      <h1 className="text-2xl font-bold text-gray-500">
        Welcome Back
      </h1>

      <p className="mt-1 mb-6 text-sm text-gray-500">
        Login to your account
      </p>

      <form
        onSubmit={handleLogin}
        className="space-y-4"
      >
        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-gray-500"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded-md border p-2 text-gray-500"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-sm font-medium text-gray-500"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full rounded-md border p-2 text-gray-500"
            placeholder="••••••••"
            required
          />
        </div>

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-slate-800 py-2 text-white hover:bg-slate-700 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
        
        <p className="mt-4 text-center text-sm text-gray-500">
          Don&apos;t have an account?
        </p>

        <Link
          href="/auth/register"
          className="mt-2 block w-full rounded-md border border-slate-800 py-2 text-center text-slate-800 hover:bg-slate-100"
        >
          Register
        </Link>
    </div>
  );
}
