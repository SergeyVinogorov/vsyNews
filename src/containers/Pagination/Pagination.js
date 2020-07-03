import React from 'react'
import PropTypes from 'prop-types'
import css from './Pagination.scss'

const Pagination = ({ totalPosts, postPerPage, paginate }) => {
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <div className={css.pagination}>
      <ul className={css.wrapp__item}>
        {pageNumbers.map((number) => (
          <li key={number} className={css.pagination__item}>
            <a onClick={() => paginate(number)} href="#">{number}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
Pagination.propTypes = {
  totalPosts: PropTypes.number.isRequired,
  postPerPage: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired
};

export default Pagination
