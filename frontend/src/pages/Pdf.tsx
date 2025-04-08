import { useRef } from "react";

const Pdf = ({ item }: { item: any }) => {
  const printRef = useRef<HTMLDivElement>(null);

  function parseRules(ruleString: string): string[] {
    return ruleString
      .split("-")
      .map((rule) => rule.trim())
      .filter((rule) => rule.length > 0);
  }

  const handlePrint = () => {
    const printContent = printRef.current;
    if (printContent) {
      const printWindow = window.open("", "", "width=800,height=600");
      if (printWindow) {
        const doc = printWindow.document;

        // Build the content using DOM APIs
        doc.open();
        const html = doc.createElement("html");
        const head = doc.createElement("head");
        const style = doc.createElement("style");

        style.textContent = `
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            display: flex;
            justify-content: center;
          }
          .print-container {
            width: 700px;
          }
          h2, h3 {
            color: #dc2626;
            text-align: center;
            margin: 20px 0 10px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          th, td {
            border: 1px solid #ccc;
            padding: 10px;
            text-align: left;
          }
          th {
            background-color: #f3f4f6;
          }
          ul {
            padding-left: 20px;
          }
          hr {
            margin: 20px 0;
          }
        `;
        head.appendChild(style);
        html.appendChild(head);

        const body = doc.createElement("body");
        const container = doc.createElement("div");
        container.className = "print-container";
        container.innerHTML = printContent.innerHTML;

        body.appendChild(container);
        html.appendChild(body);
        doc.write(html.outerHTML);
        doc.close();

        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }
    }
  };

  const ruleText = item?.event?.description || item?.event?.description || "";
  const rules = parseRules(ruleText);

  return (
    <div className="border p-6 m-6 rounded-2xl bg-white text-black shadow-md print:shadow-none">
      <div ref={printRef} className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-red-600 text-center mb-6">
          Event Registration
        </h2>

        <div className="mb-6 space-y-2">
          <p>
            <strong>Event:</strong> {item.event.event.toUpperCase()}
          </p>
          <p>
            <strong>Date of Registration:</strong>{" "}
            {new Date(item.createdAt).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
              year: "numeric",
              month: "long",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            }) || "No date"}
          </p>
          <p>
            <strong>Fee:</strong> ₹{item.event.fee}
          </p>
        </div>

        <hr className="my-6 border-gray-300" />

        <table className="w-full border border-gray-300 text-sm mb-6">
          <tbody>
            {[
              ["Register Name", item.name],
              ["Email", item.user.email],
              ["Contact", item.contact],
              ["Address", item.address],
              ["Payment ID", item.transactionId],
              ["Bank", item.bankingName],
              ["Payment Status", item.approved ? "Yes" : "Pending"],
            ].map(([label, value], idx) => (
              <tr key={idx}>
                <th className="border px-4 py-2 bg-gray-100 text-left font-medium w-1/3">
                  {label}
                </th>
                <td className="border px-4 py-2">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {item.team?.players?.length > 0 && (
          <>
            <h3 className="text-lg font-semibold text-red-500 mb-2">
              Team: {item.team.teamName}
            </h3>
            <table className="w-full border border-gray-300 text-sm mb-6">
              <thead>
                <tr>
                  <th className="border px-4 py-2 bg-gray-100 text-left">
                    Name
                  </th>
                  <th className="border px-4 py-2 bg-gray-100 text-left">
                    Gender
                  </th>
                  <th className="border px-4 py-2 bg-gray-100 text-left">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody>
                {item.team.players.map((player: any, idx: number) => (
                  <tr key={idx}>
                    <td className="border px-4 py-2">{player.name}</td>
                    <td className="border px-4 py-2">{player.gender}</td>
                    <td className="border px-4 py-2">
                      {player.teamLeader ? "Leader" : "Member"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {rules.length > 0 && (
          <>
            <h3 className="text-lg font-semibold text-red-500 mb-2">
              Event Rules
            </h3>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              {rules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      <button
        onClick={handlePrint}
        className="mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition"
      >
        Print / Download
      </button>
    </div>
  );
};

export default Pdf;
