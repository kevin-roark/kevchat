import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded } from 'react-redux-firebase'
import styled from 'react-emotion'
import cx from 'classnames'
import { me } from '../constants'
import Chat from '../components/chat'

const Heading = styled('h1')`
  font-size: 24px;
`

const ChattingUsersList = styled('ul')`
  margin: 10px 0 40px 0;

  & li {
    cursor: pointer;

    &.active {
      text-decoration: underline;
    }
  }
`

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
    const { usernames } = this.props
    const { currentChattingUsers } = this.state
    return (
      <div>
        <Heading>Toggle who you want to chat with</Heading>
        <ChattingUsersList>
          {usernames.map(user => (
            <li
              key={user}
              className={cx({ active: currentChattingUsers[user] })}
              onClick={() => this.toggleChattingUser(user)}
            >
              {user}
            </li>
          ))}
        </ChattingUsersList>

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
  firebaseConnect(['usernames']),
  connect(({ firebase }) => {
    const loading = !isLoaded(firebase.data.usernames)
    const usernamesData = !loading ? firebase.data.usernames : {}
    const usernames = Object.keys(usernamesData).filter(user => !!usernamesData[user])

    return { usernames }
  })
)(Dashboard)

export default ConnectedDashboard
