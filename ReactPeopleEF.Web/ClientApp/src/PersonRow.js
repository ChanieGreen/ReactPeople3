import React from 'react';
import { Link } from 'react-router-dom';

export default function PersonRow({ person, onDeleteCheckChanged, onDeleteClicked }) {
    return (
        <tr className={person.markedForDeletion ? 'danger' : ''}>
            <td>
                <input checked={person.markedForDeletion} onChange={() => onDeleteCheckChanged(person)} type="checkbox" className="form-control" />
            </td>
            <td>{person.firstName}</td>
            <td>{person.lastName}</td>
            <td>{person.age}</td>
            <td>
                <button className="btn btn-danger" onClick={() => onDeleteClicked(person.id)} >Delete</button>
                <Link to={`/edit/${person.id}`} className="btn btn-warning col-sm-offset-1">Edit</Link>
            </td>
        </tr>
    )
}