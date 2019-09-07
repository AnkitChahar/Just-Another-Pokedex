import React, { useState, useEffect } from "react";
import Pokemon from "./Pokemon/Pokemon";
import axios from "axios";
import { Grid, Container } from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroll-component";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

function App() {
  const [pokemonState, setPokemonState] = useState({
    pokemons: []
  });

  const [hasMoreState, setHasMoreState] = useState(true);

  const [nextPageLink, setNextPageLink] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=40&limit=20"
  );

  useEffect(() => {
    requestFirstPokemons();
  }, []);

  const requestFirstPokemons = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=40")
      .then(async response => {
        setNextPageLink("https://pokeapi.co/api/v2/pokemon?offset=40&limit=20");
      })
      .then(async () => {
        const offset = pokemonState.pokemons.length;
        const startPoint = offset + 1;
        const endPoint = offset + 40;
        let tempState = [...pokemonState.pokemons];
        for (let id = startPoint; id < endPoint; id++) {
          let tempVar = {};
          let requestArray = [];
          requestArray.push(
            axios
              .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
              .then(response => {
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
                tempVar.desc =
                  response.data.flavor_text_entries[
                    response.data.flavor_text_entries.findIndex(
                      text => text.language.name === "en"
                    )
                  ].flavor_text;
                tempVar.color = response.data.color.name;
                tempVar.gen = response.data.generation.name.split("-")[1];
              })
          );
          await Promise.all(requestArray);
          tempState.push(tempVar);
          setPokemonState({
            pokemons: tempState
          });
        }
      });
  };

  const requestPokemon = () => {
    const baseURL = nextPageLink;
    axios
      .get(baseURL)
      .then(async response => {
        if (response.data.next) {
          setNextPageLink(response.data.next);
        } else {
          setHasMoreState(false);
        }
      })
      .then(async () => {
        const offset = pokemonState.pokemons.length;
        const startPoint = offset + 1;
        const endPoint = offset + 20;
        let tempState = [...pokemonState.pokemons];
        for (let id = startPoint; id < endPoint; id++) {
          let tempVar = {};
          let requestArray = [];
          requestArray.push(
            axios
              .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
              .then(response => {
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
                tempVar.desc =
                  response.data.flavor_text_entries[
                    response.data.flavor_text_entries.findIndex(
                      text => text.language.name === "en"
                    )
                  ].flavor_text;
                tempVar.color = response.data.color.name;
                tempVar.gen = response.data.generation.name.split("-")[1];
              })
          );
          await Promise.all(requestArray);
          tempState.push(tempVar);
          setPokemonState({
            pokemons: tempState
          });
        }
      });
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
    <InfiniteScroll
      dataLength={pokemonState.pokemons.length}
      next={requestPokemon}
      hasMore={hasMoreState}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <div className="GridStyle">
        <Container>{pokemonDiv}</Container>
      </div>
    </InfiniteScroll>
  );
}

export default App;
