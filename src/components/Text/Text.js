import React from 'react'
import PropTypes from 'prop-types'
import css from './Text.scss'

const Button = ({ text }) => (<p className={css.text}>{text}</p>)

Button.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Button
