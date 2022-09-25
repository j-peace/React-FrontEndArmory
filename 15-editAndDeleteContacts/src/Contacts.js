/** not original file */

import PropTypes from 'prop-types'
import React from 'react'

export class ContactForm extends React.Component {
  constructor() {
    super()
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render() {
    let { value, errors } = this.props
  
    return (
      <form
        className='ContactForm'
        onSubmit={this.handleSubmit}>
        {errors && errors.base && (
          <div className='ContactForm-error'>
            {errors.base}
          </div>
        )}
        <label>
          <span>Name</span>
          <input
            value={value.name}
            onChange={this.handleChangeName}
          />
          {errors && errors.name && (
            <div className='ContactForm-error'>
              {errors.name}
            </div>
          )}
        </label>
        <label>
          <span>E-mail</span>
          <input
            value={value.email}
            onChange={this.handleChangeEmail}
          />
          {errors && errors.email && (
            <div className='ContactForm-error'>
              {errors.email}
            </div>
          )}
        </label>
        <button
          className='ContactForm-save-button'
          type="submit">
          Save
        </button>
        {this.props.onClickCancel && (
          <button
            type="button"
            onClick={this.props.onClickCancel}>
            Cancel
          </button>
        )}
      </form>
    )
  }
  
  handleChangeName(event) {
    this.props.onChange({
      ...this.props.value,
      name: event.target.value,
    })
  }
  
  handleChangeEmail(event) {
    this.props.onChange({
      ...this.props.value,
      email: event.target.value,
    })
  }
  
  handleSubmit(event) {
    event.preventDefault()
    this.props.onSubmit()
  }
}

ContactForm.propTypes = {
  value: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  errors: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
  onClickCancel: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
}


export class Contact extends React.Component {
  constructor() {
    super()
    this.handleClickDelete = this.handleClickDelete.bind(this)
    this.handleClickEdit = this.handleClickEdit.bind(this)
  }

  render() {
    let { email, id, name, error, photoURL, onClickDelete, onClickEdit, ...other } = this.props
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
        <div className='Contact-actions'>
          <button
            className='Contact-actions-edit'
            onClick={this.handleClickEdit}>
            Edit
          </button>
          <button
            className='Contact-actions-delete'
            onClick={this.handleClickDelete}>
            Delete
          </button>
          {error && (
            <span className='Contact-error'>
              {error}
            </span>
          )}
        </div>
      </div>
    )
  }
  
  handleClickDelete() {
    this.props.onClickDelete(this.props.id)
  }
  
  handleClickEdit() {
    this.props.onClickEdit(this.props.id)
  }
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