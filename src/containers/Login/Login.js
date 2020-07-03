import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { object } from 'prop-types'
import URL from '../../apiService/index'

import css from './Login.scss'
import Heading from '../../components/Heading/Heading'

const Login = (props) => {
  // eslint-disable-next-line no-undef
  const [phoneNumber, setPhoneNumber] = useState('')
  // eslint-disable-next-line no-undef
  const [name, setName] = useState('')
  // eslint-disable-next-line no-undef
  const [password, setPassword] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault();
    let token = ''
    const getUserToken = async () => {
      const url = URL.getToken
      await axios({
        method: 'post',
        url,
        data: {
          phone: phoneNumber,
          password
        }
      }).then((res) => {
        localStorage.setItem('tokens', JSON.stringify(res.data))
        token = res.data.id
      })
    }

    getUserToken().then((res) => {
      props.localLoading(true)
      const url = URL.getUser + phoneNumber
      axios({
        method: 'get',
        url,
        headers: {
          token
        }
      }).then((response) => {
        if (typeof (response.data) === 'object') {
          localStorage.setItem('user', JSON.stringify(response.data))
          props.loginSuccess(response.data)
          alert(`Hello${response.data.firstName}! You are loged in`);
        } else {
          props.loginError()
          localStorage.clear();
          alert('Hello! Something goes wrong check to completed fields');
        }
      })
      setName('')
      setPhoneNumber('')
      setPassword('')
      props.localLoading(false)
    })
  }
  return (
    <div className={css.login}>
      <div className={css.login__block}>
        <Heading head="3" text="Login" />
        <form onSubmit={handleSubmit}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="name">
            Name:
          </label>
          <input id="name" type="text" value={name} onChange={(event) => setName(event.target.value)} />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="phone">
            Phone:
          </label>
          <input id="phone" type="text" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="password">
            Password:
          </label>
          <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          <input type="submit" value="login" />
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  logged: state.loggedIn
})
const mapDispatchToProps = (dispatch) => ({
  loginSuccess: (items) => dispatch({ type: 'LOGIN_SUCCESS', user: items }),
  loginError: () => dispatch({ type: 'LOGIN_FAILURE' }),
  localLoading: (statement) => dispatch({ type: 'SET_LOADING', statement })
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))
