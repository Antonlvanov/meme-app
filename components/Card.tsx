import Image from "next/image";

interface CardProps {
  name: string;
  explanation: string;
  image: string;
}

export default function Card({ name, explanation, image }: CardProps) {
  return (
    <div className="bg-gray-50 rounded-lg shadow-sm p-4 mb-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{name}</h2>
      <div className="w-full max-w-2xl mx-auto mb-4 h-[400px]">
        <Image
          src={image}
          alt={name}
          width={640} // Удвоенная ширина (примерно 2 * 320px)
          height={400} // Удвоенная высота (примерно 2 * 200px)
          className="w-full h-full rounded-lg"
        />
      </div>
      <p className="text-gray-600">{explanation}</p>
    </div>
  );
}
