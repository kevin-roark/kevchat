import React from 'react'
import styled from 'react-emotion'
import moment from 'moment'
import cx from 'classnames'
import { mobileBreakpoint, me } from '../constants'

const Container = styled('div')`
  max-height: 600px;

  @media(${mobileBreakpoint}) {
    max-height: none;
  }
`

const MessageGroup = styled('li')`
  padding: 4px 4px 8px 4px;
  background-color: #ddd;

  &.me {
    background-color: #ccc;
  }
`

const MessageFrom = styled('div')`
  font-weight: 500;
  font-size: 18px;
`

const Message = styled('li')`
  padding: 8px 0;
  position: relative;

  & .when {
    position: absolute;
    top: 2px;
    right: 2px;
    font-size: 10px;
    color: #333;
    opacity: 0;
    transition: opacity 0.2s, background-color 0.2s;
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

const MessageList = ({ messages }) => {
  const processed = messages.map(m => ({ ...m, date: moment(m.date) }))

  const groupedMessages = []
  processed.forEach((message, idx) => {
    const prevMessage = idx === 0 ? null : processed[idx - 1]
    const newGroup = !prevMessage || prevMessage.from !== message.from
    if (newGroup) {
      groupedMessages.push({ from: message.from,  messages: [message] })
    } else {
      groupedMessages[groupedMessages.length - 1].messages.push(message)
    }
  })

  return (
    <Container>
      <ol>
        {groupedMessages.map(({ from, messages }) => {
          const { id } = messages[0]
          const groupClass = cx({
            me: from === me,
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
      </ol>
    </Container>
  )
}

export default MessageList
