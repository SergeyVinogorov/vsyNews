import React from 'react'
import PropTypes from 'prop-types'
import css from './NewsItem.scss'
import Heading from '../../components/Heading/Heading'
import Text from '../../components/Text/Text'
import NewsImage from '../../components/NewsImage/NewsImage'

const NewsItem = ({ newsItem }) => (
  <article className={css.article}>
    <Heading head="3" text={newsItem.title} />
    <div className={css.article__description}>
      <NewsImage imageUrl={newsItem.urlToImage} />
      <Text text={newsItem.description} />
    </div>
  </article>
)
NewsItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  newsItem: PropTypes.object.isRequired,
};

export default NewsItem
