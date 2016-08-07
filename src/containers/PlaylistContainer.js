import React, {Component} from 'react'

import {withRouter} from 'react-router'
import axios from 'axios'

import TrackList from '../components/TrackList'

class PlaylistContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
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

  getTracksData() {
    let spotifyIds = []

    return axios.get('http://localhost:8000/api/favorites/')
    .then(function(response) {
      for (let track of response.data) {
        console.log(track)

        if (track.spotifyId && track.spotifyId !== '') {
          spotifyIds.push(track.spotifyId);
        }
      }
    })
    .then(function() {
      return axios.get('https://api.spotify.com/v1/tracks?ids=' + spotifyIds.join(','))
    }).then((response) => {
      let tracks = response.data.tracks.filter(function(trackData){
        return trackData !== null
      })

      this.setState({
        isLoading: false,
        tracks: response.data.tracks
      })
    })
  }

  loadData() {
    this.getTracksData()
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
         muted: this.state.track.muted,
         previewUrl: this.state.track.previewUrl
       }
     })
  }

  handleMute() {
    this.setState({
      track: {
        muted: !this.state.track.muted,
        previewUrl: this.state.track.previewUrl,
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
        <div className='PlaylistContainer-player'>
          <TrackList tracks={this.state.tracks}
            onPlayTrack={this.handlePlayTrack.bind(this)} />
        </div>
      )
    } else {
      content = (<div className='PlaylistContainer'>...isLoading</div>)
    }

    return (
      <div className='PlaylistContainer'>
        {content}
      </div>
    )
  }
}

export default withRouter(PlaylistContainer)
