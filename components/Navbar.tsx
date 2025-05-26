import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Brainrot Explorer
        </h1>
        <div className="flex gap-4">
          <Link href="/">
            <span
              className={`px-4 py-2 text-gray-600 font-medium ${
                pathname === "/" ? "border-b-2 border-gray-600" : ""
              }`}
            >
              Search
            </span>
          </Link>
          <Link href="/game">
            <span
              className={`px-4 py-2 text-gray-600 font-medium ${
                pathname === "/game" ? "border-b-2 border-gray-600" : ""
              }`}
            >
              Game
            </span>
          </Link>
          <Link href="/library">
            <span
              className={`px-4 py-2 text-gray-600 font-medium ${
                pathname === "/library" ? "border-b-2 border-gray-600" : ""
              }`}
            >
              Library
            </span>
          </Link>
          <Link href="/add-meme">
            <span
              className={`px-4 py-2 text-gray-600 font-medium ${
                pathname === "/add-meme" ? "border-b-2 border-gray-600" : ""
              }`}
            >
              Add
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
