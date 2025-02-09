// app/error.js
'use client';

export default function Error({ error, reset }) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h2 className="mb-4 font-bold text-2xl text-gray-900">
          Something went wrong!
          {error}
        </h2>
        <button
          onClick={() => reset()}
          className="bg-pink-600 hover:bg-pink-700 px-6 py-2 rounded-md font-medium text-white transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}