import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/Button";

type RegisteredEvent = {
  id: number;
  createdAt: string;
  name: string;
  gender: string | null;
  contact: string;
  address: string;
  transactionId: string;
  bankingName: string;
  approved: boolean;
  individual: boolean;
  user?: {
    email: string;
  };
  event: {
    event: string;
    date: string;
    description: string;
    fee: string;
  };
  team?: {
    teamName: string;
    players: any[]; // adjust type if you want detailed player info
  };
};

const EventRegistered = () => {
  const [eventsRegistered, setEventsRegistered] = useState<RegisteredEvent[]>(
    []
  );

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      const token = localStorage.getItem("Authorization");
      if (!token) {
        console.warn("No auth token found");
        return;
      }
      try {
        const response = await axios.get(
          "http://localhost:4000/users/registered",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setEventsRegistered(response.data.registeredDetails);
      } catch (error) {
        console.error("Error fetching registration data:", error);
      }
    };

    fetchRegisteredEvents();
  }, []);

  return (
    <div className="p-4">
      {eventsRegistered && eventsRegistered.length > 0 ? (
        eventsRegistered.map((item, index) => (
          <div
            key={index}
            className="mb-4 p-4 bg-zinc-800 rounded-md shadow-md shadow-red-500/30"
          >
            <h3 className="text-red-500 font-bold text-xl text-center mb-4">
              {item.event?.event.toUpperCase() || "Event Name N/A"}
            </h3>

            <InfoRow
              label="📅 Date of Registration:"
              value={
                new Date(item.createdAt).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                }) || "No date"
              }
            />

            <InfoRow label="📧 Email:" value={item.user?.email || "N/A"} />

            <InfoRow
              label="🙍‍♂️ Name:"
              value={
                item.individual
                  ? item.name || "No name"
                  : item.team?.teamName || "No team name"
              }
            />

            <InfoRow
              label="💳 Transaction ID:"
              value={item.transactionId || "N/A"}
            />

            <InfoRow
              label="🧾 Banking Name:"
              value={item.bankingName || "N/A"}
            />

            <InfoRow
              label="✅ Status:"
              value={item.approved ? "Approved" : "Pending"}
            />

            <div className="flex justify-end mt-3">
              <Button label="Download" />
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No events registered yet.</p>
      )}
    </div>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between gap-4 border-b border-zinc-700 pb-1">
    <span className="font-medium text-zinc-300 min-w-[140px]">{label}</span>
    <span className="text-right break-all flex-1">{value}</span>
  </div>
);

export default EventRegistered;
