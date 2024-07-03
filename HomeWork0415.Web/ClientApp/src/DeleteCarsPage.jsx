import React from 'react';
import withRouter from './withRouter';
import CarRow from './CarRow';
import { produce } from 'immer';
import axios from 'axios';
import { Link } from 'react-router-dom';

class DeleteCarsPage extends React.Component
{

    state = {
        cars: []
    }
    componentDidMount = async () => {
        const { data } = await axios.get(`/api/people/getcars`, this.props.params);
        this.setState({ cars: data });

        console.log(this.state.cars);
    }

    onDeleteYesClick = async () => {
        await axios.post('/api/people/deletecars', this.props.params);
        this.props.navigate('/');
    }

    refreshCars = async () => {
        const response = await axios.get('/api/people/getcars');
        this.setState({ cars: response.data });
    }

    render() {
        return (
            <>
                <div className="container" style={{ marginTop: 60 }}>
                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th> Make </th>
                            <th> Model </th>
                            <th> Year </th>
                        </tr>
                    </thead>
                    <tbody> cars working to list: {this.state.cars.length }
                        {this.state.cars.map(c => <CarRow
                            key={c.id}
                            car={c} />)}
                    </tbody>
                </table>
            </div>
                <div className="row">
                    <div className="col-md-12">
                        <h3>Are you sure you want to delete their cars?</h3>
                    </div>
                    <div className="col-md-6" style={{ marginTop: 20 }}>
                        <Link to='/' style={{ textDecoration: 'none' }}>
                            <button className='btn btn-secondary btn-lg w-100'>No</button>
                        </Link>
                    </div>
                    <div className="col-md-6" style={{ marginTop: 20 }}>

                        <button className="btn btn-outline-danger btn-lg w-100" onClick={this.onDeleteYesClick}>Yes</button>

                    </div>
                </div>
            </>
         )
    }
}

export default withRouter(DeleteCarsPage);

