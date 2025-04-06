import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Button from "../components/Button";
import Input from "../components/Input";
import axios from "axios";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { useState } from "react";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const password = watch("password");

  const signUp = async (data: any) => {
    try {
      const response = await axios.post("http://localhost:4000/users/signup", {
        email: data.email,
        password: data.password,
        name: data.name,
      });
      localStorage.setItem("Authorization", response.data.authorization);
      localStorage.setItem("UserData", JSON.stringify(response.data.userData));
      toast.success(response.data.message);
      window.location.href = "/";
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  const onSubmit = (data: any) => {
    signUp(data);
  };

  return (
    <div className="h-screen bg-black flex items-center justify-center">
      <div className="mb-4  sm:w-3/5 md:w-2/5 lg:w-1/4 opacity-80 bg-zinc-950 py-6 px-6 rounded-xl drop-shadow-[0_0_20px_rgba(255,100,0,0.8)] shadow-[0_0_20px_rgba(255,100,0,0.8)]">
        <h1 className="text-3xl font-bold text-center text-white mb-5">
          Sign Up
        </h1>

        {/* Form */}
        <form noValidate className="mb-4" onSubmit={handleSubmit(onSubmit)}>
          <hr className="border-1 border-red-400 shadow-[0_0_10px_rgba(255,0,0,0.8)] drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]" />

          <div className="grid gap-4">
            <div className="grid gap-1">
              <Input
                label="Name"
                id="name"
                type="text"
                register={register("name", { required: "Name is required" })}
                error={errors.name?.message as string | undefined}
              />

              <Input
                label="Email"
                id="email"
                type="email"
                register={register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S{2,}$/,
                    message: "Invalid email",
                  },
                })}
                error={errors.email?.message as string | undefined}
              />

              <div className="relative">
                <Input
                  label="Password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  register={register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "At least 6 characters" },
                    maxLength: { value: 30, message: "At most 30 characters" },
                  })}
                  error={errors.password?.message as string | undefined}
                />
                {password && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-18 mr-2 right-3 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? (
                      <LuEye size={20} />
                    ) : (
                      <LuEyeClosed size={20} />
                    )}
                  </button>
                )}
              </div>

              <Input
                label="Re-enter Password"
                id="confirm_password"
                type="password"
                register={register("confirm_password", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                error={errors.confirm_password?.message as string | undefined}
              />
            </div>
            <Button label="Create Account" type="submit" />
          </div>
        </form>

        {/* Sign In Link */}
        <div className="flex">
          <h3 className="mr-1 text-white">Already have an account?</h3>
          <RouterLink to="/login" className="text-red-500 hover:font-semibold">
            Sign In
          </RouterLink>
        </div>
      </div>
    </div>
  );
};

export default Signup;