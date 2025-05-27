// PokemonList.jsx
import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";

const allowedTypes = ["grass", "fire", "water"];

const PokemonList = () => {
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokedex/2/");
        const data = await res.json();
        const entries = data.pokemon_entries.slice(0,30);
        // console.log("total :", entries.length)
        const result = [];
        

        for (const entry of entries) {
          const name = entry.pokemon_species.name;
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
          const data = await res.json();
          const hasType = data.types.some(t => allowedTypes.includes(t.type.name));
          if (hasType) result.push(data);
        }
        console.log(result[0]);
        setFilteredPokemon(result);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  if (loading) return <p>Loading Pokémon...</p>;

  return (
    <div>
      <h1>Filtered Pokemon</h1>
      <ul>
        {filteredPokemon.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
