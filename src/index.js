import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as  Router } from 'react-router-dom';
import App from './components/app/app';
import {Provider} from 'react-redux';
import ErrorBoundry from './components/error-boundry';
import MarvelService from './service/marvel-service';
import MarvelServiceContext from './components/marvel-service-context';
import store from './store';

const marvelService = new MarvelService();


ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundry>
            <MarvelServiceContext.Provider value={marvelService}>
                <Router>
                    <App/>
                </Router>
            </MarvelServiceContext.Provider>
        </ErrorBoundry>
    </Provider>
  ,
  document.getElementById('root')
);

