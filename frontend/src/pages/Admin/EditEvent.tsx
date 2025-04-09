import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useForm } from "react-hook-form";
import Input from "../../components/Input";

const EditEvent = () => {
  const [eventData, setEventData] = useState<any>(null);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchEvent = async () => {
      const token = localStorage.getItem("Authorization");
      if (!token) return toast.error("No authorization token found");

      try {
        const response = await axios.get("http://localhost:4000/admin/event", {
          headers: { Authorization: token },
        });

        const event = response.data.eventDetails.event;
        setEventData(event);

        reset({
          event: event?.event || "",
          date: event?.date || "",
          description: event?.description || "",
          fee: event?.fee || "",
        });

        toast.success(response.data.message);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    };

    fetchEvent();
  }, [reset]);

  const handleUpdate = async (data: any) => {
    const token = localStorage.getItem("Authorization");
    if (!token || !eventData) return toast.error("Missing token or event");

    // Clean empty strings to undefined
    const cleanedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        value === "" ? undefined : value,
      ])
    );

    try {
      await axios.put(
        "http://localhost:4000/admin/event",
        {
          ...cleanedData,
          eventId: eventData?.id,
        },
        {
          headers: { Authorization: token },
        }
      );

      toast.success("Event updated successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/70 p-4">
      <form
        onSubmit={handleSubmit(handleUpdate)}
        className="bg-zinc-900 text-white rounded-lg p-6 w-full max-w-md relative"
      >
        <h2 className="text-xl font-semibold mb-4">Edit Event</h2>

        <Input
          label="Event Name"
          id="event"
          type="text"
          register={register("event")}
        />
        <Input
          label="Date"
          id="date"
          type="text"
          register={register("date")}
        />
        <Input
          label="Description"
          id="description"
          type="text"
          register={register("description")}
        />
        <Input
          label="Fee"
          id="fee"
          type="number"
          register={register("fee")}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 mt-4 py-2 rounded hover:bg-blue-700"
        >
          Update Event
        </button>
      </form>
    </div>
  );
};

export default EditEvent