import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import URL from '../apiService'

const Users = (props) => {
  const [news, setNews] = useState([])
  useEffect(() => {
    axios
      .get(URL.sourcesURL)
      .then((response) => {
        console.log(response.data)
        props.initNews(response.data.articles)
      })
  }, [])
  const listNews = props.news.map((el, index) => (<li key={index}>{el.title}</li>))
  return (
    <div>
      <h1>The users</h1>
      <p>Awesome users on board for this news application!</p>
      {listNews}
    </div>
  )
}
const mapStateToProps = (state) => ({ news: state.news })
const mapDispatchToProps = (dispatch) => ({ initNews: (items) => dispatch({ type: 'SET_NEWS', arr: items }) })

export default connect(mapStateToProps, mapDispatchToProps)(Users)
