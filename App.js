"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './app-styles.css';


import HeaderLinks from './pages/HeaderLinks/HeaderLinks';
import SideBarLinks from './pages/SideBarLinks/SideBarLinks';
import PagesRouter from './pages/PagesRouter';
import configureStore from './redux/store/configureStore';

let store = configureStore();

ReactDOM.render( 
    <Provider store={store}>
        <BrowserRouter>
            <div className="main-container">
                <HeaderLinks/>
                <SideBarLinks/>
                <PagesRouter/>
            </div>
        </BrowserRouter>
    </Provider>
, document.getElementById('root') );
