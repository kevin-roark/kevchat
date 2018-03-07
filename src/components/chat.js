import React from 'react'
import { Redirect } from 'react-router-dom'

const Chat = (props) => {
  const { match: { params: { user } } } = props
  if (!user) {
    return <Redirect to='/' />
  }

  return <div>Chat</div>
}

export default Chat
