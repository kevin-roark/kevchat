import React from 'react'
import PropTypes from 'prop-types'

class MessageInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onInputChange(ev) {
    const { maxLength } = this.props
    const message = ev.target.value
    if (message.length > maxLength) {
      return
    }

    this.setState({ message })
  }

  onSubmit(ev) {
    ev.preventDefault()
    this.props.onInput(this.state.message)
    this.setState({ message: '' })
  }

  render() {
    const { maxLength } = this.props
    const { message } = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" value={message} onChange={this.onInputChange} />
        <input type="submit" value="Send" />
        <span>{message.length}/{maxLength}</span>
      </form>
    )
  }
}

MessageInput.propTypes = {
  onInput: PropTypes.func.isRequired,
  maxLength: PropTypes.number
}

MessageInput.defaultProps = {
  maxLength: 500
}

export default MessageInput
