import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../style.css";

async function pokemonsFinder(offset, limit) {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  const response = await axios.get(url);
  return response.data;
}

const LIMIT = 10;

const Pokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await pokemonsFinder(offset, LIMIT);
        const promises = data.results.map(async (poke) => {
          const response = await axios.get(poke.url);
          return {
            image:
              response.data.sprites.other["official-artwork"].front_default,
            name: response.data.name,
            moves: response.data.moves.slice(0, 5),
            abilities: response.data.abilities,
          };
        });
        const pokemonData = await Promise.all(promises);
        setPokemons((prevPokemons) => [...prevPokemons, ...pokemonData]);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [offset]);

  return (
    <div className="tela">
      {error && <p>Error: {error}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="telaPokedex">
          {pokemons.map((pokemon) => (
            <Link key={pokemon.name} to={`/pokemon/${pokemon.name}`}>
              <div className="pokemonStyle">
                <p>{pokemon.name}</p>
                <img src={pokemon.image} alt={pokemon.name} />
                <p>Abilities</p>
                <ul>
                  {pokemon.moves.map((move) => (
                    <li key={move.move.name}>{move.move.name}</li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      )}
      <button
        className="pokemonGenerator"
        onClick={() => setOffset((prevOffset) => prevOffset + LIMIT)}
      >
        Add 10
      </button>
    </div>
  );
};
