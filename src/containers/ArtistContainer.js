import React, {Component} from 'react'

import {withRouter} from 'react-router'
import axios from 'axios'

import AlbumItem from '../components/AlbumItem'

class ArtistContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      artist: {},
      albums: [],
      isLoadingAlbums: true,
      isLoadingArtist: true
    }
  }

  componentDidMount() {
      this.loadData()
  }

  getArtistData() {
    axios.get('https://api.spotify.com/v1/artists/' + this.props.params.id).then((response) => {
       const artist = response.data

       this.setState({
         isLoadingArtist: false,
         artist: {
            img: artist.images[0].url,
            genres: artist.genres,
            name: artist.name
         }
       })
     })
  }

  getAlbumData() {
    axios.get('https://api.spotify.com/v1/artists/' + this.props.params.id + '/albums/?album_type=single,album').then((response) => {
       this.setState({
         isLoadingAlbums: false,
         albums: response.data.items
       })
     })
  }

  loadData() {
    this.getArtistData()
    this.getAlbumData()
  }

  render() {
    let albumsHtml
    let artistHtml

    if (this.state.isLoadingAlbums) {
      albumsHtml = (<div className="Artist-loading">Loading ...</div>)
    } else {
      albumsHtml = this.state.albums.map((album) => {
          let image

          if (album.images[0]) {
              image = album.images[0].url
          }

          return <AlbumItem key={album.id} name={album.name} img={image}
            id={album.id} />
      })
    }

    if (this.state.isLoadingArtist) {
      artistHtml = (<div className="Artist-loading">Loading ...</div>)
    } else {
      const genres = this.state.artist.genres.map(function(genre, index) {
        return (<li key={index} className='Artist-genre'>{genre}</li>)
      })

      artistHtml = (
          <div className='Artist-info'>
            <div className='Artist-cover'>
              <img src={this.state.artist.img} />
            </div>
            <div className='Artist-description'>
              <h1 className='Artist-title'>{this.state.artist.name}</h1>
              <ul className='Artist-genres'>
                {genres}
              </ul>
            </div>
          </div>
      )
    }

    return (
      <div className='Artist'>
        {artistHtml}

        <div className='Artist-results'>
          <h2>Albums</h2>

          <div className='Artist-albums'>
            {albumsHtml}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(ArtistContainer)
