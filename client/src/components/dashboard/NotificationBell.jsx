import { useState } from "react";
import { FaBell } from "react-icons/fa";

export default function NotificationBell({ notifications = [] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >
        <FaBell className="text-xl text-gray-700 dark:text-gray-200" />

        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50">
          <div className="p-4 border-b dark:border-gray-700">
            <h3 className="font-semibold text-gray-800 dark:text-white">
              Notifications
            </h3>
          </div>

          {notifications.length === 0 ? (
            <p className="p-6 text-center text-gray-500 dark:text-gray-400">
              No notifications
            </p>
          ) : (
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border-b last:border-none dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <p className="font-medium text-gray-800 dark:text-white">
                    {item.title}
                  </p>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {item.message}
                  </p>

                  <span className="text-xs text-gray-400">{item.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
