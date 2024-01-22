import { useEffect, useState } from "react";
import axios from "axios";
import { Form, Link } from "react-router-dom";
import "../../style.css";
async function pokemonsFinder(offset) {
  const url = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`
  );
  const response = url.data;
  return response;
}
const Pokemons = () => {
  const [pokemons, setPokemons] = useState([]);

  const [offset, setOffset] = useState(-10);

  useEffect(() => {
    const fetchData = async () => {
      const data = await pokemonsFinder(offset);

      const promises = data.results.map(async (poke) => {
        const url = await axios.get(poke.url);
        const response = url.data;

        return {
          image: response.sprites.other["official-artwork"].front_default,
          name: response.name,
          moves: response.moves.slice(0, 5),
          abilities: response.abilities,
        };
      });

      const pokemonData = await Promise.all(promises);

      setPokemons((prevPokemons) => [...prevPokemons, ...pokemonData]);
    };
    fetchData();
  }, [offset]);

  return (
    <div className="tela">
      <div className="telaPokedex">
        {pokemons.map((pokemon, index) => (
          <Link to={`/pokemon/${pokemon.name}`}>
            <div className="pokemonStyle" key={index}>
              <p>{pokemon.name}</p>
              <img src={pokemon.image} alt={pokemon.name} />
              <p>ablidades</p>
              <ul>
                {pokemon.moves.map((move, index) => (
                  <li key={index}>{move.move.name}</li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </div>
      <button
        className="pokemonGenerator"
        onClick={() => {
          setOffset((prevOffset) => prevOffset + 10);
        }}
      >
        adicionar 10
      </button>
    </div>
  );
};

export { Pokemons };
