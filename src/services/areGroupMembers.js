import axios from 'axios'
const apikey = process.env.REACT_APP_WEBSCRAPING_API_KEY
const scrapBaseURL= "https://api.webscrapingapi.com/v1"

const scrapPage = async (url) => {
  const response = await axios.get(`${scrapBaseURL}?api_key=${apikey}&url=${url}`)
  var parser = new DOMParser();
  var doc = parser.parseFromString(response.data, "text/html");
  return doc
}

const getArtistsGroup = (doc) => {
  const headers = doc.querySelectorAll('.infobox_v3 th')
  let tagList = null
  headers.forEach( th => {
   if(th.innerHTML==="Membre de"){
     tagList = th.parentElement.querySelectorAll('a')
   }
  })
  if(!tagList) return null
  console.log(tagList)

  let groups = []
  tagList.forEach(tag => {
    if (!tag.href.includes('www.wikidata.org')) { // prevent to fetch some additional link, it sometimes appears and the end of the <td>
      groups.push(tag.innerHTML)
    }
  })
  if(groups.length === 0) return null
  
  return groups
}

const scrapArtistGroups = async (artistName) => {
  const wikiBaseURl = "https%3A%2F%2Ffr.wikipedia.org%2Fwiki%2F"
  const doc = await scrapPage(wikiBaseURl + artistName)
  const members = getArtistsGroup(doc)
    return members
}

function findCommonElements(arr1, arr2) {
  return arr1.some(item => arr2.includes(item))
}

const areGroupMembers = async (artistName1, artistName2) => {
  const groups1 = await scrapArtistGroups(artistName1)
  const groups2 = await scrapArtistGroups(artistName2)
  if(!groups1 || !groups2) return false
  return findCommonElements(groups1, groups2)
}
export default areGroupMembers