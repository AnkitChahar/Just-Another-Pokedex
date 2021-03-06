import React from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import defaultImage from '../default.png';

function Pokemon(props) {
  const textColorValue = (color) => {
    const isWhite = [
      'green',
      'red',
      'blue',
      'brown',
      'purple',
      'gray',
      'black',
    ];
    return isWhite.indexOf(color) !== -1 ? 'white' : 'black';
  };

  const mainCardStyle = {
    marginTop: '5px',
    marginBottom: '5px',
    borderRadius: '8px',
  };

  const frontCardStyle = {
    border: '2px solid black',
    borderRadius: '8px',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'white',
    width: '164px',
    height: '197px',
    overflow: 'none',
  };

  const backCardStyle = {
    border: '2px solid black',
    borderRadius: '8px',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    textAlign: 'center',
    overflow: 'none',
    backgroundColor: props.color,
    color: textColorValue(props.color),
    width: '164px',
    height: '197px',
  };

  return (
    <Flippy
      flipOnHover={false}
      flipOnClick={true}
      flipDirection="horizontal"
      style={mainCardStyle}
    >
      <FrontSide style={frontCardStyle}>
        <div>
          <p
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {props.name}
          </p>
          <img
            src={props.mainImage ? props.mainImage : defaultImage}
            alt={props.name}
            style={{
              width: '128px',
              height: '128px',
            }}
          />
        </div>
      </FrontSide>
      <BackSide style={backCardStyle}>
        <div>
          <p>ID - {props.num}</p>
          <p>Name - {props.name}</p>
          <p>Type - {props.type}</p>
          <p>Generation - {props.gen.toUpperCase()}</p>
        </div>
      </BackSide>
    </Flippy>
  );
}

export default Pokemon;
