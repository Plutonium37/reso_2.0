import Button from "../Button";
import Input from "../Input";
import Gender from "../Gender";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

interface Props {
  event?: string;
}

const CommonForm: React.FC<Props> = (event) => {
  const [showPayment, setShowPayment] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const eventRegister = async (data: any) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/users/register",
        data
      );
      toast.success(response.data.message);
      window.location.href = "/";
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const onSubmit = (data: any) => {
    if (showPayment) {
      console.log(data);
      eventRegister(data);
    } else {
      setShowPayment(true);
    }
  };

  return (
    <div>
      <form className="grid gap-3" onSubmit={handleSubmit(onSubmit)}>
        {!showPayment ? (
          <>
            <div id="details" className="mt-5">
              <label htmlFor="details" className="text-white text-2xl pt-5">
                Details:
              </label>
              <Input
                label="Name"
                id="Name"
                type="text"
                register={register("Name", {
                  required: "Name is required",
                })}
                error={errors.Name?.message as string | undefined}
              />

              <Gender
                register={register("gender", {
                  required: "Gender is required",
                })}
                error={errors.gender?.message as string}
              />
              <div>
                <Input
                  label="Address"
                  id="address"
                  type="text"
                  register={register("address", {
                    required: "Address is required",
                  })}
                  error={errors.address?.message as string | undefined}
                />
                <Input
                  label="Contact no."
                  id="contact"
                  type="number"
                  register={register("contact", {
                    required: "Contact number is required",
                  })}
                  error={errors.contact?.message as string | undefined}
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Button label={"Continue"} type={"submit"} />
            </div>
          </>
        ) : (
          <div className="bg-zinc-800 p-6 rounded-md shadow-lg">
            <h2 className="text-white text-xl font-bold mb-4">
              Payment Section
            </h2>

            {/* QR Code Image */}
            <img src="/s.jpg" alt="Payment QR" className="w-48 mx-auto mb-4" />

            {/* Transaction ID */}
            <Input
              label="Transaction ID"
              id="transactionId"
              type="text"
              register={register("transactionId", {
                required: "Transaction ID is required",
              })}
              error={errors.transactionId?.message as string}
            />
            <Input
              label="Banking Name"
              id="bankingName"
              type="text"
              register={register("bankingName", {
                required: "Banking Name is required",
              })}
              error={errors.bankingName?.message as string}
            />
            {/* Payment Screenshot Upload */}
            <div className="mt-4">
              <label
                className="text-white block mb-2"
                htmlFor="paymentScreenshot"
              >
                Upload Payment Screenshot (JPG/PNG, Max 2MB)
              </label>

              {/* Hidden input */}
              <input
                id="paymentScreenshot"
                type="file"
                accept="image/jpeg, image/png"
                {...register("paymentScreenshot", {
                  required: "Payment screenshot is required",
                  validate: {
                    acceptedFormats: (files: FileList) =>
                      (files[0] &&
                        ["image/jpeg", "image/png"].includes(files[0]?.type)) ||
                      "Only JPG/PNG files are allowed.",
                    fileSize: (files: FileList) =>
                      (files[0] && files[0].size < 2 * 1024 * 1024) || // 2MB
                      "File size must be under 2MB.",
                  },
                })}
                className="hidden"
              />

              {/* Flex container for button and filename */}
              <div className="flex items-center gap-3">
                <label
                  htmlFor="paymentScreenshot"
                  className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Choose File
                </label>

                {/* Display filename if selected */}
                {watch("paymentScreenshot")?.length > 0 && (
                  <span className="text-white text-sm truncate max-w-[200px]">
                    {watch("paymentScreenshot")[0]?.name}
                  </span>
                )}
              </div>

              {/* Show error if exists */}
              {errors.paymentScreenshot && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.paymentScreenshot.message as string}
                </p>
              )}
            </div>
            <div className="flex justify-between mt-4">
              <Button
                label="Back"
                type="button"
                onClick={() => setShowPayment(false)}
              />
              <Button label="Register" type="submit" />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CommonForm;
