import React, { useState, useEffect } from "react";
import Pokemon from "./Pokemon/Pokemon";
import { Grid, Container, Loader } from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroll-component";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

const P = require("pokeapi-js-wrapper");
const Pokedex = new P.Pokedex();

function App() {
  const [pokemonState, setPokemonState] = useState({
    pokemons: []
  });

  const [hasMoreState, setHasMoreState] = useState(true);

  const [nextInterval, setNextInterval] = useState({
    limit: 50,
    offset: 0
  });

  let isLast = false;

  useEffect(() => {
    requestPokemon();
  }, []);

  const requestPokemon = () => {
    let pokemonArray = null;
    Pokedex.getPokemonsList(nextInterval).then(async response => {
      setNextInterval({
        limit: 50,
        offset: nextInterval.offset + 50
      });
      pokemonArray = response.results;
      if (response.next == null) {
        setHasMoreState(false);
        isLast = true;
      }
      await processPokemonArray(pokemonArray, isLast);
    });
  };

  const processPokemonArray = async (pokemonArray, isLast) => {
    setHasMoreState(false);
    let tempState = [...pokemonState.pokemons];
    for (let i = 0; i < pokemonArray.length; i++) {
      let tempPokemonObject = {};
      let pokemon = pokemonArray[i];
      tempPokemonObject.name = pokemon.name;
      let speciesName = null;
      let requestArray = [];
      requestArray.push(
        Pokedex.getPokemonByName(pokemon.name)
          .then(response => {
            tempPokemonObject.img = response.sprites.front_default;
            tempPokemonObject.type =
              response.types[response.types.length - 1].type.name;
            tempPokemonObject.id = response.id;
            speciesName = response.species.name;
          })
          .catch(() => {
            console.log("First Request Failed for ", pokemon.name);
          })
      );
      await Promise.all(requestArray);
      requestArray.push(
        Pokedex.getPokemonSpeciesByName(speciesName)
          .then(response => {
            tempPokemonObject.color = response.color.name;
            tempPokemonObject.gen = response.generation.name.split("-")[1];
            tempPokemonObject.desc =
              response.flavor_text_entries[
                response.flavor_text_entries.findIndex(
                  text => text.language.name === "en"
                )
              ].flavor_text;
          })
          .catch(() => {
            console.log("Second Request Failed for ", pokemon.name);
          })
      );
      await Promise.all(requestArray);
      tempState.push(tempPokemonObject);
      setPokemonState({
        pokemons: tempState
      });
      if (i === pokemonArray.length - 1 && !isLast) {
        setHasMoreState(true);
      }
    }
  };

  let pokemonDiv = (
    <Grid doubling columns={6}>
      {pokemonState.pokemons.map(pokemon => {
        return (
          <Grid.Column key={pokemon.id}>
            <Pokemon
              name={pokemon.name}
              mainImage={pokemon.img}
              type={pokemon.type}
              desc={pokemon.desc}
              color={pokemon.color}
              num={pokemon.id}
              gen={pokemon.gen}
            />
          </Grid.Column>
        );
      })}
    </Grid>
  );

  return (
    <div className="GridStyle">
      <InfiniteScroll
        dataLength={pokemonState.pokemons.length}
        next={requestPokemon}
        hasMore={hasMoreState}
        loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
        style={{ overflow: "none" }}
      >
        <Container>{pokemonDiv}</Container>
        <Loader inline="centered" active={!hasMoreState && !isLast}>
          Loading
        </Loader>
      </InfiniteScroll>
    </div>
  );
}

export default App;
