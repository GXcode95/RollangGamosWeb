import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Credentials } from 'Credentials';

const Spotify = () => {
  const [token, setToken] = useState('')
  const spotify = Credentials();
  const [featurings, setFeaturings] = useState()
  const [artist1, setArtist1] = React.useState()
  const [artist2, setArtist2] = React.useState()

  const getResults = () => {
    return featurings.length === 0 ?
      (<p>Perdu ! </p>) :
      (<p>Gagné</p>)
  }


  const searchFeatOnSpotify = async () => {
    axios('https://accounts.spotify.com/api/token', {
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)
        },
        data: 'grant_type=client_credentials',
        method: 'POST'
      })
      .then(tokenResponse => {
        console.log(tokenResponse.data.access_token);
        setToken(tokenResponse.data.access_token);

        // ? Get info about one artist, getting his id from his name and his info from his id
        // axios(`https://api.spotify.com/v1/search?q=${artist1}&type=artist`, {
        //   method: 'GET',
        //   headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
        // })
        // .then (queryResponse => {
        //   const artistId = queryResponse.data.artists.items[0].id
        //   axios(`https://api.spotify.com/v1/artists/${artistId}`, {
        //     method: 'GET',
        //     headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
        //   })
        //   .then( artistResponse => {
        //       console.log(artistResponse)
        //   })
        // })
        // //? Get a list of all song signed by the both artists
        axios(`https://api.spotify.com/v1/search?q=artist%3A${artist1}%20${artist2}&type=track`, {
          method: 'GET',
          headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
        })
        .then(response =>{
          console.log("dat", response.data)
          const featList = response.data.tracks.items
          console.log(featList)
          setFeaturings(featList)
        })

      });
    }

  const handleClick = () => {
    searchFeatOnSpotify()
  }

  return (
    <div>
      <h1>Spotify</h1>
      <div>
        <label>Artiste 1</label>
        <input type="text" onChange={e => setArtist1(e.target.value)} />
      </div>
      <div>
        <label>Artiste 2</label>
        <input type="text" onChange={e => setArtist2(e.target.value)} />
      </div>

      <button onClick={handleClick}>Search</button>
      {featurings && getResults()}
    </div>

  )
}

export default Spotify