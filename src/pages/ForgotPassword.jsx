import logo from "../assets/images/forgot.svg";
import cs from "../assets//images/coffe-shop.svg";
import Mail from "../assets/images/mail.svg";
import React from "react";

export const ForgotPassword = () => {
  const [forgotPassword, setForgotPassword] = React.useState("");

  const API_URL = import.meta.env.VITE_SOLID_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: forgotPassword,
        }),
      });

      const data = await res.json();
      return data
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="lg:grid lg:grid-cols-[25%_75%]">
      {/* LEFT */}
      <section>
        <img
          src={logo}
          alt="Login illustration"
          className="hidden lg:block lg:h-screen lg:w-full lg:object-cover"
        />
      </section>

      {/* RIGHT */}
      <section className="flex min-h-screen items-center justify-center px-6 lg:mx-20 lg:flex lg:items-center lg:justify-center">
        <div className="w-full space-y-4 px-2 lg:max-w-lvh lg:min-w-full lg:space-y-4">
          {/* Header */}
          <div>
            <img src={cs} alt="Coffee shop" className="mt-10 h-12 w-36" />
            <p className="text-md mt-8 font-semibold text-[#8E6447] lg:mt-1">
              Fill out the form correctly
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="my-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>

              <div className="relative mt-2">
                <img
                  src={Mail}
                  alt="mail"
                  className="absolute top-1/2 left-3 w-5 -translate-y-1/2 opacity-60"
                />

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="off"
                  className="w-full rounded-lg border border-gray-300 bg-slate-50 py-3 pr-3 pl-10 text-base lg:w-full lg:rounded-lg lg:border lg:border-gray-300 lg:bg-slate-50 lg:py-2 lg:pr-3 lg:pl-10"
                  value={forgotPassword}
                  onChange={(e) => setForgotPassword(e.target.value)}
                />
              </div>
            </div>
            {/* Submit */}
            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-orange-400 py-3 font-semibold text-white lg:w-full lg:rounded lg:bg-orange-400 lg:p-2 lg:font-semibold lg:text-white lg:hover:bg-orange-500"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
