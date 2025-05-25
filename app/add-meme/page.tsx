"use client";

import { useState, useEffect } from "react";
import Image from "next/image"; // Заменим <img> на <Image>
import Navbar from "@/components/Navbar";

export default function AddMeme() {
  const [name, setName] = useState("");
  const [explanation, setExplanation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [addedMemes, setAddedMemes] = useState<
    { name: string; explanation: string; image: string }[]
  >([]);

  // Загружаем добавленные мемы из localStorage при монтировании
  useEffect(() => {
    const savedMemes = localStorage.getItem("addedMemes");
    if (savedMemes) {
      setAddedMemes(JSON.parse(savedMemes));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !explanation || !imageUrl) {
      alert("Please fill in all fields!");
      return;
    }

    const newMeme = { name, explanation, image: imageUrl };
    const updatedMemes = [...addedMemes, newMeme];
    setAddedMemes(updatedMemes);
    localStorage.setItem("addedMemes", JSON.stringify(updatedMemes));
    setName("");
    setExplanation("");
    setImageUrl("");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col items-center p-6">
        <section className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Add a New Meme
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Description</label>
              <textarea
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                placeholder="Enter description"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Image URL</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-300 text-gray-800 font-medium hover:bg-gray-400"
            >
              Add Meme
            </button>
          </form>

          {addedMemes.length > 0 && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800">
                Added Memes
              </h3>
              {addedMemes.map((meme, index) => (
                <div key={index} className="mb-4">
                  <p className="text-gray-600">Name: {meme.name}</p>
                  <p className="text-gray-600">
                    Description: {meme.explanation}
                  </p>
                  <div className="w-full max-w-xs mt-2">
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
          )}
        </section>
      </div>
    </div>
  );
}
