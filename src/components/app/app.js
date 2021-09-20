import React from "react";
import AppHeader from "../app-header";
import { Route, Switch, Redirect} from 'react-router';
import HomePage from '../pages/homePage';
import CharactersPage from '../pages/characters/charactersPage';
import CharDetailsFull from "../pages/characters/charDetailsFull";
import ComicsPage from '../pages/comicsPage';

function App() {
    
  return (
    <div className="app app_container">
        <AppHeader/>
        <Switch>
            <Route path='/' exact component={HomePage}/>
            
            <Route path='/characters/' exact component={CharactersPage}/>
            {/* <Redirect from="/" to='/characters/'/> */}
            <Route path="/characters/:id" render={({match}) => {
                const {id} = match.params;
                return <CharDetailsFull id={id}/>
            }}/>
            <Route path='/comics/' component={ComicsPage}/>
        </Switch>
    </div>
  );
}

export default App;
