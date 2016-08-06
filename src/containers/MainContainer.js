import React, {Component} from 'react'

import Nav from '../components/Nav'

class MainContainer extends Component {
  render() {
    return (
      <div className="Main">
        <Nav />
        <div className="Main-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default MainContainer
