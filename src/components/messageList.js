import React from 'react'
import styled from 'react-emotion'
import moment from 'moment'
import cx from 'classnames'
import { me } from '../constants'

const Container = styled('div')``

const MessageGroupList = styled('ol')`
  max-height: 600px;
  overflow-y: auto;

  @media (max-height: 800px) {
    max-height: calc(100vh - 200px);
  }
`

const MessageGroup = styled('li')`
  padding: 4px 4px 8px 4px;
  background-color: #fdd;

  &.me {
    background-color: #ddf;
  }
`

const MessageFrom = styled('div')`
  padding-left: 4px;
  font-weight: 500;
  font-size: 18px;
`

const Message = styled('li')`
  position: relative;
  padding: 10px 0;
  white-space: pre-line;
  transition: background-color 0.2s;

  & .when {
    position: absolute;
    top: 2px;
    right: 2px;
    font-size: 10px;
    color: #333;
    opacity: 0;
    transition: opacity 0.2s;
  }

  &:first-child .when {
    opacity: 1;
  }

  &:hover {
    background-color: #ff0;

    & .when {
      opacity: 1;
      color: #000;
    }
  }
`

const MessageText = styled('div')`
  padding: 0 8px;
  font-size: 16px;
  line-height: 1.4;
`

class MessageList extends React.Component {
  componentDidMount() {
    this.scrollToBottom() // start list at bottom!
  }

  componentDidUpdate(prevProps) {
    if (prevProps.messages.length !== this.props.messages.length) {
      this.scrollToBottom()
    }
  }

  scrollToBottom() {
    if (this.listEl) {
      const top = this.listEl.scrollHeight - this.listEl.clientHeight
      this.listEl.scrollTop = top
    }
  }

  getGroupedMessages() {
    const { messages } = this.props
    const processed = messages.map(m => ({ ...m, date: moment(m.date) }))

    const groupedMessages = []
    processed.forEach((message, idx) => {
      const prevMessage = idx === 0 ? null : processed[idx - 1]
      const newGroup = !prevMessage || prevMessage.from !== message.from
      if (newGroup) {
        groupedMessages.push({ from: message.from, messages: [message] })
      } else {
        groupedMessages[groupedMessages.length - 1].messages.push(message)
      }
    })

    return groupedMessages
  }

  render() {
    const groupedMessages = this.getGroupedMessages()

    return (
      <Container>
        <MessageGroupList
          innerRef={el => {
            this.listEl = el
          }}
        >
          {groupedMessages.map(({ from, messages }) => {
            const { id } = messages[0]
            const groupClass = cx({
              me: from === me
            })

            return (
              <MessageGroup key={id} className={groupClass}>
                <MessageFrom>{from}</MessageFrom>
                <ol>
                  {messages.map(({ id, text, date }) => {
                    return (
                      <Message key={id}>
                        <span className="when">{date.format('hh:mm A')}</span>
                        <MessageText>{text}</MessageText>
                      </Message>
                    )
                  })}
                </ol>
              </MessageGroup>
            )
          })}
        </MessageGroupList>
      </Container>
    )
  }
}

export default MessageList
