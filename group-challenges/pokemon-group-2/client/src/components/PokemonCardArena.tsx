import { useContext, useEffect } from "react";
import useAPI from "../hooks/useAPI";
import styled from "styled-components";
import PokemonContext from "../store/contexts/pokemonContext/pokemonContext";
import HealthBar from "./HealthBar";

interface IPokemonCardProps {
  isPokemonA: boolean;
}

const PokemonCardArena: React.FC<IPokemonCardProps> = ({isPokemonA}) => {
  // const randomId = Math.floor(Math.random() * 150 + 1).toString();
  const pokeId = "45";

  const {
    setPokemonData,
    pokemonId,
    pokemonName,
    pokemonHealth,
    pokemonImageFrontUrl,
    pokemonImageBackUrl,
  } = useContext(PokemonContext);

  const { getPokemonData } = useAPI();

  const pokemonDataApi = async (id: string) => {
    const data = await getPokemonData(id);
    setPokemonData(
      pokeId,
      data.name,
      data.stats[0.].base_stat,
      isPokemonA,
      data.sprites.other.dream_world.front_default,
      data.sprites.back_default
    );
    return setPokemonData;
  };

  useEffect(() => {
    pokemonDataApi(pokeId);
  }, [])


  return (
    <>
      <CardContainer>
      <HealthBar currentValue={pokemonHealth} maxValue={pokemonHealth} minValue={0} isEmpty={false}></HealthBar>
        <h2>{pokemonName}</h2>
        <img
          alt={pokemonName}
          src={`${
            isPokemonA ? `${pokemonImageFrontUrl}` : `${pokemonImageBackUrl}`
          }`}
        />
      </CardContainer>
    </>
  );
};

export default PokemonCardArena;

const CardContainer = styled.div`
  border: 1px solid black;
  border-radius: 10px;
`;
