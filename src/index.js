import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App'

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

// eslint-disable-next-line no-undef
ReactDom.render(app, document.getElementById('root'))
