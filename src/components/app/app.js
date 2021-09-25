import React from "react";
import AppHeader from "../app-header";
import { Route, Switch, Redirect} from 'react-router';
import ComicsFull from "../pages/comics/comicsFull";
import CharactersPage from '../pages/characters/charactersPage';
import CharDetailsFull from "../pages/characters/charFull";
import ComicsPage from '../pages/comics/comicsPage';

function App() {
    
  return (
    <div className="app app_container">
        <AppHeader/>
        <Switch>
            <Redirect from="/" exact to="/characters/"/>
            <Route path='/characters/' exact component={CharactersPage}/>
            <Route path="/characters/:id" render={({match}) => {
                const {id} = match.params;
                return <CharDetailsFull id={id}/>
            }}/>
            <Route path='/comics/' exact component={ComicsPage}/>
            <Route path="/comics/:id" render={({match}) => {
                const {id} = match.params;
                return <ComicsFull id={id}/>
            }}/>
        </Switch>
    </div>
  );
}

export default App;
