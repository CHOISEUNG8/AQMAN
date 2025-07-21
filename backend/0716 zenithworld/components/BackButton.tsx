"use client"

export default function BackButton() {
  return (
    <button
      className="border rounded px-4 py-2 text-gray-800 hover:bg-gray-100"
      onClick={() => window.history.back()}
    >
      이전 페이지로
    </button>
  );
} 