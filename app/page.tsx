"use client";

import { useState } from "react";
import Card from "@/components/Card";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [query, setQuery] = useState("");
  const [memes, setMemes] = useState<
    { name: string; explanation: string; image: string }[]
  >([]);

  const handleSearch = async () => {
    const res = await fetch(`/api/memes?query=${query}`);
    const data = await res.json();
    setMemes(data);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col items-center p-6">
        <section className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Search</h2>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter name"
              className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-gray-300 text-gray-800 font-medium hover:bg-gray-400"
            >
              Search
            </button>
          </div>
          {memes.length > 0 ? (
            memes.map((meme) => <Card key={meme.name} {...meme} />)
          ) : (
            <p className="text-gray-500"></p>
          )}
        </section>
      </div>
    </div>
  );
}
