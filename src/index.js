import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, browserHistory} from 'react-router';

import './index.css'

import IndexContainer from './containers/IndexContainer'
import ProfileContainer from './containers/ProfileContainer'
import PlayerContainer from './containers/PlayerContainer'
import MainContainer from './containers/MainContainer'
import SearchContainer from './containers/SearchContainer'
import ArtistContainer from './containers/ArtistContainer'
import AlbumContainer from './containers/AlbumContainer'
import PlaylistContainer from './containers/PlaylistContainer'

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={IndexContainer} />
    <Route component={MainContainer}>
      <Route path="player" component={PlayerContainer}>
        <Route path="search(/:query)" component={SearchContainer}/>
        <Route path="album(/:id)" component={AlbumContainer}/>
        <Route path="artist(/:id)" component={ArtistContainer}/>
      </Route>
      <Route path="/profile/" component={ProfileContainer} />
      <Route path="/playlist/" component={PlaylistContainer} />
    </Route>
  </Router>
), document.getElementById('app'));
