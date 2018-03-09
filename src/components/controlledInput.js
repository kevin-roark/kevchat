import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'
import styled from 'react-emotion'
import cx from 'classnames'
import TextArea from 'react-autosize-textarea'
import { mobileBreakpoint, notMobileBreakpount } from '../constants'

const ControlledInputForm = styled('form')`
  position: relative;
  display: flex;
  align-items: stretch;

  @media (${mobileBreakpoint}) {
    align-items: flex-end;
  }
`

const inputClass = css`
  box-sizing: border-box;
  border: 1px solid #000;
  outline: none;
  border-radius: 0;
  background-color: #fff;
`

const textClass = css`
  ${inputClass};
  width: calc(100% - 80px);
  padding: 10px 6px;
  font-size: 16px;
  resize: none;
  overflow: scroll;
`

const SubmitButton = styled('input')`
  ${inputClass};
  width: 80px;
  border-left: none;
  color: #444;
  opacity: 0.2;
  transition: opacity 0.2s;

  &.enabled {
    opacity: 1;
    cursor: pointer;
  }

  @media (${notMobileBreakpount}) {
    &:hover {
      color: #000;
    }
  }

  @media (${mobileBreakpoint}) {
    min-height: 40px;
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

class ControlledInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }
    this.onInputKeyPress = this.onInputKeyPress.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    if (this.input && this.props.autoFocus) {
      this.input.focus()
    }
  }

  onInputKeyPress(ev) {
    if (ev.which === 13 && !ev.shiftKey) {
      ev.preventDefault()
      this.submit(ev)
    }
  }

  onInputChange(ev) {
    const { maxLength, valueCleaner } = this.props
    const message = valueCleaner(ev.target.value)
    if (message.length > maxLength) {
      return
    }

    this.setState({ message })
  }

  submit(ev) {
    ev.preventDefault()
    this.props.onInput(this.state.message)
    this.setState({ message: '' })
  }

  render() {
    const {
      maxLength,
      containerClass,
      inputClass,
      submitClass,
      submitLabel,
      showLengthCounter,
      autoFocus
    } = this.props
    const { message } = this.state

    // <TextInput type="text" value={message} onChange={this.onInputChange} />

    return (
      <ControlledInputForm className={containerClass} onSubmit={this.submit}>
        <TextArea
          className={cx([textClass, inputClass])}
          autoFocus={autoFocus}
          value={message}
          onChange={this.onInputChange}
          onKeyPress={this.onInputKeyPress}
          innerRef={el => {
            this.input = el
          }}
        />
        <SubmitButton
          className={cx([submitClass, { enabled: message.length > 0 }])}
          type="submit"
          value={submitLabel}
        />
        {showLengthCounter && (
          <LengthCounter className={cx({ active: message.length > 0 })}>
            {message.length}/{maxLength}
          </LengthCounter>
        )}
      </ControlledInputForm>
    )
  }
}

ControlledInput.propTypes = {
  onInput: PropTypes.func.isRequired,
  containerClass: PropTypes.string,
  inputClass: PropTypes.string,
  submitClass: PropTypes.string,
  submitLabel: PropTypes.string,
  showLengthCounter: PropTypes.bool,
  autoFocus: PropTypes.bool,
  valueCleaner: PropTypes.func,
  maxLength: PropTypes.number
}

ControlledInput.defaultProps = {
  maxLength: 250,
  showLengthCounter: true,
  submitLabel: 'Send',
  valueCleaner: val => val,
  autoFocus: true
}

export default ControlledInput
