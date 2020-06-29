import React, { useEffect, useState } from 'react'
import axios from 'axios'
import URL from '../apiService'

const Users = () => {
  const [news, setNews] = useState([])
  useEffect(() => {
    axios
      .get(URL.sourcesURL + URL.apiKey)
      .then((response) => setNews(response.data.sources))
  }, [])
  return (
    <div>
      <h1>The users</h1>
      <p>Awesome users on board for this news application!</p>
    </div>
  )
}
export default Users
