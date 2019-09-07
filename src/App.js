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
    firstRequest(tempState, 59);
  }, []);

  let firstRequest = async (state, numOfPokemon) => {
    for(let i=1;i<=numOfPokemon;i++){
      let tempVar = {};
      await axios.get('https://pokeapi.co/api/v2/pokemon/' + i).then(response => {
        tempVar.id = i;
        tempVar.name = response.data.name;
        tempVar.img = response.data.sprites.front_default;
        tempVar.type = response.data.types[response.data.types.length - 1].type.name;
      }).then(axios.get("https://pokeapi.co/api/v2/pokemon-species/"+i).then(response => {
        tempVar.desc = response.data.flavor_text_entries[1].flavor_text;
        tempVar.color = response.data.color.name;
        state.pokemons.push(tempVar);
      }));
    }
    setPokemonState(state);
  };

  let pokemonDiv = (
    <Grid relaxed columns={6}>
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
    <Container className="GridStyle">
      {pokemonDiv}
    </Container>
  );
}

export default App;