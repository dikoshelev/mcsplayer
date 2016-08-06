import React, {Component, PropTypes} from 'react'

function Track(props) {
  return (
      <div className="Track" onClick={() => {props.onPlayTrack(props.id, props.previewUrl)}}>
        <div className="Track-left">
          <div className="Track-number">{props.number + 1}.</div>
          <div className="Track-title">{props.title}</div>
        </div>
        <div className="Track-duration">{props.duration}</div>
      </div>
    )
}

Track.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired
}

export default Track
