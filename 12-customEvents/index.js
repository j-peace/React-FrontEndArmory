import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import './styles.css'

class ContactForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: "",
      email: "",
     }
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleClickAdd = this.handleClickAdd.bind(this)
  }

  render() {
    return (
      <div className='ContactForm'>
        <label>
          <span>Name</span>
          <input
            value={this.state.name}
            onChange={this.handleChangeName}
          />
        </label>
        <label>
          <span>E-mail</span>
          <input
            value={this.state.email}
            onChange={this.handleChangeEmail}
          />
        </label>
        <button onClick={this.handleClickAdd} >
          Add
        </button>
      </div>
    )
  }
  
  handleChangeName(event) {
    this.setState({
      name: event.target.value,
    })
  }
  
  handleChangeEmail(event) {
    this.setState({
      email: event.target.value,
    })
  }

  handleClickAdd(event) {
    this.props.onAddContact(this.state)
  }
}

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
}

ReactDOM.render(
  <ContactForm
    onAddContact={(contact) => console.log(contact)}
  />,
  document.getElementById('root')
)