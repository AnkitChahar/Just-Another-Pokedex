import React from 'react';
import { Grid } from "semantic-ui-react";
import Pokemon from "./Pokemon";

const PokemonGrid = (props) => { // name ,mainImage, type, desc

    let pokemonDiv = (
        <div>
          {
            for(let i = 0 ; i < 10; i++){
              return (
                <Grid.Column key={pokemon.id}>
                  <Pokemon name={pokemon.name} mainImage={pokemon.img} type={pokemon.type} desc={pokemon.desc} color={pokemon.color} num={index + 1} />
                </Grid.Column>
              );
            }
          }
        </div>
      );

    return(
        <Grid stackable columns={3}>


        </Grid>
    );
}

export default PokemonGrid;