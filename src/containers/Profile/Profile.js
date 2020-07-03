import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import css from './Profile.scss'
import Heading from '../../components/Heading/Heading'

// eslint-disable-next-line no-undef
const Profile = (props) => {
  const [localUser, setLocalUser] = useState(props.user)
  useEffect(() => {
    if (!props.logged) {
      const user = JSON.parse(localStorage.getItem('user'))
      setLocalUser(user)
    }
  }, [props.user])

  const handlerOut = () => {
    localStorage.clear();
    alert('By bye! You are loged out');
    props.loginOut()
    return (
      <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )
  }

  return (
    <div className={css.user}>
      <Heading head="2" text="Profile" />
      <p>{localUser.firstName}</p>
      <p>{localUser.lastName}</p>
      <p>{localUser.phone}</p>
      <button type="button" onClick={handlerOut}>LogOut</button>
    </div>
  )
}

Profile.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object
};
Profile.defaultProps = {
  user: {}
};

const mapStateToProps = (state) => ({
  user: state.user,
  logged: state.loggedIn
})
const mapDispatchToProps = (dispatch) => ({
  loginOut: () => dispatch({ type: 'LOGOUT' }),
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile))
