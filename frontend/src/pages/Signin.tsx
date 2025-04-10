import { Link as RouterLink } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import  { AxiosError } from "axios";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { useState } from "react";
import axios from "../utils/axios";
// Define the type for form input
type FormData = {
  email: string;
  password: string;
};

const Signin = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [showPassword, setShowPassword] = useState(false);
  const password = watch("password");

  const signIn = async (data: FormData) => {
    try {
      const response = await axios.post("/users/signin", {
        email: data.email,
        password: data.password,
      });
      localStorage.setItem("Authorization", response.data.authorization);
      localStorage.setItem("UserData", JSON.stringify(response.data.userData));
      toast.success(response.data.message);
      window.location.href = "/";
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const onSubmit = (data: FormData) => {
    signIn(data);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="mb-4 sm:w-3/5 md:w-2/5 lg:w-1/5 opacity-80 bg-zinc-950 py-6 px-6 rounded-xl drop-shadow-[0_0_20px_rgba(255,100,0,0.8)] shadow-[0_0_20px_rgba(255,100,0,0.8)]">
        <h1 className="text-4xl font-bold text-center text-white mb-5">
          Log In
        </h1>
        <form noValidate className="mb-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6">
            <hr className="border-1 border-red-400 shadow-[0_0_10px_rgba(255,0,0,0.8)] drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]" />
            <div className="grid gap-4 mt-3">
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
                error={errors.email?.message}
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
                  error={errors.password?.message}
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
            </div>
            <Button label="Sign In" type="submit" />
          </div>
        </form>
        <div className="flex">
          <h3 className="mr-1 text-white">Don't have an account?</h3>
          <RouterLink to="/signup" className="text-red-500 hover:font-semibold">
          Sign up
          </RouterLink>
        </div>
      </div>
    </div>
  );
};

export default Signin;
