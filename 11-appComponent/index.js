import React from 'react'
import ReactDOM from 'react-dom'
import { Contact, ContactList, ContactForm } from './Contacts'

let contacts = [
  {
    name: 'Bill Gates',
    email: 'billg@microsoft.com',
    photoURL: 'https://frontarm.com/courses/react-fundamentals/bill-gates.jpg'
  },
  {
    name: 'Jeff Bezos',
    email: 'jeff@amazon.com',
    photoURL: 'https://frontarm.com/courses/react-fundamentals/jeff-bezos.jpg'
  },
  {
    name: 'Mark Zuckerberg',
    email: 'zuck@fb.com'
  },
]

function App(props) {
  return (
    <ContactList>
      {props.contacts.map((contact, i) =>
        React.createElement(Contact, { ...contact, key: i })
      )}
      <ContactForm
        onAddContact={(contact) => {
          contacts.push(contact)
          renderApp()
        }}
      />
    </ContactList>
  )
}

function renderApp() {
  ReactDOM.render(
    <App contacts={contacts} />,
    document.getElementById('root')
  )
}

renderApp()