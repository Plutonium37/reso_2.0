import Button from "../../components/Button";
import Input from "../../components/Input";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import axios from "../../utils/axios";

type EventData = {
  AdminName: string;
  AdminEmail: string;
  AdminPassword: string;
  eventName: string;
  eventDate: string;
  eventDescription: string;
  eventFee: number;
};

const CreateAdminEvent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const eventRegister = async (data: EventData) => {
    const token = localStorage.getItem("Authorization");
    if (!token) {
      toast.error("No authorization token found");
      return;
    }
    try {
      const response = await axios.post(
        "/sadmin/event-admin",
        {
          name: data.AdminName,
          adminEmail: data.AdminEmail,
          adminPassword: data.AdminPassword,
          event: data.eventName,
          date: data.eventDate,
          description: data.eventDescription,
          fee: data.eventFee,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const onSubmit = (data: any) => {
    eventRegister(data);
  };

  return (
    <div className="">
      <form className="grid gap-3" onSubmit={handleSubmit(onSubmit)}>
        <div id="admin" className="mt-5">
          <label htmlFor="admin" className="text-white text-2xl pt-5">
            Admin Details:
          </label>
          <Input
            label="Admin Name"
            id="AdminName"
            type="text"
            register={register("AdminName", {
              required: "AdminName is required",
            })}
            error={errors.AdminName?.message as string | undefined}
          />
          <div>
            <Input
              label="Admin Email"
              id="AdminEmail"
              type="email"
              register={register("AdminEmail", {
                required: "AdminEmail is required",
              })}
              error={errors.AdminEmail?.message as string | undefined}
            />
            <Input
              label="Admin Password"
              id="AdminPassword"
              type="password"
              register={register("AdminPassword", {
                required: "AdminPassword is required",
              })}
              error={errors.AdminPassword?.message as string | undefined}
            />
          </div>
        </div>
        <div className="bg-zinc-800 p-6 rounded-md shadow-lg">
          <h2 className="text-white text-xl font-bold mb-4">Event Details</h2>
          <Input
            label="Event Name"
            id="eventName"
            type="text"
            register={register("eventName", {
              required: "Event Name is required",
            })}
            error={errors.eventName?.message as string}
          />
          <Input
            label="Event Date"
            id="eventDate"
            type="text"
            register={register("eventDate", {
              required: "Event Date is required",
            })}
            error={errors.eventDate?.message as string}
          />
          <Input
            label="Event Description"
            id="eventDescription"
            type="text"
            register={register("eventDescription", {
              required: "Event Description is required",
            })}
            error={errors.eventDescription?.message as string}
          />
          <Input
            label="Event Fee"
            id="eventFee"
            type="number"
            register={register("eventFee", {
              required: "Event Fee is required",
            })}
            error={errors.eventFee?.message as string}
          />
          <div className="flex justify-between mt-4">
            <Button label="Create" type="submit" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateAdminEvent;
