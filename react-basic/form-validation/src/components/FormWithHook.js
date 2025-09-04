import React from "react";
import { useForm } from "react-hook-form";

function FormWithHook() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    alert("Form Submitted Successfully! Check Console.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition duration-300">
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          ✨ Sign Up Form ✨
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-indigo-400 
                         transition duration-200 shadow-sm"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Enter a valid email" },
              })}
              placeholder="Enter your email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-indigo-400 
                         transition duration-200 shadow-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              placeholder="Enter a strong password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-indigo-400 
                         transition duration-200 shadow-sm"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 
                       text-white py-2 rounded-lg shadow-md hover:shadow-xl 
                       hover:from-indigo-600 hover:to-purple-700 transition-all duration-300"
          >
            🚀 Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormWithHook;
