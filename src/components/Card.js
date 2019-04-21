import React from 'react';

const Card = ({title, pathName}) => {
    return (
        <div className="imageframe">
            <img src={process.env.PUBLIC_URL + pathName} />
            <div>{title}</div>
        </div>
    )

};

export default Card;