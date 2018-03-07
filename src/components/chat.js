import React from 'react'
import { Redirect } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty, getVal } from 'react-redux-firebase'

const getUser = props => props.match.params.user

const Chat = props => {
  const { firebase, messages, loading } = props
  const user = getUser(props)
  if (!user) {
    return <Redirect to='/' />
  }

  const empty = !loading && isEmpty(messages)

  return (
    <div>
      <div>Hi, {user}!</div>
      { loading && <div>Loading your messages with kev...</div> }
      { empty && <div>Looks like you have never chatted with kev before... Add a message below!</div> }
    </div>
  )

  return <div>Chat</div>
}

const ConnectedChat = compose(
  firebaseConnect(props => {
    const { match: { params: { user } } } = props
    if (!user) {
      return []
    }

    return [
      { path: `messages/${user}` }
    ]
  }),
  connect(({ firebase }, props) => {
    const user = getUser(props)
    return {
      loading: !isLoaded(firebase.data.messages),
      messages: getVal(firebase, `messages/${user}`)
    }
  })
)(Chat)

export default ConnectedChat
