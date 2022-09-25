/** not original file */

import PropTypes from 'prop-types'
import React from 'react'


export function Contact(props) {
  let { email, name, photoURL, ...other } = props
  let names = name.split(' ')
  let initials = names.map(name => name[0].toUpperCase()).join('')

  return (
    <div className='Contact' {...other}>
      <div className='Contact-avatar'>
        {initials}
        {photoURL && <img src={photoURL} />}
      </div>
      <span className='Contact-name'>
        {name}
      </span>
      <a href={"mailto:"+email}>
        {email}
      </a>
    </div>
  )
}

export function ContactList(props) {
  return (
    <div className='ContactList'>
      <h2 className='ContactList-title'>
        Contacts
        <button
          className='ContactList-refresh'
          onClick={props.onClickRefresh}>
          Refresh
        </button>
      </h2>
      {props.children}
    </div>
  )
}

export class ContactForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: "",
      nameError: null,

      email: "",
      emailError: null,
     }
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render() {
    return (
      <form
        className='ContactForm'
        onSubmit={this.handleSubmit}>
        <label>
          <span>Name</span>
          <input
            value={this.state.name}
            onChange={this.handleChangeName}
          />
          {this.state.nameError && (
            <div className='ContactForm-error'>
              {this.state.nameError}
            </div>
          )}
        </label>
        <label>
          <span>E-mail</span>
          <input
            value={this.state.email}
            onChange={this.handleChangeEmail}
          />
          {this.state.emailError && (
            <div className='ContactForm-error'>
              {this.state.emailError}
            </div>
          )}
        </label>
        <button type="submit">
          Add
        </button>
      </form>
    )
  }
  
  handleChangeName(event) {
    this.setState({
      name: event.target.value,
      nameError: null,
    })
  }
  
  handleChangeEmail(event) {
    let value = event.target.value
  
    this.setState({
      email: value,
      emailError: isEmailValid(value) ? null : this.state.emailError,
    })
  }
  
  handleSubmit(event) {
    event.preventDefault()
    
    let errors = {}
    if (!this.state.name) {
      errors.nameError = "You must enter a name."
    }
    if (!this.state.email) {
      errors.emailError = "You must enter an email."
    }
    else if (!isEmailValid(this.state.email)) {
      errors.emailError = "That doesn't look like a valid e-mail."
    }
   
    if (Object.keys(errors).length === 0) {
      this.props.onAddContact({
        name: this.state.name,
        email: this.state.email,
      })
    }
    else {
      this.setState(errors)
    }
  }
}

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
}

function isEmailValid(value) {
  return value.indexOf('@') !== -1
}