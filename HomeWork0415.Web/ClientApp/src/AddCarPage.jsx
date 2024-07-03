import React from 'react';
import withRouter from './withRouter';
import { produce } from 'immer';
import axios from 'axios';

class AddCarPage extends React.Component {

    state = {
        car: '',
        person:''
    }

    componentDidMount = async () => {
        const { personId } = this.props.params;
        const { data } = await axios.get(`/api/people/getperson?id=${personId}`);
        this.setState({ person: data });
    }

    
    onTextChange = e => {
        const nextState = produce(this.state, draftState => {
            draftState.person[e.target.name] = e.target.value;
        });
        this.setState(nextState);
    }

    onSubmitClick = async () => {
        await axios.post('/api/people/addcar', { ...this.state.car, personId: this.state.person.id });
        this.props.navigate('/');
    }

    render() {

        const { make, model, year, person } = this.state.car;
        const { firstName, lastName, id } = this.state.person;

        return (
            <div className="row">
                <div className='col-md-6 offset-md-3 card bg-light p-4'>

                    <h2>Add a car for {firstName} {lastName}</h2>
                    <input type="text" value={make} name='make' onChange={this.onTextChange} className="form-control" placeholder="Make" />
                    <br />
                    <input type="text" value={model} name='model' onChange={this.onTextChange} className="form-control" placeholder="Model" />
                    <br />
                    <input type="text" value={year} name='year' onChange={this.onTextChange} className="form-control" placeholder="Year" />
                    <br />
                    <button onClick={this.onSubmitClick} className="btn btn-primary btn-block">Submit</button>
                </div>
            </div>
        )
    }
}

export default withRouter(AddCarPage);
