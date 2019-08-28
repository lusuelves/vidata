import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Modal, Toast } from 'react-bootstrap'
import ProjectTrendsForm from '../Project-trends-form'
import ProjectWordsForm from '../Project-words-form'
import ProjectUserForm from '../Project-user-form'
import ProfilePic from './Profile-picture'
import ProjectCard from '../Project-card'
import ByTopic from '../By-topic'
import {Container, Row, Col} from 'react-bootstrap'
import Button from '../Button'
import '../../styles/profile.css'

import ProfileServices from '../../services/profile.services'
import ProjectServices from '../../services/project.services'

class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            imageUrl: '', projects: [[0]], showModalTrends: false, showModalWords: false, showModalUser: false, showModalProfilePic: false
        }
        this.profileServices = new ProfileServices()
        this.projectServices = new ProjectServices()
    }

componentDidMount = () => this.updateList()

updateList = (x) => {
    this.projectServices.myProjects()
        .then(response => this.setState({ projects: response.data}))
        .catch(err => console.log(err))
 }

handleModalOpenTrends = () => this.setState({ showModalTrends: true })
handleModalCloseTrends = () => this.setState({ showModalTrends: false })

handleModalOpenWords = () => this.setState({ showModalWords: true })
handleModalCloseWords = () => this.setState({ showModalWords: false })

handleModalOpenUser = () => this.setState({ showModalUser: true })
handleModalCloseUser = () => this.setState({ showModalUser: false })

handleModalOpenProfilePic = () => this.setState({ showModalProfilePic: true })
handleModalCloseProfilePic = () => this.setState({ showModalProfilePic: false })

render(){
    return <>
    <div>Soy tu perfil</div>
    <hr></hr>
<Container className ="profile-body" style = {{marginBottom: 100}}>
    <Row className = "justify-content-center" style = {{height: 50}}>
        <Col md = {3} className = "profile-row-y">
            <Link to = ""><Button button = "Explore topics"></Button></Link>
        </Col>
        <Col md = {3}>
        </Col>
        <Col md = {3}>
            <Link to = ""><Button button = "Explore people"></Button></Link>
        </Col>
        <Col md = {3}>
        </Col>
    </Row>
    <Row className = "profile-row">
        <Col md = {3}>

            <Modal show={this.state.showModalTrends} onHide={this.handleModalCloseTrends}>

            <Modal.Body>
                <ProjectTrendsForm closeModal={this.handleModalCloseTrends} userInSession = {this.props.userInSession}/>
            </Modal.Body>

            </Modal>

            {this.props.userInSession && <button className="btn-profile" onClick={this.handleModalOpenTrends}>Nueva trends project</button>} 
        
        </Col>
        <Col md = {3}>
            <Modal show={this.state.showModalWords} onHide={this.handleModalCloseWords}>

            <Modal.Body>
                <ProjectWordsForm closeModal={this.handleModalCloseWords} userInSession = {this.props.userInSession} />
            </Modal.Body>

            </Modal>

            {this.props.userInSession && <button className="btn-profile" onClick={this.handleModalOpenWords}>Nueva Words project</button>} 
        </Col>
        <Col md = {3}>
            <Modal show={this.state.showModalUser} onHide={this.handleModalCloseUser}>

            <Modal.Body>
                <ProjectUserForm closeModal={this.handleModalCloseUser} userInSession = {this.props.userInSession}/>
            </Modal.Body>

            </Modal>

            {this.props.userInSession && <button className="btn-profile" onClick={this.handleModalOpenUser}>Nueva User project</button>} 
        </Col >
        <Col md = {3} className = 'align-items-center'>
            <Modal show={this.state.showModalProfilePic} onHide={this.handleModalCloseProfilePic}>

                <Modal.Body>
                    <ProfilePic closeModalProfilePic={this.handleModalCloseProfilePic} />
                </Modal.Body>

            </Modal>

            {this.props.userInSession && <button className="btn-profile" onClick={this.handleModalOpenProfilePic}> <img src = {this.props.userInSession.data.profilePic} /></button>} 
           
        </Col>
    </Row>
</Container>

<Container>
    <Row className = "justify-content-center">
        {(this.state.projects[0].length !== undefined) ? this.state.projects[0].map(project => <ProjectCard key={project._id} {...project} />) : this.state.projects.map(project => <ProjectCard key={project._id} {...project} />)}
        {(this.state.projects[1] !== undefined) ? this.state.projects[1].map(project => <ProjectCard key={project._id} {...project} />) : this.state.projects.map(project => <ProjectCard key={project._id} {...project} />)}
        {(this.state.projects[2] !== undefined) ? this.state.projects[2].map(project => <ProjectCard key={project._id} {...project} />) : this.state.projects.map(project => <ProjectCard key={project._id} {...project} />)}
    </Row>
</Container>

<hr></hr>

    <ByTopic topic = 'baby'/>

</>
}
}

export default Profile