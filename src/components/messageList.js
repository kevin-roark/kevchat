import React from 'react'
import moment from 'moment'

const MessageList = ({ messages }) => (
  <ol>
    {messages.map(message => (
      <li key={message.id}>
        <span>
          {message.from} ({moment(message.date).format('hh:mm A')})
        </span>
        <span>{message.text}</span>
      </li>
    ))}
  </ol>
)

export default MessageList
