import React, { useState, useEffect } from "react";
import Pokemon from "./Pokemon/Pokemon";
import { Grid, Container } from "semantic-ui-react";
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

  useEffect(() => {
    requestPokemon();
  }, []);

  const requestPokemon = async () => {
    let pokemonArray = null;
    let isLast = false;
    await Pokedex.getPokemonsList(nextInterval).then(response => {
      setNextInterval({
        limit: 50,
        offset: nextInterval.offset + 50
      });
      pokemonArray = response.results;
      if (response.next == null) {
        setHasMoreState(false);
        isLast = true;
      }
    });

    processPokemonArray(pokemonArray, isLast);
  };

  const processPokemonArray = (pokemonArray, isLast) => {
    setHasMoreState(false);
    let tempState = [...pokemonState.pokemons];
    pokemonArray.forEach(async (pokemon, index) => {
      let tempPokemonObject = {};
      tempPokemonObject.name = pokemon.name;
      let speciesName = null;
      await Pokedex.getPokemonByName(pokemon.name)
        .then(response => {
          tempPokemonObject.img = response.sprites.front_default;
          tempPokemonObject.type =
            response.types[response.types.length - 1].type.name;
          tempPokemonObject.id = response.id;
          speciesName = response.species.name;
        })
        .catch(() => {
          console.log("Request Failed for ", pokemon.name);
        });
      await Pokedex.getPokemonSpeciesByName(speciesName)
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
          console.log("Request Failed for ", pokemon.name);
        });
      tempState.push(tempPokemonObject);
      setPokemonState({
        pokemons: tempState
      });
      if (index === pokemonArray.length - 1 && !isLast) {
        setHasMoreState(true);
      }
    });
  };

  let pokemonDiv = (
    <Grid stackable columns={6}>
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
    <div className="GridStyle" id="mainGrid">
      <InfiniteScroll
        dataLength={pokemonState.pokemons.length}
        next={requestPokemon}
        hasMore={hasMoreState}
        loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Container>{pokemonDiv}</Container>
      </InfiniteScroll>
    </div>
  );
}

export default App;
