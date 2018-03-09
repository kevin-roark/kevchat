import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import styled from 'react-emotion'
import { routePaths, getUserChatPath } from './constants'
import { store } from './redux'
import Home from './routes/home'
import ChatFrom from './routes/chatFrom'
import Dashboard from './routes/dashboard'

const Container = styled('div')`
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Container>
          <Route exact path={routePaths.home} component={Home} />

          <Route exact path={routePaths.chat} component={Home} />
          <Route path={getUserChatPath(':user')} component={ChatFrom} />

          <Route exact path={routePaths.dashboard} component={Dashboard} />
        </Container>
      </Router>
    </Provider>
  )
}

export default App
