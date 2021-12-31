import React from 'react'
import axios from 'axios'
const apikey = process.env.REACT_APP_WEBSCRAPING_API_KEY

const baseURL= "https://api.webscrapingapi.com/v1"
const Home = () => {



  const scrapPage = async (url) => {
    const response = await axios.get(`${baseURL}?api_key=${apikey}&url=${url}`)
    var parser = new DOMParser();
    var doc = parser.parseFromString(response.data, "text/html");
    return doc
  }

  const getPageMembers = (doc) => {
    const headers = doc.querySelectorAll('.infobox_v3 th')
    
    let tagList = null
    headers.forEach( th => {
     if(th.innerHTML===" Membres\n "){
       tagList = th.parentElement.querySelectorAll('td a')
     }
    })

    let members = []
    tagList.forEach(tag => members.push(tag.innerHTML))
    
    return members
  }
  const handleClick = async () => {
    const url = "https%3A%2F%2Ffr.wikipedia.org%2Fwiki%2F1995_(groupe)"
    const doc = await scrapPage(url)
    
    const members = getPageMembers(doc)

    console.log(members)
  }

  return (
    <div className=''>
      <button onClick={handleClick}>Click</button>
    </div>
  )
}
    
export default Home
