import React from 'react'
import classes from './NewsImage.scss'
import PizzaImage from '../../assets/pizza.jpg'

const NewsImage = () => (
  <div className={classes.pizzaImage}>
    {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
    <img src={PizzaImage} alt="The image news" className={classes.pizzaImg} />
  </div>
)

export default NewsImage
