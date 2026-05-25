import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Mail, MessageSquare, Smartphone, CalendarDays, Clock, Upload, ChevronDown } from "lucide-react";
import { sendNotification } from "../../api/notificationApi";
import NotificationPreview from "../../components/NotificationPreview";

const CHANNELS = [
  { key: "Push",   label: "Push Notification", sub: "Send Push Notification To Mobile App Users",  icon: Bell,          color: "bg-yellow-100", iconColor: "text-yellow-500" },
  { key: "Email",  label: "Email",              sub: "Send Email Notification To Customers",         icon: Mail,          color: "bg-green-100",  iconColor: "text-green-500"  },
  { key: "SMS",    label: "SMS",                sub: "Send SMS Notification To Customers",            icon: MessageSquare, color: "bg-blue-100",   iconColor: "text-blue-500"   },
  { key: "In-App", label: "In-App Notification",sub: "Show Notification In The App Inbox",            icon: Smartphone,    color: "bg-purple-100", iconColor: "text-purple-500" },
];

const VARIABLES = ["{Customer_name}", "{Points}", "{Expiry_Date}"];

export default function SendNotification() {
  const navigate = useNavigate();

  const [audience,   setAudience]   = useState("All Customers");
  const [tier,       setTier]       = useState("All Tiers");
  const [channels,   setChannels]   = useState(["Push"]);
  const [schedule,   setSchedule]   = useState("Send Now");
  const [schedDate,  setSchedDate]  = useState("");
  const [schedTime,  setSchedTime]  = useState("10.30 AM");
  const [title,      setTitle]      = useState("");
  const [message,    setMessage]    = useState("");
  const [image,      setImage]      = useState(null);
  const [error,      setError]      = useState("");
  const [loading,    setLoading]    = useState(false);

  const toggleChannel = (key) =>
    setChannels((prev) =>
      prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key]
    );

  const insertVariable = (v) => setMessage((prev) => prev + v);

  const handleImageDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files[0] || e.target.files?.[0];
    if (file) setImage(file);
  };

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    const data = await sendNotification({
      title, message, audience, membershipTier: tier,
      channels, schedule,
      scheduledAt: schedule === "Schedule for Later" ? `${schedDate}T${schedTime}` : undefined,
    });
    setLoading(false);
    if (data.success) navigate("/admin/notifications");
    else setError(data.message || "Failed to send notification.");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-xl font-bold text-gray-900 mb-1">Send Notification</h1>
        <p className="text-sm text-gray-500 mb-6">Send Notifications to your customers via different Channels.</p>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        <div className="grid grid-cols-3 gap-5">

          {/* ── Left Column ──────────────────────────────────── */}
          <div className="col-span-1 flex flex-col gap-5">

            {/* 1 Select Audience */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-yellow-400 text-white text-xs font-bold flex items-center justify-center">1</span>
                <span className="font-semibold text-gray-800 text-sm">Select Audience</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">Send To</p>
              {["All Customers", "Specific Customers", "Customer Segment"].map((a) => (
                <label key={a} className="flex items-center gap-2 mb-2 cursor-pointer">
                  <input
                    type="radio" name="audience" value={a}
                    checked={audience === a}
                    onChange={() => setAudience(a)}
                    className="accent-yellow-400"
                  />
                  <span className="text-sm text-gray-700">{a}</span>
                </label>
              ))}
              <p className="text-xs text-gray-500 mt-4 mb-2">Membership Tier (Optional)</p>
              <div className="relative">
                <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none appearance-none"
                >
                  <option>All Tiers</option>
                  <option>Gold Tier</option>
                  <option>Silver Tier</option>
                  <option>Bronze Tier</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* 2 Choose Channel */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-yellow-400 text-white text-xs font-bold flex items-center justify-center">2</span>
                <span className="font-semibold text-gray-800 text-sm">Choose Channel</span>
              </div>
              <div className="flex flex-col gap-3">
                {CHANNELS.map(({ key, label, sub, icon: Icon, color, iconColor }) => (
                  <label key={key} className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg ${color} flex items-center justify-center`}>
                        <Icon size={17} className={iconColor} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{label}</p>
                        <p className="text-xs text-gray-400">{sub}</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={channels.includes(key)}
                      onChange={() => toggleChannel(key)}
                      className="accent-yellow-400 w-4 h-4"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* 3 Schedule */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-yellow-400 text-white text-xs font-bold flex items-center justify-center">3</span>
                <span className="font-semibold text-gray-800 text-sm">Schedule (Optional)</span>
              </div>
              <div className="flex gap-4 mb-4">
                {["Send Now", "Schedule for Later"].map((s) => (
                  <label key={s} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio" name="schedule" value={s}
                      checked={schedule === s}
                      onChange={() => setSchedule(s)}
                      className="accent-yellow-400"
                    />
                    <span className="text-sm text-gray-700">{s}</span>
                  </label>
                ))}
              </div>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <input
                    type="date" value={schedDate}
                    onChange={(e) => setSchedDate(e.target.value)}
                    disabled={schedule === "Send Now"}
                    placeholder="DD/MM/YYYY"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none disabled:bg-gray-50 disabled:text-gray-400"
                  />
                  <CalendarDays size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative flex-1">
                  <input
                    type="text" value={schedTime}
                    onChange={(e) => setSchedTime(e.target.value)}
                    disabled={schedule === "Send Now"}
                    placeholder="10.30 AM"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none disabled:bg-gray-50 disabled:text-gray-400"
                  />
                  <Clock size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* ── Middle Column ─────────────────────────────────── */}
          <div className="col-span-1 flex flex-col gap-5">
            <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-yellow-400 text-white text-xs font-bold flex items-center justify-center">4</span>
                <span className="font-semibold text-gray-800 text-sm">Notification Content</span>
              </div>

              {/* Title */}
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Title <span className="text-red-500">*</span></label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value.slice(0, 100))}
                  placeholder="Special Reward Just For You!"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <p className="text-xs text-gray-400 text-right mt-1">{title.length}/100</p>
              </div>

              {/* Message */}
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Message <span className="text-red-500">*</span></label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, 500))}
                  rows={5}
                  placeholder="Hello {Customer_name},"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                />
                <p className="text-xs text-gray-400 text-right">{message.length}/500</p>
              </div>

              {/* Insert Variables */}
              <div>
                <p className="text-xs text-gray-600 mb-2">Insert Variables</p>
                <div className="flex gap-2 flex-wrap">
                  {VARIABLES.map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => insertVariable(v)}
                      className="border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <p className="text-xs text-gray-600 mb-2">Image(Optional)</p>
                <div
                  onDrop={handleImageDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center py-10 cursor-pointer hover:bg-gray-50"
                  onClick={() => document.getElementById("img-upload").click()}
                >
                  <Upload size={22} className="text-gray-400 mb-2" />
                  <p className="text-xs text-gray-500">
                    {image ? image.name : "Click to upload or drag and drop"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP · Max 5MB each</p>
                  <input id="img-upload" type="file" accept="image/*" className="hidden" onChange={handleImageDrop} />
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Column ──────────────────────────────────── */}
          <div className="col-span-1 flex flex-col justify-between">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <p className="text-sm font-semibold text-gray-800 mb-4">Preview</p>
              <NotificationPreview title={title} message={message} />
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => navigate("/admin/notifications")}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg text-sm disabled:opacity-60"
              >
                {loading ? "Sending..." : "Review & Send"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}