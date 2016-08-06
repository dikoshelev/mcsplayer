import React, {Component, PropTypes} from 'react'

import {Link} from 'react-router'

function AlbumItem(props) {
  return (
        <Link className="AlbumItem" to={`/player/album/${props.id}`}>
            <img src={props.img} />
            <div>{props.name}</div>
        </Link>
    )
}

AlbumItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired
}

export default AlbumItem
