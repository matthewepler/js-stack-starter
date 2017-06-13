import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk' // not sure why I need this, was part of async stuff in js-stack
import { isProd } from '../../shared/util'

// reducers
import countReducer from '../reducer/count'

// utility funcs
const composeEnhancers = (isProd ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

// inital app state in all its glory
const initialAppState = {
  count: 0,
  name: 'Matthew Epler',
  message: 'is a swell guy.'
}

const store = createStore(combineReducers({
  ...initialAppState,
  count: countReducer
}), composeEnhancers(applyMiddleware(thunkMiddleware))) // for devTools

export default store
