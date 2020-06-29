import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'

import Users from './containers/Users'
import asyncComponent from './hoc/asyncComponent'

const AsyncNews = asyncComponent(() => import('./containers/News.js'))

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Link to="/">Users</Link>
          {' '}
          |
          <Link to="/news">News</Link>
        </div>
        <div>
          <Route path="/" exact component={Users} />
          <Route path="/news" component={AsyncNews} />
        </div>
      </div>
    )
  }
}
export default App
