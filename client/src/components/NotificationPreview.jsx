import { Gift } from "lucide-react";

export default function NotificationPreview({ title, message }) {
  const rendered = message
    .replace("{Customer_name}", "Amara")
    .replace("{Points}", "200")
    .replace("{Expiry_Date}", "30/05/2026");

  const hasPoints = message.includes("{Points}");

  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-white text-sm">
      <p className="font-bold text-gray-900 mb-1">House Of Cambridge</p>
      <p className="font-bold text-gray-900 mb-3">{title || "Notification Title"}</p>
      <div className="text-xs text-gray-600 whitespace-pre-line leading-relaxed mb-3">
        {rendered || "Your message will appear here..."}
      </div>
      {hasPoints && (
        <div className="bg-green-50 rounded-lg px-4 py-3 flex items-center gap-3 mb-3">
          <Gift size={22} className="text-green-600" />
          <div>
            <p className="text-xs text-green-700">You Have Earned</p>
            <p className="text-sm font-bold text-green-700">200 Points</p>
          </div>
        </div>
      )}
      <p className="text-xs text-gray-600">Thank You,<br />House Of Cambridge Team</p>
    </div>
  );
}