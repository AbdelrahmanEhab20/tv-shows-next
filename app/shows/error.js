"use client";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="p-6 max-w-md w-full bg-white rounded-lg border border-red-300 shadow-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-2">
          An Error Occurred
        </h1>
        <p className="text-red-600">
          {error?.message || "Something went wrong. Please try again later."}
        </p>
        <button
          onClick={() => reset()}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
