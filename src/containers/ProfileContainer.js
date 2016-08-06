import React, {Component} from 'react'

import Input from '../components/Input'
import Textarea from '../components/Textarea'
import Contact from '../components/Contact'

class ProfileContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fullName: '',
      bio: '',
      contacts: [{id: 0, name: 'email', value: ''}]
    }

    this.newId = 1
  }

  handleFullNameUpdate(e) {
      this.setState({
        fullName: e.target.value
      })
  }

  handleBioUpdate(e) {
      this.setState({
        bio: e.target.value
      })
  }

  handleAdd() {
      this.setState({
        contacts: this.state.contacts.concat([{name: '', value: '', id: this.newId++}])
      })
  }

  handleRemove(removedContact) {
      const contacts = this.state.contacts.filter(function (contact) {
  			return contact !== removedContact;
  		});

      this.setState({
        contacts: contacts
      })
  }

  handleChange(index, newContact) {
      let contacts = this.state.contacts

      Object.assign(contacts[index], newContact)

      this.setState({
        contacts: contacts
      })
  }

  render() {
    const contactItems = this.state.contacts.map((contact, index) => {
        return <Contact key={contact.id} index={index} name={contact.name}
                        onChange={this.handleChange.bind(this)}
                        onRemove={this.handleRemove.bind(this, contact)} />
    })

    return (
      <div className='Profile'>
        <h1>Profile</h1>

        <Input label='Full name' value={this.state.fullName}
           onUpdate={this.handleFullNameUpdate.bind(this)}/>
        <Textarea label='Bio' value={this.state.bio}
          onUpdate={this.handleBioUpdate.bind(this)}/>

        <h2>Contacts</h2>

        <ul className="Profile-contacts">
            {contactItems}
        </ul>

        <button className="Button" onClick={this.handleAdd.bind(this)}>Add contact</button>
      </div>
    )
  }
}

export default ProfileContainer
