import React from 'react';
import './Pokemon.css';

function Pokemon(props) { // name ,mainImage
    const style = {
        textTransform: 'capitalize',
        fontWeight: 'bold'
    }
    return(
        <div className="mainCard">
            <p style={style}>{props.name}</p>
            <img src={props.mainImage} alt={props.name}/>
        </div>
    );
}

export default Pokemon;