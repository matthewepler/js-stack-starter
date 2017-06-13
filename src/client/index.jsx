// @flow

import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
// import { Provider } from 'react-redux'
// import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
// import thunkMiddleware from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'

import App from './app'
// import countReducer from './reducer/count'
import { APP_CONTAINER_SELECTOR } from '../shared/config'
// import { isProd } from '../shared/util'

// const composeEnhancers = (isProd ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

// const store = createStore(combineReducers({
//   count: countReducer
// }), composeEnhancers(applyMiddleware(thunkMiddleware)))

const rootEl = document.querySelector(APP_CONTAINER_SELECTOR)

const wrapApp = (AppComponent, reduxStore) =>
  <BrowserRouter>
    <AppContainer>
      <AppComponent />
    </AppContainer>
  </BrowserRouter>

// const wrapApp = (AppComponent, reduxStore) =>
//   <Provider store={reduxStore}>
//     <BrowserRouter>
//       <AppContainer>
//         <AppComponent />
//       </AppContainer>
//     </BrowserRouter>
//   </Provider>

ReactDOM.render(wrapApp(App), rootEl)
// ReactDOM.render(wrapApp(App, store), rootEl)

if (module.hot) {
  // flow-disable-next-line
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default
    ReactDOM.render(wrapApp(NextApp), rootEl)
    // ReactDOM.render(wrapApp(NextApp, store), rootEl)
  })
}
