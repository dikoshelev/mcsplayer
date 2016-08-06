import React, {Component} from 'react'

class PlayerContainer extends Component {
  render() {
    return (
      <div className='Player'>
          <div className="Player-content">
              {this.props.children}
          </div>
      </div>
    )
  }
}

export default PlayerContainer
