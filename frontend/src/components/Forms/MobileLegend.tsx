import Button from "../Button";
import Input from "../Input";
import Gender from "../Gender";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";

interface Props {
  event?: string;
}

interface FormData {
  name: string;
  teamLeader: string;
  teamLeaderId: number;
  gender1: string;
  Player2: string;
  Player2Id: number;
  gender2: string;
  Player3: string;
  Player3Id: number;
  gender3: string;
  Player4: string;
  Player4Id: number;
  gender4: string;
  Player5: string;
  Player5Id: number;
  gender5: string;
  Player6?: string;
  Player6Id?: number;
  gender6?: string;
  address: string;
  contact: number;
  transactionId?: string;
  bankingName?: string;
}

interface CheckResponse {
  fee: number;
  eventRegistered: boolean;
}

const MobileLegend: React.FC<Props> = ({ event }) => {
  const [showPayment, setShowPayment] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [fee, setFee] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    const checkRegistration = async () => {
      const token = localStorage.getItem("Authorization");
      if (!token) {
        toast.error("No authorization token found");
        window.location.href = "/";
        return;
      }

      try {
        const response = await axios.get<CheckResponse>(
          `http://localhost:4000/users/check?event=${event?.toLowerCase()}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setFee(response.data.fee);
        setAlreadyRegistered(response.data.eventRegistered);
      } catch (error) {
        const axiosError = error as AxiosError<{ message?: string }>;
        if (axiosError.response?.status === 409) {
          const msg = axiosError.response?.data?.message;
          if (msg === "Already Registered in this Event") {
            setAlreadyRegistered(true);
          } else {
            toast.error(msg || "Something went wrong");
          }
        } else {
          toast.error(
            axiosError.response?.data?.message || "Something went wrong"
          );
        }
      } finally {
        setLoading(false);
      }
    };

    if (event) {
      checkRegistration();
    }
  }, [event]);

  const eventRegister = async (data: FormData) => {
    const token = localStorage.getItem("Authorization");
    if (!token) {
      toast.error("No authorization token found");
      window.location.href = "/";
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/users/register",
        {
          event,
          ...data,
          individual: false,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success(response.data.message);
      window.location.href = "/";
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(axiosError.response?.data?.message || "Something went wrong");
    }
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (showPayment) {
      eventRegister(data);
    } else {
      setShowPayment(true);
    }
  };

  if (loading)
    return (
      <p className="text-white text-center">Checking registration status...</p>
    );

  if (alreadyRegistered) {
    return (
      <div className="bg-zinc-800 p-6 rounded-lg shadow-lg text-white text-center max-w-md mx-auto">
        <h2 className="text-xl font-bold text-red-500 mb-4">
          🔒 Already Registered
        </h2>
        <p>
          You have already registered for{" "}
          <span className="text-yellow-400">{event?.toUpperCase()}</span>.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <form className="grid gap-3" onSubmit={handleSubmit(onSubmit)}>
        {!showPayment ? (
          <>
            <label className="text-white text-xl md:text-2xl pt-4 md:pt-7">
              Team Details :
            </label>
            <Input
              label="Team Name"
              id="name"
              type="text"
              register={register("name", {
                required: "Team Name is required",
              })}
              error={errors.name?.message as string | undefined}
            />
            
            {/* Player Information Grid */}
            <div className="grid grid-cols-1 gap-6 mb-2">
              {/* Player Card - Team Leader */}
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">Team Leader</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Name"
                    id="teamLeader"
                    type="text"
                    register={register("teamLeader", {
                      required: "Team Leader Name is required",
                    })}
                    error={errors.teamLeader?.message as string | undefined}
                  />
                  <Input
                    label="ID"
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
                </div>
              </div>

              {/* Player Card - Player 2 */}
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">Player 2</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Name"
                    id="Player2"
                    type="text"
                    register={register("Player2", {
                      required: "Player 2 Name is required",
                    })}
                    error={errors.Player2?.message as string | undefined}
                  />
                  <Input
                    label="ID"
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
                </div>
              </div>

              {/* Player Card - Player 3 */}
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">Player 3</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Name"
                    id="Player3"
                    type="text"
                    register={register("Player3", {
                      required: "Player 3 Name is required",
                    })}
                    error={errors.Player3?.message as string | undefined}
                  />
                  <Input
                    label="ID"
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
                </div>
              </div>

              {/* Player Card - Player 4 */}
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">Player 4</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Name"
                    id="Player4"
                    type="text"
                    register={register("Player4", {
                      required: "Player 4 Name is required",
                    })}
                    error={errors.Player4?.message as string | undefined}
                  />
                  <Input
                    label="ID"
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
                </div>
              </div>

              {/* Player Card - Player 5 */}
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">Player 5</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Name"
                    id="Player5"
                    type="text"
                    register={register("Player5", {
                      required: "Player 5 Name is required",
                    })}
                    error={errors.Player5?.message as string | undefined}
                  />
                  <Input
                    label="ID"
                    id="Player5Id"
                    type="number"
                    register={register("Player5Id", {
                      required: "Player 5 ID is required",
                    })}
                    error={errors.Player5Id?.message as string | undefined}
                  />
                  <Gender
                    register={register("gender5", {
                      required: "Gender is required",
                    })}
                    error={errors.gender5?.message as string}
                  />
                </div>
              </div>

              {/* Player Card - Substitute (Optional) */}
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">Substitute (Optional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Name"
                    id="Player6"
                    type="text"
                    register={register("Player6")}
                  />
                  <Input
                    label="ID"
                    id="Player6Id"
                    type="number"
                    register={register("Player6Id")}
                  />
                  <Gender
                    register={register("gender6")}
                    error={errors.gender6?.message as string}
                  />
                </div>
              </div>
            </div>

            {/* Team Leader Details */}
            <div id="teamleader" className="mt-5">
              <label
                htmlFor="teamleader"
                className="text-white text-xl md:text-2xl pt-3 md:pt-5"
              >
                Team Leader details:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div className="flex items-center justify-center mt-6">
              <Button label={"Continue"} type={"submit"} />
            </div>
          </>
        ) : (
          <div className="bg-zinc-800 p-4 md:p-6 rounded-md shadow-lg max-w-md mx-auto">
            <h2 className="text-white text-lg md:text-xl font-bold mb-4">
              Payment Section
            </h2>
            <img
              src="/s.jpg"
              alt="Payment QR"
              className="w-40 md:w-48 mx-auto mb-4"
            />
            <h3 className="text-white text-sm md:text-md">
              Registration Fee: ₹{fee}
            </h3>
            <div className="space-y-4 mt-4">
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
            </div>
            <div className="flex justify-between mt-6 gap-4">
              <Button
                label="Back"
                type="button"
                onClick={() => setShowPayment(false)}
              />
              <Button
                label="Register"
                type="submit"
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default MobileLegend;