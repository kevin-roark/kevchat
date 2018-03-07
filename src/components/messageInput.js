import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'
import styled from 'react-emotion'
import cx from 'classnames'

const MessageInputForm = styled('form')`
  position: relative;
`

const inputClass = css`
  box-sizing: border-box;
  border: 1px solid #000;
  height: 44px;
  outline: none;
`

const TextInput = styled('input')`
  ${inputClass};
  width: calc(100% - 80px);
  padding: 10px 6px;
  font-size: 16px;
`

const SubmitButton = styled('input')`
  ${inputClass};
  transform: translateY(-2px);
  width: 80px;
  border-left: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const LengthCounter = styled('div')`
  position: absolute;
  top: 0;
  left: calc(100% - 125px);
  width: 40px;
  text-align: right;
  color: #ccc;
  font-size: 11px;
  opacity: 0;
  transition: opacity 0.2s;

  &.active {
    opacity: 1;
  }
`

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
      <MessageInputForm onSubmit={this.onSubmit}>
        <TextInput type="text" value={message} onChange={this.onInputChange} />
        <SubmitButton type="submit" value="Send" />
        <LengthCounter className={cx({ active: message.length > 0 })}>
          {message.length}/{maxLength}
        </LengthCounter>
      </MessageInputForm>
    )
  }
}

MessageInput.propTypes = {
  onInput: PropTypes.func.isRequired,
  maxLength: PropTypes.number
}

MessageInput.defaultProps = {
  maxLength: 140
}

export default MessageInput
