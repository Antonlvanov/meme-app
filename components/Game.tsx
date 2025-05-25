"use client";

import { useState } from "react";
import Image from "next/image";

export default function Game() {
  const [meme, setMeme] = useState<{ name: string; image: string } | null>(
    null
  );
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const fetchRandomMeme = async () => {
    const res = await fetch("/api/memes?random=true");
    const data = await res.json();
    setMeme(data);
    setGuess("");
    setFeedback("");
    setAttempts(0);
  };

  const startGame = () => {
    setIsGameRunning(true);
    fetchRandomMeme();
  };

  const stopGame = () => {
    setIsGameRunning(false);
    setMeme(null);
    setGuess("");
    setFeedback("");
    setAttempts(0);
  };

  const checkGuess = () => {
    if (!meme) return;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (guess.toLowerCase() === meme.name.toLowerCase()) {
      setFeedback("Correct!");
      setScore((prev) => prev + 1);
      setTimeout(() => {
        fetchRandomMeme();
      }, 1000);
    } else {
      if (newAttempts >= 3) {
        setFeedback(`Out of attempts! The meme was: ${meme.name}`);
        setTimeout(() => {
          fetchRandomMeme();
        }, 2000);
      } else {
        setFeedback(`Incorrect, ${3 - newAttempts} attempts left!`);
      }
    }
  };

  return (
    <div className="relative">
      {/* Score display */}
      <div className="absolute top-0 right-0 bg-gray-200 text-gray-800 px-3 py-1 rounded">
        Score: {score}
      </div>

      {isGameRunning ? (
        <button
          onClick={stopGame}
          className="px-4 py-2 bg-gray-300 text-gray-800 font-medium hover:bg-gray-400 mb-4"
        >
          Stop Game
        </button>
      ) : (
        <button
          onClick={startGame}
          className="px-4 py-2 bg-gray-300 text-gray-800 font-medium hover:bg-gray-400 mb-4"
        >
          Start Game
        </button>
      )}
      {meme && (
        <div className="flex flex-col items-center">
          <div className="w-full max-w-2xl mb-4 h-[400px]">
            <Image
              src={meme.image}
              alt="Guess the meme"
              width={640}
              height={400}
              className="w-full h-full rounded-lg"
            />
          </div>
          <div className="flex gap-4 w-full max-w-md">
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Enter meme name"
              className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <button
              onClick={checkGuess}
              className="px-4 py-2 bg-gray-300 text-gray-800 font-medium hover:bg-gray-400"
            >
              Check
            </button>
          </div>
          {feedback && (
            <p
              className={`mt-2 ${
                feedback === "Correct!" ? "text-green-600" : "text-red-600"
              }`}
            >
              {feedback}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
