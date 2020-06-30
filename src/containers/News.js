import React, { useState } from 'react'
import { connect } from 'react-redux'
import NewsImage from '../components/NewsImage/NewsImage'

const News = (props) =>
  // const [localNews, setLocalNews] = useState([props.news])
  (
    <div>
      <h1>Recent News</h1>
      <NewsImage />
    </div>
  )

// const mapStateToProps = (state) => ({
//   news: state.news,
// })

const mapDispatchToProps = (dispatch) => ({
  onIncrement: () => dispatch({ type: 'INCREMENT' }),
})
export default connect(mapDispatchToProps)(News)
