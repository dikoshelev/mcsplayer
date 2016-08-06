import React, {Component} from 'react'

import {withRouter} from 'react-router'
import axios from 'axios'

import Input from '../components/Input'
import Button from '../components/Button'
import AlbumItem from '../components/AlbumItem'
import ArtistItem from '../components/ArtistItem'

class SearchContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      query: props.params.query || '',
      albums: [],
      artists: [],
      isLoadingAlbums: false,
      isLoadingArtists: false
    }
  }

  handleSearchUpdate(e) {
    this.setState({
      query: e.target.value
    })
  }

  handleSearch () {
    this.props.router.push('/player/search/' + this.state.query)

    this.doSearch()
  }

  componentDidMount() {
    if (this.state.query.length) {
      this.doSearch()
    }
  }

  doSearch() {
    this.setState({
      isLoadingAlbums: true
    })

    axios.get('https://api.spotify.com/v1/search?q=' + this.state.query +
     '&type=album,artist').then((response) => {
       this.setState({
         isLoadingAlbums: false,
         albums: response.data.albums.items.slice(0, 10),
         artists: response.data.artists.items.slice(0, 10)
       })
     })
  }

  render() {
    let albumsHtml
    let artistsHtml

    if (this.state.isLoadingAlbums) {
      albumsHtml = (<div className="Search-loading">Loading ...</div>)
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

    if (this.state.isLoadingArtists) {
      artistsHtml = (<div className="Search-loading">Loading ...</div>)
    } else {
      artistsHtml = this.state.artists.map((artist) => {
          let image

          if (artist.images[0]) {
              image = artist.images[0].url
          }

          return <ArtistItem key={artist.id} name={artist.name} img={image}
            id={artist.id} />
      })
    }

    return (
      <div className='Search'>
        <div className='Search-input'>
          <Input label="Search" value={this.state.query}
            onUpdate={this.handleSearchUpdate.bind(this)}/>

          <Button className="Button" onClick={this.handleSearch.bind(this)}>Do it</Button>
        </div>
        <div className='Search-results'>
          <h2>Albums</h2>

          <div className='Search-albums'>
            {albumsHtml}
          </div>

          <h2>Artists</h2>

          <div className='Search-artists'>
            {artistsHtml}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(SearchContainer)
