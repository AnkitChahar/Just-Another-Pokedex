import React, {useState, useEffect} from 'react';
import Pokemon from './Pokemon/Pokemon';
import axios from 'axios';
import {Grid, Container} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './App.css'

function App() {

  const[pokemonState, setPokemonState] = useState({
    pokemons:[]
  });

  useEffect(() => {
    let tempState = {
      pokemons: []
    };
    firstRequest(tempState, 42);
  }, []);

  let firstRequest = async (state, numOfPokemon) => {
    for(let i=1;i<=numOfPokemon;i++){
      let tempVar = {};
      let requestArray = [];
      requestArray.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`).then(response => {
        // console.log(`First request for index ${i}`);
        tempVar.id = i;
        tempVar.name = response.data.name;
        tempVar.img = response.data.sprites.front_default;
        tempVar.type = response.data.types[response.data.types.length - 1].type.name;
      }));
      requestArray.push(axios.get(`https://pokeapi.co/api/v2/pokemon-species/${i}`).then(response => {
        // console.log(`Second request for index ${i}`);
        tempVar.desc = response.data.flavor_text_entries[1].flavor_text;
        tempVar.color = response.data.color.name;
      }));
      await Promise.all(requestArray);
      // console.log("Pushing in state")
      state.pokemons.push(tempVar);
    }
    // console.log("Setting Pokemon State", state);
    setPokemonState(state);
  };

  let onScrollEvent = (e) => {
    console.log("Scroll Now ",e);
    // let state = pokemonState;
    // let requestArray = [];
    // for(let i=pokemonState.pokemons.length + 1;i<=pokemonState.pokemons.length + 10;i++){
    //   let tempVar = {};
    //   requestArray.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`).then(response => {
    //     // console.log(`First request for index ${i}`);
    //     tempVar.id = i;
    //     tempVar.name = response.data.name;
    //     tempVar.img = response.data.sprites.front_default;
    //     tempVar.type = response.data.types[response.data.types.length - 1].type.name;
    //   }));
    //   requestArray.push(axios.get(`https://pokeapi.co/api/v2/pokemon-species/${i}`).then(response => {
    //     // console.log(`Second request for index ${i}`);
    //     tempVar.desc = response.data.flavor_text_entries[1].flavor_text;
    //     tempVar.color = response.data.color.name;
    //   }));
    //   // console.log("Pushing in state")
    //   state.pokemons.push(tempVar);
    // }
    // Promise.all(requestArray).then(() => {
    //   // console.log("Setting Pokemon State", state);
    //   setPokemonState(state);
    // })
  }

  let pokemonDiv = (
    <Grid stackable columns={6}>
      {
        pokemonState.pokemons.map((pokemon, index) => {
          return (
            <Grid.Column key={pokemon.id}>
              <Pokemon name={pokemon.name} mainImage={pokemon.img} type={pokemon.type} desc={pokemon.desc} color={pokemon.color} num={index + 1} />
            </Grid.Column>
          );
        })
      }
    </Grid>
  );

  return (
    <div className="GridStyle" onScroll={onScrollEvent}>
      <Container>
        {pokemonDiv}
      </Container>
    </div>
  );
}

export default App;