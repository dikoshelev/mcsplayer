import React, {Component} from 'react'

import {withRouter} from 'react-router'
import axios from 'axios'

import Album from '../components/Album'
import TrackList from '../components/TrackList'

class AlbumContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      album: {},
      tracks: [],
      track: {
        isPlaying: false,
        previewUrl: '',
        muted: false
      },
      isLoading: true
    }

    this.audio = new Audio()

  }

  componentDidMount() {
      this.loadData()
  }

  getAlbumData() {
    return axios.get('https://api.spotify.com/v1/albums/' + this.props.params.id)
  }

  getTracksData() {
    return axios.get('https://api.spotify.com/v1/albums/' + this.props.params.id + '/tracks/')
  }

  postTrack(id) {
    axios.post('/api/favorites', {spotifyId:id})
  }

  loadData() {
    axios.all([this.getAlbumData(), this.getTracksData()])
      .then(axios.spread((album, tracks) => {
          this.setState({
            isLoading: false,
            album: {
                artist: album.data.artists[0].name,
                title: album.data.name,
                artWork: album.data.images[0].url
            },
            tracks: tracks.data.items
          })
      }));
  }

  handleTrackSelect() {

  }

  handlePlayTrack(id, previewUrl) {

    if (this.state.track.isPlaying) {
         if (this.state.track.previewUrl === previewUrl) {
           this.setState({
             track: {
               isPlaying: false,
               previewUrl: previewUrl
             }
           })
         } else {
           this.setState({
             track: {
               isPlaying: true,
               previewUrl: previewUrl
             }
           })
         }
       } else {
         this.setState({
           track: {
             isPlaying: true,
             previewUrl: previewUrl
           }
         })
       }
  }

  handlePause() {
    this.setState({
      track: {
        isPlaying: !this.state.track.isPlaying,
        previewUrl: this.state.track.previewUrl,
        muted: this.state.track.muted
      }
    })
  }

  handleMute() {
    this.setState({
      track: {
        previewUrl: this.state.track.previewUrl,
        muted: !this.state.track.muted,
        isPlaying: this.state.track.isPlaying


      }
    })
  }

  handlePlay() {

  }

  handleNext() {

  }

  handlePrev() {

  }

  componentDidUpdate() {
    this.audio.src = this.state.track.previewUrl

    if (this.state.track.isPlaying) {
      this.audio.play()
    } else {
      this.audio.pause()
    }

    this.audio.muted = this.state.track.muted

  }

  componentWillUnmount() {
    this.audio.pause()
    delete this.audio
  }

  render() {
    let content

    if (!this.state.isLoading) {
      content = (
        <div className='AlbumContainer-player'>
          <Album artist={this.state.album.artist}
            title={this.state.album.title}
            artWork={this.state.album.artWork}
            onPauseTrack={this.handlePause.bind(this)}
            onMuteTrack={this.handleMute.bind(this)}/>
          <TrackList tracks={this.state.tracks}
          onPlayTrack={this.handlePlayTrack.bind(this)}
          postTrackId={this.postTrack.bind(this)}/>
        </div>
      )
    } else {
      content = (<div className='AlbumContainer'>...isLoading</div>)
    }

    return (
      <div className='AlbumContainer'>
        {content}
      </div>
    )
  }
}

export default withRouter(AlbumContainer)
