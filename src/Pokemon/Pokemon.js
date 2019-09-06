import React from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';

function Pokemon(props) { // name ,mainImage

    let mainCardStyle = {
        width: 'fit-content',
        height: 'fit-content',
        margin: '0 auto',
        marginTop: '10px',
        borderRadius: '8px'
    }

    let cardStyle = {
        width: 'auto',
        height: 'auto',
        border: '2px solid black',
        borderRadius: '8px',
        textTransform: 'capitalize',
        fontWeight: 'bold',
        textAlign: 'center',
    };

    return(
        <Flippy flipOnHover={true} flipOnClick={false} flipDirection="horizontal" style={mainCardStyle}>
            <FrontSide style={cardStyle}>
            <div>
                <p>{props.name}</p>
                <img src={props.mainImage} alt={props.name}/>
            </div>
            </FrontSide>
            <BackSide style={cardStyle}>
            <div>
                <p>{props.name}</p>
                <img src={props.mainImage} alt={props.name}/>
            </div>
            </BackSide>
        </Flippy>
    );
}

export default Pokemon;