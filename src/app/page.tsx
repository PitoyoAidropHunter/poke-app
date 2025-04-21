"use client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

interface pokeData {
  name: string;
  sprites: {
    front_default: string;
  };
}
export default function Home() {
  const [pokemon, setPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState<pokeData | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/" + pokemon.toLowerCase()
      );
      setPokemonData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 ">
        <h1 className="text-3xl font-semibold mb-2 text-gray-800">
          Search Your Pokemon
        </h1>
        <div className="flex items-center justify-center w-full h-full ">
          <input
            type="text"
            placeholder="Enter Pokemon Name"
            onChange={(e) => setPokemon(e.target.value)}
            className="border-2 border-gray-300 text-gray-500 py-2 px-4 rounded-l-full"
          />
          <button
            onClick={() => fetchData()}
            className="bg-blue-500 text-white relative right-2 py-2.5 px-4 rounded-r-full hover:bg-blue-600 transition duration-300 ease-in-out cursor-pointer"
          >
            Search
          </button>
        </div>
        <div className="mt-4">
          {pokemonData ? (
            <>
              <p className="text-lg text-gray-500 text-center">
                <strong>{pokemonData.name}</strong>
              </p>
              <Image
                src={pokemonData.sprites.front_default}
                alt={pokemonData.name}
                width={300}
                height={300}
              />
            </>
          ) : (
            <p>Not found</p>
          )}
        </div>
      </div>
    </>
  );
}
