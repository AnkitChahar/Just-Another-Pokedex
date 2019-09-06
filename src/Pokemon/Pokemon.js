import React from 'react';

function Pokemon(props) { // name ,mainImage
    const style = {
        textTransform: 'capitalize'
    }
    return(
        <div>
            <p style={style}>{props.name}</p>
            <img src={props.mainImage} alt={props.name}/>
        </div>
    );
}

export default Pokemon;