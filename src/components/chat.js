import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded } from 'react-redux-firebase'
import MessageList from './messageList'
import MessageInput from './messageInput'

export const me = 'kev'

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
    <div>
      <div>Hi, {from}!</div>
      { loading && <div>Loading your messages with {to}...</div> }
      { empty && <div>Looks like you have never chatted with {to} before... Add a message below!</div> }
      { !loading && !empty && <div>Here is your chatlog with {to}:</div> }
      <MessageList messages={messages} />
      <MessageInput onInput={onMessageInput} />
    </div>
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
