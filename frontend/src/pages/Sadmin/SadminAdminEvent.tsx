import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const SadminAdminEvent = () => {
  const [adminEventData, setAdminEventData] = useState<any[]>([]);
  useEffect(() => {
    const fetchAdminEventData = async () => {
      const token = localStorage.getItem("Authorization");
      if (!token) {
        toast.error("No authorization token found");
        return;
      }
      try {
        const response = await axios.get(
          "http://localhost:4000/sadmin/event-admin",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setAdminEventData(response.data.adminEvent)
        toast.success(response.data.message);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    };
    fetchAdminEventData();
  }, []);
  return (
    <div className="overflow-x-auto">
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
          </tr>
        </thead>
        <tbody className="bg-zinc-800 divide-y divide-zinc-700">
          {adminEventData?.map((item: any) => (
            <tr key={item.id}>
              <td className="px-4 py-2">{item.event?.id || "N/A"}</td>
              <td className="px-4 py-2">{item.event?.event || "N/A"}</td>
              <td className="px-4 py-2">{item.event?.date || "N/A"}</td>
              <td className="px-4 py-2">{item.event?.description || "N/A"}</td>
              <td className="px-4 py-2">₹{item.event?.fee || "N/A"}</td>
              <td className="px-4 py-2">{item.email}</td>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SadminAdminEvent