import React from "react";

export default function Blob() {
  return (
    <div className="relative w-20 h-20">
      <div className="absolute inset-0 bg-blue-500 rounded-full animate-pulse opacity-60 blur-xl"></div>
      <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-70 blur-md"></div>
      <div className="absolute inset-0 bg-blue-400 rounded-full opacity-80"></div>
    </div>
  );
}
