import React, {useState, useEffect} from 'react';
import './App.css';
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

    let Promises = [];

    for(let i = 1; i < 7; i++)
    {
      Promises.push(axios.get('https://pokeapi.co/api/v2/pokemon/' + i).then(response => {
        let tempVar = {}; 
        tempVar.id = i;
        tempVar.name = response.data.name;
        Promises.push(axios.get('https://pokeapi.co/api/v2/pokemon-form/' + i).then(response2 => {
          tempVar.img = response2.data.sprites.front_default;
          tempState.pokemons.push(tempVar)
        }));
      }));

    }
    Promise.all(Promises).then(() => {
      setPokemonState(tempState);
    });

  }, []);

  let pokemonDiv = (
    <div>
      {
        pokemonState.pokemons.map((pokemon) => {
          console.log(pokemonState.pokemons.length)
          return <Pokemon name={pokemon.name} mainImage={pokemon.img} key={pokemon.id}/>
        })
      }
    </div>
  );

  return (
    <div className="App">
      {pokemonDiv}
    </div>
  );
}

export default App;