import React from 'react'
import axios from 'axios'
import areGroupMembers from 'services/areGroupMembers'


const Scrapper = () => {
  const [artist1, setArtist1] = React.useState()
  const [artist2, setArtist2] = React.useState()

  const handleClick = async () => {
    const doFeatExist = await areGroupMembers(artist1, artist2)
    alert(doFeatExist ? "Le feat exist" : "le feat n'existe pas")
  }
  

  return (
    <div>
      <h1>Scrapper</h1>
      <div>
        <label>Artiste 1</label>
        <input type="text" onChange={e => setArtist1(e.target.value)} />
      </div>
      <div>
        <label>Artiste 2</label>
        <input type="text" onChange={e => setArtist2(e.target.value)} />
      </div>

      <button onClick={handleClick}>Search</button>
    </div>
  )
}
    
export default Scrapper
