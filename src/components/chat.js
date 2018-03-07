import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded } from 'react-redux-firebase'
import styled from 'react-emotion'
import { me, mobileBreakpoint } from '../constants'
import MessageList from './messageList'
import MessageInput from './messageInput'

const Container = styled('div')`
  padding: 8px;
  width: 600px;

  @media(${mobileBreakpoint}) {
    width: auto;
  }
`

const Greeting = styled('h1')`
  text-align: center;
  font-size: 44px;
`

const Status = styled('h2')`
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
`

const Chat = props => {
  const { firebase, user, from, messages, loading, empty } = props
  const to = from === user ? me : user

  const onMessageInput = message => {
    if (!message) {
      return
    }

    const data = {
      from,
      date: Date.now(),
      text: message
    }
    firebase.push(`messages/${user}`, data)
  }

  return (
    <Container>
      <Greeting>
        Hi, {from}!
      </Greeting>
      <Status>
        { loading && <div>Loading your messages with {to}...</div> }
        { empty && <div>Looks like you have never chatted with {to} before... Add a message below!</div> }
        { !loading && !empty && <span>Enjoy your chat with {to}.</span> }
      </Status>
      <MessageList messages={messages} />
      {!loading && <MessageInput onInput={onMessageInput} /> }
    </Container>
  )
}

Chat.propTypes = {
  user: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired
}

const ConnectedChat = compose(
  firebaseConnect(({ user }) => {
    return [
      {
        path: `messages/${user}`,
        queryParams: [
          'orderByChild=date'
        ]
      }
    ]
  }),
  connect(({ firebase }, { user }) => {
    const loading = !isLoaded(firebase.data.messages)
    const messageData = !loading ? firebase.data.messages[user] : {}
    const messages = Object.keys(messageData).map(id => ({ ...messageData[id], id }))
    const empty = !loading && messages.length === 0

    return { loading, empty, messages }
  })
)(Chat)

export default ConnectedChat
