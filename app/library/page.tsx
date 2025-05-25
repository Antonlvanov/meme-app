"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";

interface Meme {
  name: string;
  explanation: string;
  image: string;
}

export default function Library() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);

  useEffect(() => {
    const fetchMemes = async () => {
      const res = await fetch("/api/memes");
      const initialMemes = await res.json();

      const savedMemes = localStorage.getItem("addedMemes");
      const addedMemes = savedMemes ? JSON.parse(savedMemes) : [];
      setMemes([...initialMemes, ...addedMemes]);
    };
    fetchMemes();
  }, []);

  const openModal = (meme: Meme) => {
    setSelectedMeme(meme);
  };

  const closeModal = () => {
    setSelectedMeme(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col items-center p-6">
        <section className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4"></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {memes.map((meme) => (
              <div
                key={meme.name}
                className="cursor-pointer"
                onClick={() => openModal(meme)}
              >
                <div className="w-full h-[200px]">
                  <Image
                    src={meme.image}
                    alt={meme.name}
                    width={200}
                    height={200}
                    className="w-full h-full rounded-lg object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Modal */}
      {selectedMeme && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {selectedMeme.name}
            </h3>
            <div className="w-full h-[200px] mb-4">
              <Image
                src={selectedMeme.image}
                alt={selectedMeme.name}
                width={200}
                height={200}
                className="w-full h-full rounded-lg object-cover"
              />
            </div>
            <p className="text-gray-600 mb-4">{selectedMeme.explanation}</p>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 text-gray-800 font-medium hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
