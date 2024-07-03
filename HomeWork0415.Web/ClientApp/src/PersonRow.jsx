import React from 'react';
import { Link } from 'react-router-dom';

function PersonRow(props) {
    const { firstName, lastName, age, id, cars } = props.person;

    return (
        <tr>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>{cars.length}</td>
            <td>
                <Link to={`/addcar/${id}`}>
                    <button className='btn btn-outline-primary'>Add Car</button>
                </Link>
            </td>
            <td>
                <Link to={`/deleteallcars/${id}`}>
                    <button className='btn btn-outline-danger'>Delete All Cars</button>
                </Link>
            </td>
        </tr>
    );
}

export default PersonRow;