import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';
import './index.css'
import { createStore, applyMiddleware } from 'redux'
import reducer from './store/reducer'
import App from './App'

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

const app = (
  // <BrowserRouter>
  <App />
  // </BrowserRouter>
)

// eslint-disable-next-line no-undef
ReactDom.render(<Provider store={store}>{app}</Provider>, document.getElementById('root'))
