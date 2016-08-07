import React, {PropTypes} from 'react'

import {Link} from 'react-router'

function Nav(props) {
  return (
      <nav className="Nav">
        <Link className="Nav-link" to='/player/search/' activeClassName='isActive'>Player</Link>
        <Link className="Nav-link" to='/profile/' activeClassName='isActive'>Profile</Link>
        <Link className="Nav-link" to='/playlist/' activeClassName='isActive'>Playlist</Link>
        <Link className="Nav-link" to='/'>Log out</Link>
      </nav>
    )
}

export default Nav
