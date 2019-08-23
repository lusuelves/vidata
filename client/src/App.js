import React, {Component}  from 'react'
import './App.css'
import { Switch, Route } from 'react-router-dom'

import AuthServices from './services/auth.services'

import ProjectsList from './components/Project-list'
import ProjectDetails from './components/Project-details'
import ProjectForm from './components/Project-form'
import ProjectTrendsForm from './components/Project-trends-form'
import ProjectWordsForm from './components/Project-words-form'
import NavBar from './components/Navbar'
import Signup from './components/auth/signup'
import Login from './components/auth/login'
import MyProfile from './components/auth/profile'

class App extends Component {

  constructor() {
    super()
    this.state = { loggedInUser: null }
    this.authServices = new AuthServices()
  }

  setTheUser = user => {
    this.setState({ loggedInUser: user })
    console.log("Un componente ha cambiado el usuario en App:", this.state.loggedInUser)
  }

  fetchUser = () => {
    if (this.state.loggedInUser === null) {
      this.authServices.loggedin()
        .then(response => this.setState({ loggedInUser: response }))
        .catch(x => this.setState({ loggedInUser: false }))
    }
  }

  render() {

    this.fetchUser()

    if (this.state.loggedInUser) {
      return (
        <>
          <NavBar setUser={this.setTheUser} userInSession={this.state.loggedInUser} />

          <Switch>
            {/* <ProtectedRoute path='/profile' user={this.state.loggedInUser} component={Profile} /> */}
            <Route path='/profile' exact render={() => <MyProfile userInSession = {this.state.loggedInUser}/>} />
            <Route path="/projects" exact render={() => <ProjectsList userInSession={this.state.loggedInUser} />} />
            <Route path="/projects/:id" exact component={ProjectDetails} />
            <Route path="/form" exact render={() => <ProjectForm userInSession={this.state.loggedInUser} />} />
            <Route path="/trends-form" exact render={() => <ProjectTrendsForm userInSession={this.state.loggedInUser} />} />
            <Route path="/words-form" exact render={() => <ProjectWordsForm userInSession={this.state.loggedInUser} />} />
          </Switch>
        </>
      );
    } else {
      return (
        <>
          <NavBar setUser={this.setTheUser} userInSession={this.state.loggedInUser} />

          <Switch>
            {/* <ProtectedRoute path='/profile' user={this.state.loggedInUser} component={Profile} /> */}
            <Route path="/projects" exact render={() => <ProjectsList userInSession={this.state.loggedInUser} />} />
            <Route path="/projects/:id" exact component={ProjectDetails} />
            <Route path="/signup" exact render={match => <Signup {...match} setUser={this.setTheUser} />} />
            <Route path="/login" exact render={match => <Login {...match} setUser={this.setTheUser} />} />
          </Switch>
        </>
      );
    }
  }
}

export default App