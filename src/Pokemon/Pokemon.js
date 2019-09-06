import React from 'react';

function Pokemon(props) { // name ,mainImage
    const style = {
        textTransform: 'capitalize'
    }
    return(
        <div>
            <p style={style}>{props.name}</p>
            <img src={props.mainImage} alt="Loading..."/>
        </div>
    );
}

export default Pokemon;