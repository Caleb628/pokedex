import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Pokemons } from "../components/pokemons/pokemons";
import { Pokemon } from "../components/pokemon/pokemon";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Pokemons />} />
        <Route exact path="/Pokemon/:name" element={<Pokemon />} />
      </Routes>
    </BrowserRouter>
  );
};
export { AppRoutes };
