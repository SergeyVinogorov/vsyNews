import React, { useState } from 'react'
import { connect } from 'react-redux'
import Heading from '../../components/Heading/Heading'
import Pagination from '../Pagination/Pagination'
import News from '../News/News'

const TechNews = (props) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage] = useState(3)

  const news = props.techNews ? props.techNews : []
  const indexOfLastPost = currentPage * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage
  const currentPosts = news.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div>
      <Heading head="2" text="Tech News" />
      <News loading={props.loading} news={currentPosts} />
      <Pagination postPerPage={postPerPage} totalPosts={news.length} paginate={paginate} />
    </div>
  )
}
const mapStateToProps = (state) => ({
  techNews: state.tech,
  loading: state.loading
})

export default connect(mapStateToProps, null)(TechNews)
