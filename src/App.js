import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux'
import axios from 'axios'
import css from './App.scss'
import LayoutCommon from './containers/Layout/LayoutCommon'
import asyncComponent from './hoc/asyncComponent'
import URL from './apiService'
import Profile from './containers/Profile/Profile'
import Login from './containers/Login/Login'
import PrivateRoute from './hoc/Private'

const AsyncBreak = asyncComponent(() => import('./containers/BreackingNews/BreackingNews'))
const AsyncNews = asyncComponent(() => import('./containers/TechNews/TechNews'))

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  componentDidMount() {
    const fetchPosts = async (url, getRedux) => {
      this.props.localLoading(true)
      const res = await axios.get(url)
      getRedux(res.data.articles)
      this.props.localLoading(false)
    }
    const breaking = URL.topHeadlinesURL
    const tech = URL.sourcesURL
    fetchPosts(breaking, this.props.initNews)
    fetchPosts(tech, this.props.initTechNews)
  }

  render() {
    return (
      <div>
        <div className={css.main}>
          <Router>
            <LayoutCommon>
              <Switch>
                <Route path="/" exact component={AsyncBreak} />
                <Route path="/tech-news" component={AsyncNews} />
                <Route path="/login" component={Login} />
                <PrivateRoute path="/profile" component={Profile} />
              </Switch>
            </LayoutCommon>
          </Router>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  loggedIn: state.loggedIn
})
const mapDispatchToProps = (dispatch) => ({
  initNews: (items) => dispatch({ type: 'SET_BREAKING_NEWS', arr: items }),
  initTechNews: (items) => dispatch({ type: 'SET_TECH_NEWS', arr: items }),
  localLoading: (statement) => dispatch({ type: 'SET_LOADING', statement })
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
