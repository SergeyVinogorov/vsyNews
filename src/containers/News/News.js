import React from 'react'
import PropTypes from 'prop-types'
import css from './News.scss'
import NewsItem from '../NewsItem/NewsItem'

const News = ({ news, loading }) => {
  if (loading) {
    return (<h2>Loading ... </h2>)
  }
  return (
    <div className={css.wrapp__news}>
      {news.map((el) => (<NewsItem key={Math.random().toString(16).slice(2)} newsItem={el} />))}
    </div>
  )
}
News.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  news: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default News
