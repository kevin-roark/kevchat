import React from 'react'
import { withRouter } from 'react-router-dom'
import { css } from 'emotion'
import styled from 'react-emotion'
import { me, mobileBreakpoint, getUserChatPath } from '../constants'
import ControlledInput from '../components/controlledInput'

const Heading = styled('h1')`
  text-align: center;
  line-height: 1.5;
  font-size: 48px;

  @media (${mobileBreakpoint}) {
    font-size: 24px;
  }
`

const InputWrapper = styled('div')`
  margin-top: 40px;
  display: flex;
  width: 100%;
  justify-content: center;
`

const containerClass = css`
  display: block;
`

const inputClass = css`
  padding: 30px 10px;
  width: 600px;
  font-size: 32px;
  color: #000;
  text-align: center;

  @media (${mobileBreakpoint}) {
    width: auto;
  }
`

const submitClass = css`
  display: block;
  margin: 16px auto;
  width: auto;
  border: none;
  padding: 10px 30px;
  font-size: 28px;

  &.enabled {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
`

const Home = ({ history }) => (
  <div>
    <Heading>
      <div>Welcome to kevchat!</div>
      <div>Type your name to chat with {me}</div>
    </Heading>
    <InputWrapper>
      <ControlledInput
        containerClass={containerClass}
        inputClass={inputClass}
        submitClass={submitClass}
        maxLength={60}
        showLengthCounter={false}
        valueCleaner={val => val.replace(/\s/g, '_').toLowerCase()}
        submitLabel="→"
        onInput={user => history.push(getUserChatPath(user))}
      />
    </InputWrapper>
  </div>
)

export default withRouter(Home)
