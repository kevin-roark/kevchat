import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './redux'
import Home from './components/home'
import Chat from './components/chat'
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/chat" component={Home} />
          <Route path='/chat/:user' component={Chat} />
        </div>
      </Router>
    </Provider>
  )
}

export default App
