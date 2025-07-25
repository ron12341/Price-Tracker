const StatusDisplay = ({ status }) => {
  const statusMap = {
    pending: { color: "bg-yellow-100 text-yellow-800", text: "Pending" },
    approved: { color: "bg-green-100 text-green-800", text: "Approved" },
    rejected: { color: "bg-red-100 text-red-800", text: "Rejected" },
  };

  return (
    <span
      className={`text-xs px-2.5 py-0.5 rounded-full ${
        statusMap[status]?.color || "bg-gray-100"
      }`}
    >
      {statusMap[status]?.text || status}
    </span>
  );
};

export default StatusDisplay;
