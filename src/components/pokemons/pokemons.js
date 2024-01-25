/*import { useEffect, useState } from "react";
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

export { Pokemons };*/
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
          // console.log(response.data.types);
          return {
            image:
              response.data.sprites.other["official-artwork"].front_default,
            name: response.data.name,
            moves: response.data.moves.slice(0, 5),
            abilities: response.data.abilities,
            type: response.data.types,
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
    <section className="pokedex">
      <h1>Pokédex</h1>

      <div className="tela">
        {error && <p>Error: {error}</p>}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="telaPokemons">
            {pokemons.map((pokemon) => (
              <Link key={pokemon.name} to={`/pokemon/${pokemon.name}`}>
                <div className="pokemonStyle">
                  <p className="pokemonName">{pokemon.name}</p>
                  <img src={pokemon.image} alt={pokemon.name} />

                  <div className="types">
                    {pokemon.type.map((type) => {
                      return <p key={type.type.name}>{type.type.name}</p>;
                    })}
                  </div>
                  <div className="abilities">
                    <p>Abilities</p>
                    <ul>
                      {pokemon.moves.map((move) => (
                        <li key={move.move.name}>{move.move.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <section className="buttonArea">
        <button
          className="pokemonGenerator"
          onClick={() => setOffset((prevOffset) => prevOffset + LIMIT)}
        >
          Add 10
        </button>

        <button className="themeBtn">light</button>
      </section>
    </section>
  );
};
export { Pokemons };
