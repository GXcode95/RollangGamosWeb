import React from 'react'
import axios from 'axios'
import Scrapper from 'components/Scrapper'
import Spotify from 'components/Spotify'
const apikey = process.env.REACT_APP_WEBSCRAPING_API_KEY

const baseURL= "https://api.webscrapingapi.com/v1"
const Home = () => {


  return (
    <div>
      <Scrapper />
      <Spotify />
    </div>
  )
}
    
export default Home
