import React, { useState, useEffect } from "react";
import Pokemon from "./Pokemon/Pokemon";
import axios from "axios";
import { Grid, Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

function App() {
  const [pokemonState, setPokemonState] = useState({
    pokemons: []
  });

  let numOfRequests = 100;

  useEffect(() => {
    if (pokemonState.pokemons.length < numOfRequests) {
      firstRequest(pokemonState.pokemons.length + 1);
    }
  });

  let firstRequest = async id => {
    let tempState = [...pokemonState.pokemons];
    let tempVar = {};
    let requestArray = [];
    requestArray.push(
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then(response => {
        // console.log(`First request for index ${id}`);
        tempVar.id = id;
        tempVar.name = response.data.name;
        tempVar.img = response.data.sprites.front_default;
        tempVar.type =
          response.data.types[response.data.types.length - 1].type.name;
      })
    );
    requestArray.push(
      axios
        .get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        .then(response => {
          // console.log(`Second request for index ${id}`);.flavor_text
          tempVar.desc = response.data.flavor_text_entries.filter(text => {
            return text.language.name === "en"
              ? text.flavour_text
              : "No Description in English";
          });
          tempVar.color = response.data.color.name;
          tempVar.gen = response.data.generation.name.split("-")[1];
        })
    );
    await Promise.all(requestArray);
    // console.log("Pushing in state")
    tempState.push(tempVar);
    // console.log("Setting Pokemon State", tempState);
    setPokemonState({
      pokemons: tempState
    });
  };

  let onScrollEvent = e => {
    console.log("Scroll Now ", e);
  };

  let pokemonDiv = (
    <Grid stackable columns={6}>
      {pokemonState.pokemons.map((pokemon, index) => {
        return (
          <Grid.Column key={pokemon.id}>
            <Pokemon
              name={pokemon.name}
              mainImage={pokemon.img}
              type={pokemon.type}
              desc={pokemon.desc}
              color={pokemon.color}
              num={index + 1}
              gen={pokemon.gen}
            />
          </Grid.Column>
        );
      })}
    </Grid>
  );

  return (
    <div className="GridStyle" onScroll={onScrollEvent}>
      <Container>{pokemonDiv}</Container>
    </div>
  );
}

export default App;
