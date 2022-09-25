import React from 'react'
import ReactDOM from 'react-dom'
import { createRecord, deleteRecord, getRecords, patchRecord } from './api'
import { Contact, ContactForm, ContactList } from './Contacts'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      contacts: [],
      contactsError: null,
      
      contactForm: {
        name: '',
        email: '',
      },
      contactFormErrors: null,
      contactFormId: null,
    }

    this.addContact = this.addContact.bind(this)
    this.cancelEditingContact = this.cancelEditingContact.bind(this)
    this.changeContactForm = this.changeContactForm.bind(this)
    this.deleteContact = this.deleteContact.bind(this)
    this.patchContact = this.patchContact.bind(this)
    this.refresh = this.refresh.bind(this)
    this.startEditingContact = this.startEditingContact.bind(this)
  }

  componentDidMount() {
    this.refresh()
  }

  render() {
    let content
    if (this.state.contactsError) {
      content = (
        <p>
          {this.state.contactsError}
        </p>
      )
    }
    else {
      content = this.state.contacts.map((contact, i) =>
        this.state.contactFormId === contact.id ? (
          <ContactForm
            key={i}
            value={this.state.contactForm}
            errors={this.state.contactFormErrors}
            onChange={this.changeContactForm}
            onClickCancel={this.cancelEditingContact}
            onSubmit={this.patchContact}
          />
        ) : (
          <Contact
            {...contact}
            key={i}
            error={
              this.state.deleteContactError === contact.id &&
              "Could not be deleted."
            }
            onClickEdit={this.startEditingContact}
            onClickDelete={this.deleteContact}
          />
        )
      )
    }
  
    return (
      <ContactList onClickRefresh={this.refresh}>
        {content}
        {!this.state.contactFormId && (
          <ContactForm
            errors={this.state.contactFormErrors}
            value={this.state.contactForm}
            onChange={this.changeContactForm}
            onSubmit={this.addContact}
          />
        )}
      </ContactList>
    )
  }
  
  changeContactForm(value) {
    this.setState({
      contactForm: value,
      contactFormErrors:
        silenceRectifiedErrors(this.state.contactFormErrors, validateContact(value))
    })
  }
  
  addContact() {
    let errors = validateContact(this.state.contactForm)
    if (errors) {
      this.setState({
        contactFormErrors: errors,
      })
    }
    else {
      createRecord(this.state.contactForm).then(
        (response) => {
          this.setState({
            contacts: this.state.contacts.concat(response.data),
            contactForm: {
              name: '',
              email: '',
            },
            contactFormErrors: null,
          })
        },
        () => {
          this.setState({
            contactFormErrors: {
              base: "Something went wrong while saving your contact :-(",
            }
          })
        }
      )
    }
  }

  patchContact() {
    let errors = validateContact(this.state.contactForm)
    
    if (errors) {
      this.setState({
        editingErrors: errors,
      })
    }
    else {
      let id = this.state.contactFormId
    
      patchRecord(id, this.state.contactForm).then(
        (response) => {
          // Make a clone of the stored contacts.
          let newContacts = this.state.contacts.slice(0)
          
          // Find the contact with the correct id
          let i = newContacts.findIndex(contact => contact.id === id)
          
          // Update the contact in this.state
          newContacts[i] = response.data
        
          this.setState({
            contacts: newContacts,
            contactForm: {
              name: '',
              email: '',
            },
            contactFormId: null,
            contactFormErrors: null,
          })
        },
        (error) => {
          this.setState({
            contactFormErrors: {
              base: "Something went wrong while saving your contact :-(",
            }
          })
        }
      )
    }
  }
  
  deleteContact(id) {
    deleteRecord(id).then(
      (response) => {
        this.setState({
          contacts: this.state.contacts.filter(contact => contact.id !== id),
          deleteContactError: null,
        })
      },
      (error) => {
        this.setState({
          deleteContactError: id,
        })
      }
    )
  }
  
  cancelEditingContact() {
    this.setState({
      contactForm: {},
      contactFormId: null,
      contactFormErrors: null,
    })
  }
  
  startEditingContact(id) {
    this.setState({
      contactFormId: id,
      contactForm: this.state.contacts.find(contact => contact.id === id),
    })
  }

  refresh() {
    getRecords().then(
      (response) => {
        this.setState({
          contacts: response.data,
          contactsError: null,
        })
      },
      (error) => {
        this.setState({
          contactsError: "Your contacts couldn't be loaded :-("
        })
      }
    ) 
  }
}

function validateContact(contact) {
  let errors = {}
  if (!contact.name) {
    errors.name = "You must enter a name."
  }
  if (!contact.email) {
    errors.email = "You must enter an email."
  }
  else if (!isEmailValid(contact.email)) {
    errors.email = "That doesn't look like a valid e-mail."
  }
  if (Object.keys(errors).length) {
    return errors
  }
}

function isEmailValid(value) {
  return value.indexOf('@') !== -1
}

function silenceRectifiedErrors(oldErrors, newErrors) {
  if (newErrors && oldErrors) {
    let errors = {}
    for (let key of Object.keys(newErrors)) {
      if (oldErrors[key]) {
        errors[key] = oldErrors[key]
      }
    }
    return Object.keys(errors).length ? errors : null
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)