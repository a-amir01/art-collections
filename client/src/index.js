import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from './reducers/index';
import ClientRoutes from './components/ClientRoutes';

//import registerServiceWorker from './registerServiceWorker';

// const store = createStore(reducers,{}, applyMiddleware(reduxThunk, logger));
const store = createStore(reducers, {},/*initialState,*/ composeWithDevTools(
    applyMiddleware(thunk, logger),
));


const Routes = (
    <Provider store={store}>
        <ClientRoutes />
    </Provider>
);

ReactDOM.render(Routes, document.getElementById('root'));

//registerServiceWorker();