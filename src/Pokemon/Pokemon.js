import React from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';

function Pokemon(props) { // name ,mainImage, type, desc

    let mainCardStyle = {
        width: 'fit-content',
        height: 'fit-content',
        margin: '0 auto',
        marginTop: '5px',
        marginBottom: '5px',
        borderRadius: '8px'
    }

    let frontCardStyle = {
        width: '132px',
        height: '189px',
        border: '2px solid black',
        borderRadius: '8px',
        textTransform: 'capitalize',
        fontWeight: 'bold',
        textAlign: 'center'
    };

    let backCardStyle = {
        width: '132px',
        height: '189px',
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
                <p>{props.type}</p>
                {/* <p>{props.desc}</p> */}
            </div>
            </BackSide>
        </Flippy>
    );
}

export default Pokemon;