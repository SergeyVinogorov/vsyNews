import React from 'react'
import PropTypes from 'prop-types'
import css from './Header.scss'

const Header = ({ navs }) => {
  const nav = navs.map((el) => (<nav className={css.header__nav}>{el}</nav>))
  return (<header className={css.header__nav}>{nav}</header>)
}
Header.propTypes = {
  navs: PropTypes.arrayOf.isRequired,
};

export default Header
