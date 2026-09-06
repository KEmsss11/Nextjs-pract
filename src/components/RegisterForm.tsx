"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "./ui/toast";

type PsgcLocation = {
  code: string;
  name: string;
};

export default function RegisterForm() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confrimPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState(""); 
  const [phoneNumber, setPhoneNumber] = useState("");
  const [region, setRegion] = useState("");
  const [province, setProvince] = useState("");
  const [cityMunicipality, setCityMunicipality] = useState("");
  const [barangay, setBarangay] = useState("");
  const [streetAddress, setStreetAddress] = useState("");

  
  const [regions, setRegions] = useState<PsgcLocation[]>([]);
  const [provinces, setProvinces] = useState<PsgcLocation[]>([]);
  const [cities, setCities] = useState<PsgcLocation[]>([]);
  const [barangays, setBarangays] = useState<PsgcLocation[]>([]);

useEffect(() => {
  fetch("https://psgc.gitlab.io/api/regions/")
    .then((res) => res.json())
    .then((data) => setRegions(data));
}, []);

useEffect(() => {
  if (!region) return;

  fetch(
    `https://psgc.gitlab.io/api/regions/${region}/provinces/`
  )
    .then((res) => res.json())
    .then((data) => setProvinces(data));
}, [region]);

useEffect(() => {
  if (!province) return;

  fetch(
    `https://psgc.gitlab.io/api/provinces/${province}/cities-municipalities/`
  )
    .then((res) => res.json())
    .then((data) => setCities(data));
}, [province]);

useEffect(() => {
  if (!cityMunicipality) return;

  fetch(
    `https://psgc.gitlab.io/api/cities-municipalities/${cityMunicipality}/barangays/`
  )
    .then((res) => res.json())
    .then((data) => setBarangays(data));
}, [cityMunicipality]);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleRegister(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    const {data, error,} = await supabase.auth.signUp({
      email,
      password,
      options: {
    emailRedirectTo: `${window.location.origin}/auth/callback`,
  },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    if (password !== confrimPassword){
      toast.add({
        type: "error",
        description: "Password do not match.",
      });
      return;
    }

    if (data.user) {
       const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: data.user.id,
          email: data.user.email,
          firstName,
          lastName,
          phoneNumber,
          region,
          province,
          cityMunicipality,
          barangay,
          streetAddress,
        }),
      });

        if (!response.ok) {
          setError("Failed to save user data.");
          setLoading(false);
          return;
        }
    }
    setEmail(""); 
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
    setPhoneNumber("");

    setRegion("");
    setProvince("");
    setCityMunicipality("");
    setBarangay("");

    setStreetAddress("");

    setMessage(
      "Registration successful! Check your email to confirm your account."
    );

    setLoading(false);
  }

  return (
    <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
      <h1 className="text-2xl font-bold text-black">
        Create Account
      </h1>

      <p className="mt-1 mb-6 text-sm text-gray-500">
        Register a new account
      </p>

      <form
        onSubmit={handleRegister}
        className="space-y-4"
      >

         <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-gray-500"
          >
            First Name
          </label>

          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) =>
              setFirstName(e.target.value)
            }
            className="w-full rounded-md border p-2 text-gray-500"
            placeholder="John"
            required
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="mb-1 block text-sm font-medium text-gray-500"
          >
            Last Name
          </label>

          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) =>
              setLastName(e.target.value)
            }
            className="w-full rounded-md border p-2 text-gray-500"
            placeholder="Doe"
            required
          />
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="mb-1 block text-sm font-medium text-gray-500"
          >
            Phone Number
          </label>

          <input
            id="phoneNumber"
            type="tel"
            value={phoneNumber}
            onChange={(e) =>
              setPhoneNumber(e.target.value)
            }
            className="w-full rounded-md border p-2 text-gray-500"
            placeholder="09123456789"
            required
          />
        </div>
        <div>
            <label className="mb-1 block text-sm font-medium text-gray-500">
              Region
            </label>

            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full rounded-md border p-2 text-gray-500"
              required
            >
              <option value="">
                Select Region
              </option>

              {regions.map((item) => (
                <option
                  key={item.code}
                  value={item.code}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div>
              <label className="mb-1 block text-sm font-medium text-gray-500">
                Province
              </label>

              <select
                value={province}
                onChange={(e) =>
                  setProvince(e.target.value)
                }
                className="w-full rounded-md border p-2 text-gray-500"
                required
              >
                <option value="">
                  Select Province
                </option>

                {provinces.map((item) => (
                  <option
                    key={item.code}
                    value={item.code}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

          <div>
              <label className="mb-1 block text-sm font-medium text-gray-500">
                City / Municipality
              </label>

              <select
                value={cityMunicipality}
                onChange={(e) =>
                  setCityMunicipality(
                    e.target.value
                  )
                }
                className="w-full rounded-md border p-2 text-gray-500"
                required
              >
                <option value="">
                  Select City
                </option>

                {cities.map((item) => (
                  <option
                    key={item.code}
                    value={item.code}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          
          <div>
                <label className="mb-1 block text-sm font-medium text-gray-500">
                  Barangay
                </label>

                <select
                  value={barangay}
                  onChange={(e) =>
                    setBarangay(e.target.value)
                  }
                  className="w-full rounded-md border p-2 text-gray-500"
                  required
                >
                  <option value="">
                    Select Barangay
                  </option>

                  {barangays.map((item) => (
                    <option
                      key={item.code}
                      value={item.name}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
        <div>
          <label
            htmlFor="streetAddress"
            className="mb-1 block text-sm font-medium text-gray-500"
          >
            Street Address
          </label>
          <input
            id="streetAddress"
            type="text"
            value={streetAddress}
            onChange={(e) =>
              setStreetAddress(e.target.value)
            }
            className="w-full rounded-md border p-2 text-gray-500"
            placeholder="123 Main St"
            required
          />
        </div>

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
            minLength={6}
            required
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-1 block text-sm font-medium text-gray-500"
          >
            Confirm Password
          </label>

          <input
            id="confirmPassword"
            type="password"
            value={confrimPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            className="w-full rounded-md border p-2 text-gray-500"
            placeholder="••••••••"
            minLength={6}
            required
          />
        </div>

          {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        {message && (
          <p className="text-sm text-green-600">
            {message}
          </p>
        )}


        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-slate-800 py-2 text-white hover:bg-slate-700 disabled:opacity-50"
        >
          {loading
            ? "Creating account..."
            : "Register"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => router.push("/auth/login")}
        className="mt-4 w-full text-sm text-blue-600"
      >
        Already have an account? Login
      </button>
    </div>
  );
} 
