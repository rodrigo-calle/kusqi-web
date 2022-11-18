import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

export default createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
)
