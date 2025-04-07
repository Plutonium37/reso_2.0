import Button from "../../components/Button";
import Input from "../../components/Input";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import axios from "axios";

const AdminSignin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signIn = async (data: any) => {
    try {
      const response = await axios.post("http://localhost:4000/sadmin/signin", {
        superEmail: data.email,
        superPassword: data.password,
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
                error={errors.email?.message as string | undefined}
              />

              <Input
                label="Password"
                id="password"
                type="password"
                register={register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "At least 6 characters" },
                  maxLength: { value: 30, message: "At most 30 characters" },
                })}
                error={errors.password?.message as string | undefined}
              />
            </div>
            <Button label={"Sign In"} type={"submit"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSignin;
