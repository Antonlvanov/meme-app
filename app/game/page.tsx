"use client";

import Game from "@/components/Game";
import Navbar from "@/components/Navbar";

export default function GamePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col items-center p-6">
        <section className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Guess the name
          </h2>
          <Game />
        </section>
      </div>
    </div>
  );
}
