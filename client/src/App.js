import React, {Component}  from 'react'
import './App.css'
import { Switch, Route } from 'react-router-dom'

import AuthServices from './services/auth.services'
import ProjectServices from './services/project.services'

import HomePage from './components/Home-page'
import ByTopic from './components/By-topic'
import ProjectsList from './components/Project-list'
import ProjectDetails from './components/Project-details'
import ProjectTrendsForm from './components/Project-trends-form'
import ProjectWordsForm from './components/Project-words-form'
import ProjectUserForm from './components/Project-user-form'
import NavBar from './components/Navbar'
import Signup from './components/auth/signup'
import Login from './components/auth/login'
import MyProfile from './components/auth/profile'

class App extends Component {

  constructor() {
    super()
    this.state = { loggedInUser: null, topic: '' }
    this.authServices = new AuthServices()
    this.projectServices = new ProjectServices()
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

  changeTopic = (x) => {
    this.setState({topic: x})
  }

  render() {

    this.fetchUser()

    if (this.state.loggedInUser) {
      return (
        <>
          <NavBar setUser={this.setTheUser} userInSession={this.state.loggedInUser} />

          <Switch>
            {/* <ProtectedRoute path='/profile' user={this.state.loggedInUser} component={Profile} /> */}
            <Route path = '/' exact render = {() => <HomePage userInSession  = {this.state.loggedInUser}  function = {() => this.projectServices.getProjects()}/> } />
            <Route path='/profile' exact render={() => <MyProfile userInSession = {this.state.loggedInUser}/>} />
            <Route path="/projectsAll" exact render={(match) => <ProjectsList {...match} function = {() => this.projectServices.getProjects()} userInSession={this.state.loggedInUser} />} />
            <Route path="/projects/:topic" exact render={(match) => <ProjectsList {...match} function = {(x) => this.projectServices.getProjectsTopic(x)} userInSession={this.state.loggedInUser} />} />            
            <Route path="/project/:id" exact component = {ProjectDetails} />
            <Route path="/trends-form" exact render={() => <ProjectTrendsForm userInSession={this.state.loggedInUser} />} />
            <Route path="/words-form" exact render={() => <ProjectWordsForm userInSession={this.state.loggedInUser} />} />
            <Route path="/user-form" exact render={() => <ProjectUserForm userInSession={this.state.loggedInUser} />} />
            <Route path = "/by-topic" exact component = {ByTopic} />
          </Switch>
        </>
      );
    } else {
      return (
        <>
          <NavBar setUser={this.setTheUser} userInSession={this.state.loggedInUser} />

          <Switch>
            {/* <ProtectedRoute path='/profile' user={this.state.loggedInUser} component={Profile} /> */}
            <Route path="/projectsAll" exact render={(match) => <ProjectsList {...match} function = {() => this.projectServices.getProjects()} userInSession={this.state.loggedInUser} setUser = {this.setUser} />} />
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