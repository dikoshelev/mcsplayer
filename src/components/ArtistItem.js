import React, {Component, PropTypes} from 'react'

import {Link} from 'react-router'

function ArtistItem(props) {
  return (
        <Link className="ArtistItem" to={`/player/artist/${props.id}`}>
            <img src={props.img} />
            <div>{props.name}</div>
        </Link>
    )
}

ArtistItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired
}

export default ArtistItem
