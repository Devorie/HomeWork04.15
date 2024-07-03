import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import PeopleTable from './PeopleTable';
import AddPersonPage from './AddPersonPage';
import AddCarPage from './AddCarPage';
import DeleteCarsPage from './DeleteCarsPage';

const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path='/' element={<PeopleTable />} />
                <Route path='/addperson' element={<AddPersonPage />} />
                <Route path='/addcar/:personId' element={<AddCarPage />} />
                <Route path='/deleteallcars/:personId' element={<DeleteCarsPage />} />
            </Routes>
        </Layout>
    );
}

export default App;