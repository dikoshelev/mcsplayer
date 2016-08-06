import React, {Component, PropTypes} from 'react'

function Album(props) {
  return (
      <div className="Album">
        <img className="Album-artWork" src={props.artWork} />

        <button className="Album-btn Album-btn--play" onClick={() => {props.onPauseTrack(props.id, props.previewUrl)}}></button>
        <button className="Album-btn Album-btn--stop"></button>
        <button onClick={props.onMuteTrack}>Mute</button>

        <div className="Album-artist">{props.artist}</div>
        <div className="Album-title">{props.title}</div>
      </div>
    )
}

Album.propTypes = {
  artist: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  artWork: PropTypes.string
}

export default Album
