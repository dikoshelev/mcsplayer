import React, {Component, PropTypes} from 'react'

import Input from '../components/Input'

class Contact extends Component {
  handleNameUpdate(e) {
    this.props.onChange(this.props.index, {
      name: e.target.value,
      value: this.props.value
    })
  }

  handleValueUpdate(e) {
    this.props.onChange(this.props.index, {
      name: this.props.name,
      value: e.target.value
    })
  }

  render() {
    return (
        <div className="Contact">
          <Input label="Name" value={this.props.name}
                 onUpdate={this.handleNameUpdate.bind(this)} />

         <Input label="Value" value={this.props.value}
                onUpdate={this.handleValueUpdate.bind(this)} />

          <button className="Button" onClick={this.props.onRemove}>x</button>
        </div>
      )
  }
}

export default Contact
