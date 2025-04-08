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

const Bgmi: React.FC<Props> = (event) => {
  const [showPayment, setShowPayment] = useState(false);

  const {
    register,
    handleSubmit,
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
            <label className="text-white text-2xl pt-7">Team Details :</label>
            <div className="grid grid-cols-3 gap-4 mb-2">
              <Input
                label="Team Leader Name"
                id="teamLeader"
                type="text"
                register={register("teamLeader", {
                  required: "Team Leader Name is required",
                })}
                error={errors.teamLeader?.message as string | undefined}
              />
              <Input
                label="Team Leader ID"
                id="teamLeaderId"
                type="number"
                register={register("teamLeaderId", {
                  required: "Team Leader ID is required",
                })}
                error={errors.teamLeaderId?.message as string | undefined}
              />
              <Gender
                register={register("gender1", {
                  required: "Gender is required",
                })}
                error={errors.gender1?.message as string}
              />
              <Input
                label="Player 2 Name"
                id="Player2"
                type="text"
                register={register("Player2", {
                  required: "Player 2 Name is required",
                })}
                error={errors.Player2?.message as string | undefined}
              />
              <Input
                label="Player 2 ID"
                id="Player2Id"
                type="number"
                register={register("Player2Id", {
                  required: "Player 2 ID is required",
                })}
                error={errors.Player2Id?.message as string | undefined}
              />
              <Gender
                register={register("gender2", {
                  required: "Gender is required",
                })}
                error={errors.gender2?.message as string}
              />
              <Input
                label="Player 3 Name"
                id="Player3"
                type="text"
                register={register("Player3", {
                  required: "Player 3 Name is required",
                })}
                error={errors.Player3?.message as string | undefined}
              />
              <Input
                label="Player 3 ID"
                id="Player3Id"
                type="number"
                register={register("Player3Id", {
                  required: "Player 3 ID is required",
                })}
                error={errors.Player3Id?.message as string | undefined}
              />
              <Gender
                register={register("gender3", {
                  required: "Gender is required",
                })}
                error={errors.gender3?.message as string}
              />
              <Input
                label="Player 4 Name"
                id="Player4"
                type="text"
                register={register("Player4", {
                  required: "Player 4 Name is required",
                })}
                error={errors.Player4?.message as string | undefined}
              />
              <Input
                label="Player 4 ID"
                id="Player4Id"
                type="number"
                register={register("Player4Id", {
                  required: "Player 4 ID is required",
                })}
                error={errors.Player4Id?.message as string | undefined}
              />
              <Gender
                register={register("gender4", {
                  required: "Gender is required",
                })}
                error={errors.gender4?.message as string}
              />
              <Input
                label="Substitute Name (Optional)"
                id="Player5"
                type="text"
                register={register("Player5")}
              />
              <Input
                label="Substitute ID (Optional)"
                id="Player5Id"
                type="number"
                register={register("Player5Id")}
              />
              <Gender
                register={register("gender5")}
                error={errors.gender5?.message as string}
              />
            </div>
            <div id="teamleader" className="mt-5">
              <label htmlFor="teamleader" className="text-white text-2xl pt-5">
                Team Leader details:
              </label>
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

export default Bgmi;
