import { useState } from "react";
import MinimalPayButton from "../components/payment/MinimalPayButton";

export default function Developers() {
  const [amount, setAmount] = useState(500);
  const [eventId, setEventId] = useState("");
  const [contact, setContact] = useState("");

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-8 bg-gray-900 rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-8 text-purple-400">
          Payment Testing
        </h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Amount (₹)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Event ID (optional)
            </label>
            <input
              type="text"
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Leave empty for general payment"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Contact Number (optional)
            </label>
            <input
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter contact number"
            />
          </div>

          <div className="pt-4">
            <MinimalPayButton
              amount={amount}
              eventId={eventId || null}
              contact={contact || null}
              title="AB26 Test Payment"
              description="Testing payment integration"
              className="w-full text-lg font-semibold"
            >
              Pay ₹{amount}
            </MinimalPayButton>
          </div>

          <div className="mt-6 p-4 bg-gray-800 rounded-md">
            <h3 className="text-sm font-medium text-gray-300 mb-2">
              Test Details:
            </h3>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• Amount: ₹{amount}</li>
              <li>• Event ID: {eventId || "None"}</li>
              <li>• Contact: {contact || "None"}</li>
              <li>• Uses documented payment API</li>
              <li>• Requires authentication</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
