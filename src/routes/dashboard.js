import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded } from 'react-redux-firebase'
import Chat, { me } from '../components/chat'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentChattingUsers: {}
    }
  }

  toggleChattingUser(user) {
    const { currentChattingUsers } = this.state
    this.setState({
      currentChattingUsers: { ...currentChattingUsers, [user]: !currentChattingUsers[user] }
    })
  }

  render() {
    const { onlineUsers } = this.props
    const { currentChattingUsers } = this.state
    return (
      <div>
        <div>Hi {me}!!! Toggle who you want to chat with</div>
        <ul>
          {onlineUsers.map(user => (
            <li key={user} onClick={() => this.toggleChattingUser(user)}>
              {user} {currentChattingUsers[user] ? '(active)' : ''}
            </li>
          ))}
        </ul>

        <h2>Chatters!</h2>
        <div>
          {Object.keys(currentChattingUsers).map(user => (
            <Chat key={user} user={user} from={me} />
          ))}
        </div>
      </div>
    )
  }
}

const ConnectedDashboard = compose(
  firebaseConnect(['onlineUsers']),
  connect(({ firebase }) => {
    const loading = !isLoaded(firebase.data.onlineUsers)
    const onlineUsersData = !loading ? firebase.data.onlineUsers : {}
    const onlineUsers = Object.keys(onlineUsersData).filter(user => !!onlineUsersData[user])

    return { onlineUsers }
  })
)(Dashboard)

export default ConnectedDashboard
