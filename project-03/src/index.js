import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board';
import {Provider} from 'react-redux';
import comReducer from './reducers';
import { createStore } from 'redux';

const store = createStore(
    comReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store={store}>
        <Board />
    </Provider>, 
    document.getElementById('root')
);
