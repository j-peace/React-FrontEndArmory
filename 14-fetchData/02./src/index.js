import React from 'react'
import ReactDOM from 'react-dom'
import { getRecords } from './api'
import { Contact, ContactForm, ContactList } from './Contacts'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      contacts: [],
      contactsError: null,
    }
    this.refresh = this.refresh.bind(this)
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
      React.createElement(Contact, { ...contact, key: i })
      )
    }

    return (
      <ContactList onClickRefresh={this.refresh}>
        {content}
        <ContactForm onAddContact={(contact) => {
          this.setState({
            contacts: this.state.contacts.concat(contact)
          })
        }} />
      </ContactList>
    )
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
          contactsError: "Your contacts couldn't be loades :-("
        })
      }
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)