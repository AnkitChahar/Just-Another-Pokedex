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
    for(let i=1;i<10;i++){
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
    <div>
      {
        pokemonState.pokemons.map((pokemon) => {
          return <Pokemon name={pokemon.name} mainImage={pokemon.img} key={pokemon.id} type={pokemon.type} desc={pokemon.desc} color={pokemon.color}/>
        })
      }
    </div>
  );

  let mainStyle = {
    overflow: 'scroll'
  };

  return (
    <div style={mainStyle}>
      {pokemonDiv}
    </div>
  );
}

export default App;