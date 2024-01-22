import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const getPokemon = async (name) => {
  const promise = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

  return promise;
};
const getAbilities = async (url) => {
  const promise = await axios.get(url);

  return promise;
};

const Pokemon = () => {
  const [pokemon, setPokemon] = useState({
    image: "",
    name: "",
    moves: [],
    types: [],
  });
  const [abilities, setabilities] = useState([]);
  const { name } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const dataPokemon = await getPokemon(name);
      const responsePokemon = dataPokemon.data;

      setPokemon({
        image: responsePokemon.sprites.other["official-artwork"].front_default,
        name: responsePokemon.name,
        moves: responsePokemon.moves.slice(0, 5),
        types: responsePokemon.types,
      });

      const abilities = responsePokemon.abilities.map(async (value) => {
        const dataAbilities = await getAbilities(value.ability.url);
        const responseAbilities = dataAbilities.data;
        return {
          name: responseAbilities.name,
          description: responseAbilities.effect_entries[1].effect,
        };
      });
      const abilitiesFinal = await Promise.all(abilities);
      setabilities(abilitiesFinal);
    };
    fetchData();
  }, []);
  console.log(abilities);
  return (
    <div>
      <img src={pokemon.image} alt={pokemon.name} />
      <p>{pokemon.name}</p>
      <ul>
        {pokemon.moves.map((move, index) => (
          <li key={index}>{move.move.name}</li>
        ))}
      </ul>
      <ul>
        {abilities.map((value) => {
          return (
            <li>
              <h3>{value.name}</h3>
              <p>{value.description}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export { Pokemon };
/**
 */

/**const [pokemon, usePokemon] = useState({
    image: "",
    name: "",
    moves: [],
    abilities: [],
    type: "",
  });
  const { name } = useParams;
  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemon(name);
      const response = data.data;
      const url = await axios.get(poke.url);

      usePokemon({
        image: response.sprites.front_default,
        name: response.name,
        moves: response.moves.slice(0, 5),
        abilities: response.abilities,
      });
    };
    fetchData();
  }, []);
  return (
    <div key={index}>
      <img src={pokemon.image} alt={pokemon.name} />
      <p>{pokemon.name}</p>
      <ul>
        {pokemon.moves.map((move, index) => (
          <li key={index}>{move.move.name}</li>
        ))}
      </ul>
    </div>
  );
}; */
