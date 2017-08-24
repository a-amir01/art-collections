import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { applyMiddleware, createStore } from 'redux';
//import { composeWithDevTools } from 'redux-devtools-extension';
//import registerServiceWorker from './registerServiceWorker';

import logger from 'redux-logger';
import reduxThunk from 'redux-thunk';

import reducers from './reducers/index';
import ClientRoutes from './components/ClientRoutes';

// import axios from 'axios';
// window.axios = axios;

const middleware = { reduxThunk, logger };
const store = createStore(reducers,{}, applyMiddleware(reduxThunk, logger));
// const store = createStore(reducers, {},/*initialState,*/ composeWithDevTools(
//     applyMiddleware(...middleware),
// ));


const Routes = (
    <Provider store={store}>
        <ClientRoutes />
    </Provider>
);

ReactDOM.render(Routes, document.getElementById('root'));

//registerServiceWorker();