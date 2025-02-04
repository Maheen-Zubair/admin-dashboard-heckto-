"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Home } from "lucide-react";

export default function UnauthorizedPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    if (countdown === 0) router.push("/");

    return () => clearInterval(timer);
  }, [countdown, router]);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-md w-full p-8 md:ml-52 bg-white dark:bg-gray-800 shadow-xl rounded-2xl text-center border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center w-16 h-16 bg-red-100 text-red-600 rounded-full mx-auto animate-bounce">
          <AlertTriangle size={40} />
        </div>

        <h1 className="text-3xl font-extrabold text-gray-800 dark:text-red-400 mt-4">
          Unauthorized Access
        </h1>

        <p className="mt-3 text-gray-600 dark:text-gray-300">
          You do not have permission to view this page.
        </p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Redirecting to home in <span className="font-bold">{countdown}</span> seconds...
        </p>

        <button
          onClick={() => router.push("/")}
          className="mt-6 px-5 py-3 bg-red-600 text-white font-medium rounded-lg shadow-md hover:bg-red-700 transition duration-300 flex items-center justify-center gap-2 mx-auto"
        >
          <Home size={18} />
          Go Back Home
        </button>
      </div>
    </div>
  );
}
