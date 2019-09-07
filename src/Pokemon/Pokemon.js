import React from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';

function Pokemon(props) { // name ,mainImage, type, desc

    const mainCardStyle = {
        marginTop: '5px',
        marginBottom: '5px',
        borderRadius: '8px'
    }

    const frontCardStyle = {
        border: '2px solid black',
        borderRadius: '8px',
        textTransform: 'capitalize',
        fontWeight: 'bold',
        textAlign: 'center'
    };

    const backCardStyle = {
        border: '2px solid black',
        borderRadius: '8px',
        textTransform: 'capitalize',
        fontWeight: 'bold',
        textAlign: 'center',
        overflow: 'none | scroll',
        backgroundColor: props.color,
        color: 'white'
    };

    return(
        <Flippy flipOnHover={false} flipOnClick={true} flipDirection="horizontal" style={mainCardStyle}>
            <FrontSide style={frontCardStyle}>
            <div>
                <p>{props.name}</p>
                <img src={props.mainImage} alt={props.name}/>
            </div>
            </FrontSide>
            <BackSide style={backCardStyle}>
            <div>
                <p>{props.num}</p>
                <p>{props.type}</p>
            </div>
            </BackSide>
        </Flippy>
    );
}

export default Pokemon;