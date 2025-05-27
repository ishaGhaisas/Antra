const PokemonCard = ({ pokemon }) => {
  const typeStrength = {
    grass: 1,
    water: 2,
    fire: 3,
  };

  const mainType = pokemon.types[0].type.name;
  const rank = typeStrength[mainType] || 0;

  return (
    <div className={`card ${mainType} rank-${rank}`}>
      <li>{pokemon.name}</li>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    </div>
  );
};

export default PokemonCard;
