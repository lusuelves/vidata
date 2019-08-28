import React, { Component } from 'react'
import ProjectServices from '../services/project.services'
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap'

import ProjectCard from './Project-card'
import ProjectTrendsForm from './Project-trends-form'

import '../styles/button.css'
import '../styles/projects-list.css'


class ProjectList extends Component {

    constructor(props) {
        super(props)
        this.state = {projects: [[0], [1], [2]], showModalTrends: false, params:this.props.url  }
        this.services = new ProjectServices()
    }

    componentDidMount = () => this.updateList();
    componentDidUpdate = () => this.state.params !== this.props.match.url && this.updateList();
    
    updateList = (x) => {
       const { url } = this.props.match
       this.props.match.params ? this.props.function(this.props.match.params.topic)
            .then(response => this.setState({ projects: response.data, params:url }))
            .catch(err => console.log(err))
            
            : this.props.function()
            .then(response => this.setState({ projects: response.data, params:url }))
            .catch(err => console.log(err))
    }

    handleModalOpenTrends = () => this.setState({ showModalTrends: true })
    handleModalCloseTrends = () => this.setState({ showModalTrends: false })

    render() {

        return (
            <>
                <div className="container project-list-body">
                <div className = 'row'>
                <Modal show={this.state.showModalTrends} onHide={this.handleModalCloseTrends}>

                    <Modal.Body>
                        <ProjectTrendsForm closeModalTrends={this.handleModalCloseTrends} userInSession = {this.props.userInSession}/>
                    </Modal.Body>

                </Modal>

                    {this.props.userInSession && <button className="button" onClick={this.handleModalOpenTrends}>Nueva trends project</button>} 
                    </div>
                    <div className = 'row'>
                    
                        <h1 >Listado de projectos de visualización de datos</h1>

                    </div>

                    <div className="row project-list-row justify-content-center">
                        {(this.state.projects[0] !== undefined) ? this.state.projects[0].map(project => <ProjectCard key={project._id} {...project} />) : this.state.projects.map(project => <ProjectCard key={project._id} {...project} />)}
                        {(this.state.projects[1] !== undefined) ? this.state.projects[1].map(project => <ProjectCard key={project._id} {...project} />) : this.state.projects.map(project => <ProjectCard key={project._id} {...project} />)}
                        {(this.state.projects[2] !== undefined) ? this.state.projects[2].map(project => <ProjectCard key={project._id} {...project} />) : this.state.projects.map(project => <ProjectCard key={project._id} {...project} />)}
                    </div>
                    <Link to="/newProject"> New project </Link>
                </div>
            </>
        )
    }
}


export default ProjectList