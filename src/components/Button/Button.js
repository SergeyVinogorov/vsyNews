import React from 'react'
import PropTypes from 'prop-types'
import css from './Button.scss'

const Button = ({ text }) => (<button type="button" className={css.button}>{text}</button>)

Button.propTypes = {
  text: PropTypes.string.isRequired,
}; ''

export default Button
