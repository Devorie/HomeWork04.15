import React from 'react';
import { Link } from 'react-router-dom';

function CarRow(props) {
    const { make, model, year} = props.cars;

    return (
        <tr>
            <td>{make}</td>
            <td>{model}</td>
            <td>{year}</td>
        </tr>
    );
}

export default CarRow;