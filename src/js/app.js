import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Index from './pages/index'
import Play from './pages/play'

class App extends Component {
  render () {
    return (
        <Router>
          <div>
            <Route exact path="/" component={Index} />
            <Route path="/play" component={Play} />
          </div>
        </Router>
    )
  }
}

export default App
