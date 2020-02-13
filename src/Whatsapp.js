import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import firebase from '../src/Firebase';
import Routes from './Routes';
import reducers from './reducers/Index';


class Whatsapp extends Component {

    render() {
        return(
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))} >
                <Routes />
            </Provider>
        );
    }
}

export default Whatsapp;