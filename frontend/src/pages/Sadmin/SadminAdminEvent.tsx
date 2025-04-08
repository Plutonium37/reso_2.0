import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useForm } from "react-hook-form";
import Input from "../../components/Input";

const SadminAdminEvent = () => {
  const [adminEventData, setAdminEventData] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchAdminEventData = async () => {
      const token = localStorage.getItem("Authorization");
      if (!token) return toast.error("No authorization token found");

      try {
        const response = await axios.get(
          "http://localhost:4000/sadmin/event-admin",
          {
            headers: { Authorization: token },
          }
        );
        setAdminEventData(response.data.adminEvent);
        toast.success(response.data.message);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    };
    fetchAdminEventData();
  }, []);

  const openEditModal = (item: any) => {
    setSelectedEvent(item);
    setIsModalOpen(true);
    reset({
      event: item.event?.event || "",
      date: item.event?.date || "",
      description: item.event?.description || "",
      fee: item.event?.fee || "",
    });
  };

  const handleUpdate = async (data: any) => {
    const token = localStorage.getItem("Authorization");
    if (!token || !selectedEvent) return toast.error("Missing token or event");

    // Convert empty strings to undefined
    const cleanedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        value === "" ? undefined : value,
      ])
    );

    try {
      await axios.put(
        "http://localhost:4000/sadmin/event",
        {
          ...cleanedData,
          eventId: selectedEvent.event?.id,
        },
        {
          headers: { Authorization: token },
        }
      );
      toast.success("Event updated successfully");
      setIsModalOpen(false);
      setSelectedEvent(null);
      setAdminEventData((prev) =>
        prev.map((item) =>
          item.event?.id === selectedEvent.event?.id
            ? { ...item, event: { ...item.event, ...cleanedData } }
            : item
        )
      );
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="overflow-x-auto relative">
      <table className="min-w-full text-sm text-left text-white">
        <thead className="bg-red-500 text-white">
          <tr>
            <th className="px-4 py-2">Event ID</th>
            <th className="px-4 py-2">Event Name</th>
            <th className="px-4 py-2">Event Date</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Fee</th>
            <th className="px-4 py-2">Admin Email</th>
            <th className="px-4 py-2">Admin Name</th>
            <th className="px-4 py-2">Password</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-zinc-800 divide-y divide-zinc-700">
          {adminEventData?.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-2">{item.event?.id || "N/A"}</td>
              <td className="px-4 py-2">{item.event?.event || "N/A"}</td>
              <td className="px-4 py-2">{item.event?.date || "N/A"}</td>
              <td className="px-4 py-2">{item.event?.description || "N/A"}</td>
              <td className="px-4 py-2">₹{item.event?.fee || "N/A"}</td>
              <td className="px-4 py-2">{item.email}</td>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.password}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => openEditModal(item)}
                  className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <form
            onSubmit={handleSubmit(handleUpdate)}
            className="bg-zinc-900 text-white rounded-lg p-6 w-full max-w-md relative"
          >
            <button
              onClick={() => {
                setIsModalOpen(false);
                setSelectedEvent(null);
              }}
              type="button"
              className="absolute top-2 right-2 text-red-500 text-xl"
            >
              ✕
            </button>
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
      )}
    </div>
  );
};

export default SadminAdminEvent;
