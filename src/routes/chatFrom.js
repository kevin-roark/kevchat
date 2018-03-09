import React from 'react'
import { Redirect } from 'react-router-dom'
import { withFirebase } from 'react-redux-firebase'
import { routePaths } from '../constants'
import Chat from '../components/chat'

class ChatFrom extends React.Component {
  componentDidMount() {
    this.setUserOnline(true)
  }

  componentWillUnmount() {
    this.setUserOnline(false)
  }

  getUser(props = this.props) {
    return props.match.params.user
  }

  setUserOnline(online) {
    const { firebase } = this.props
    firebase.set(`usernames/${this.getUser()}`, online)
  }

  render() {
    const user = this.getUser()
    if (!user) {
      return <Redirect to={routePaths.home} />
    }

    return <Chat user={user} from={user} />
  }
}

export default withFirebase(ChatFrom)
