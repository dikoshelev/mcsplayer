import React, {Component} from 'react'
import {Link} from 'react-router'

import Button from '../components/Button'
import Input from '../components/Input'

const IndexContainer = React.createClass({
  getInitialState() {
    return {
      angle: 45,
      username: '',
      password: ''
    }
  },

  componentDidMount() {
     const mouseMoveHandler = function(e) {
       let windowWidth = window.innerWidth

      //  console.log(e.pageX / windowWidth * 360)

       this.setState({
         angle: e.pageX / windowWidth * 360
       })
     }

    const bindedMouseHandler = mouseMoveHandler.bind(this)

    // console.log(bindedMouseHandler({}))
    // console.log(mouseMoveHandler({}))

    window.addEventListener('mousemove', bindedMouseHandler)
  },

  handleUsernameUpdate(e) {
      console.log(e.target.value)

      this.setState({
        username: e.target.value
      })
  },

  handlePasswordUpdate(e) {
      console.log(e.target.value)

      this.setState({
        password: e.target.value
      })
  },

  handleSumbit(e) {
     e.preventDefault()

     if (this.state.password.length > 6) {
       alert('Hello ' + this.state.username)
     } else {
        alert('Access denied')
     }
  },

  render() {
    return (
      <div className='Index'>
        <div className='Bg' style={{'background': 'linear-gradient(' + this.state.angle + 'deg, #AD6BFF, #74BCF7)'}}></div>

        <form className='Index-form' onSubmit={this.handleSumbit}>
          <Input label='username' value={this.state.username} onUpdate={this.handleUsernameUpdate} />
          <Input type='password' label='password' value={this.state.password} onUpdate={this.handlePasswordUpdate} />

          <Link to='/profile/' className="Button Button--login">Sign in</Link>
        </form>
      </div>
    )
  }
})

export default IndexContainer
