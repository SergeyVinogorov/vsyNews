import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import './index.css'
import { createStore } from 'redux'
import reducer from './store/reducer'
import App from './App'

const store = createStore(reducer)

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

// eslint-disable-next-line no-undef
ReactDom.render(<Provider store={store}>{app}</Provider>, document.getElementById('root'))
