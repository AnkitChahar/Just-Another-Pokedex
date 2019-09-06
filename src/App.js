import React, {useState, useEffect} from 'react';
import Pokemon from './Pokemon/Pokemon';
import axios from 'axios';



function App() {

  const[pokemonState, setPokemonState] = useState({
    pokemons:[]
  });

  useEffect(() => {
    let tempState = {
      pokemons: []
    };

    firstRequest(tempState);

  }, []);

  let firstRequest = async (state) => {
    for(let i=1;i<7;i++){
      let tempVar = {};
      await axios.get('https://pokeapi.co/api/v2/pokemon/' + i).then(response => {
        tempVar.id = i;
        tempVar.name = response.data.name;
      }).then(axios.get('https://pokeapi.co/api/v2/pokemon-form/' + i).then(response => {
        tempVar.img = response.data.sprites.front_default;
        state.pokemons.push(tempVar);
      }));
    }
    console.log ('All requests done');
    setPokemonState(state);
  };

  let pokemonDiv = (
    <div>
      {
        pokemonState.pokemons.map((pokemon) => {
          return <Pokemon name={pokemon.name} mainImage={pokemon.img} key={pokemon.id}/>
        })
      }
    </div>
  );

  return (
    <div>
      {pokemonDiv}
    </div>
  );
}

export default App;