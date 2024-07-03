import React from 'react';
import PersonRow from './PersonRow';
import axios from 'axios';
import { produce } from 'immer';
import { Link } from 'react-router-dom';

class PeopleTable extends React.Component {
    state = {
        people: [],
        person: {
            firstName: '',
            lastName: '',
            age: '',
            cars: []
        }
    }

    componentDidMount = async () => {
        // const { data } = await axios.get('/api/people/getall');
        // this.setState({ people: data });

        this.refreshPeople();
    }

    refreshPeople = async () => {
        const response = await axios.get('/api/people/getall');
        this.setState({ people: response.data });
    }

    onTextChange = e => {
        const nextState = produce(this.state, draftState => {
            draftState.person[e.target.name] = e.target.value;
        });
        this.setState(nextState);
    }

    onAddPersonClick = async () => {
        await axios.post('/api/people/addperson', this.state.person);
        await this.refreshPeople();
        this.resetToAddMode();
    }

    resetToAddMode = () => {
        this.setState({
            person: {
                firstName: '',
                lastName: '',
                age: ''
            },
            currentEditPersonId: 0
        })
    }

    onDeleteCarsClick = async (id) => {
        await axios.post('/api/people/deletecars', { personId: id });
        this.refreshPeople();
    }
    render() {
        return (
            <><div className="col-md-6" style={{ marginTop: 100 }}>
                <Link to='/addperson' style={{ textDecoration: 'none' }}>
                    <button className='btn btn-outline-secondary btn-lg w-100'>Add Person</button>
                </Link>
            </div><div className="container" style={{ marginTop: 60 }}>
                    <table className="table table-hover table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Age</th>
                                <th>Car Count</th>
                                <th>Add Car</th>
                                <th>Delete Cars</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.people.map(p => <PersonRow
                                key={p.id}
                                person={p} />)}
                        </tbody>
                    </table>
                </div></>
        )
    }
}

export default PeopleTable;