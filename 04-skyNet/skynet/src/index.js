import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import './styles.css'

class ContactForm extends React.Component {
  render() {
    return (
      <div className='ContactForm'>
        <label>
          <span>Name</span>
          <input value={this.props.name}/>
        </label>
        <label>
          <span>E-mail</span>
          <input value={this.props.email}/>
        </label>
      </div>
    )
  }
}

ContactForm.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
}

ReactDOM.render(
  <ContactForm
    name='Jamess K Nelson'
    email='james@frontarm.com'
  />,
  document.getElementById('root')
)