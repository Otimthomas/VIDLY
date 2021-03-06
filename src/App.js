import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movie";
import Customers from "./components/customers";
import MovieForm from "./components/movieForm";
import Rentals from "./components/rentals";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import auth from "./services/authService";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";

class App extends Component {
	state = {};

	componentDidMount() {
		const user = auth.getCurrentUser();
		//console.log(user.isAdmin);
		this.setState({ user });
	}

	render() {
		return (
			<React.Fragment>
				<ToastContainer />
				<NavBar user={this.state.user} />
				<main className='container'>
					<Switch>
						<Route path='/register' component={RegisterForm} />
						<Route path='/login' component={LoginForm} />
						<Route path='/logout' component={Logout} />
						<ProtectedRoute path='/movies/:id' component={MovieForm} />
						<Route
							path='/movies'
							render={(props) => <Movies {...props} user={this.state.user} />}
						/>
						<Route path='/customers' component={Customers} />
						<Route path='/rentals' component={Rentals} />
						<Redirect from='/' to='/movies' exact />
						<Redirect to='/not-found' />
					</Switch>
				</main>
			</React.Fragment>
		);
	}
}

export default App;
