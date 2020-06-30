import React from 'react'
import PropTypes from 'prop-types'
import css from './Heading.scss'

const Heading = ({ text, head }) => {
  const headingCss = `heading__${head}`
  return (<p className={css[headingCss]}>{text}</p>)
}

Heading.propTypes = {
  text: PropTypes.string.isRequired,
  head: PropTypes.string.isRequired
};

export default Heading
