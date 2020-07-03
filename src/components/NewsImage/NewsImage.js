import React from 'react'
import PropTypes from 'prop-types'
import classes from './NewsImage.scss'

const NewsImage = ({ imageUrl }) => (
  <div className={classes.pizzaImage}>
    {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
    <img src={imageUrl} alt="The image news" className={classes.pizzaImg} />
  </div>
)

NewsImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};
export default NewsImage
