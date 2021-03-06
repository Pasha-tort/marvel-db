import React from "react";
import { Route, Switch, Redirect } from 'react-router';

import AppHeader from "../app-header";
import ComicsFull from "../pages/comics/comicsFull";
import CharactersPage from '../pages/characters/charactersPage';
import CharDetailsFull from "../pages/characters/charFull";
import ComicsPage from '../pages/comics/comicsPage';
import Footer from "../footer/footer";

function App() {
	return (
		<div className="app app_container">
			<AppHeader />
			<Switch>
				<Redirect from="/" exact to="/characters/" />
				<Route path='/characters/' exact component={CharactersPage} />
				<Route path="/characters/:id" render={({ match }) => {
					const { id } = match.params;
					return <CharDetailsFull id={id} />
				}} />
				<Route path='/comics/' exact component={ComicsPage} />
				<Route path="/comics/:id" render={({ match }) => {
					const { id } = match.params;
					return <ComicsFull id={id} />
				}} />
				<Redirect to="/" />
			</Switch>
			<Footer />
		</div>
	);
}

export default App;
