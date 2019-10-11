import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom"
import './App.css';
import Movies from './components/movie';
import Customers from './components/customers';
import MovieForm from './components/movieForm';
import Rentals from './components/rentals';
import NavBar from './components/navBar';

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Redirect from="/" to="/movies" exact />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
