import React, { Component } from 'react'
import ProjectServices from '../services/project.services'
import { Link } from 'react-router-dom'

import { Modal, Toast } from 'react-bootstrap'
import ProjectCard from './Project-card'
import ProjectTrendsForm from './Project-trends-form'

//import Dialog from '@material-ui/core/Dialog';


class ProjectList extends Component {

    constructor(props) {
        super(props)
        this.state = {projects: [], showModalTrends: false, param:'out' }
        this.services = new ProjectServices()
    }

    componentDidMount = () => this.updateList()

    updateList = (x) => {
      //  this.services.getProjects()
       this.props.function(this.state.param)
            .then(response => {
                console.log(response.data)
                this.setState({ projects: response.data })
                console.log(this.state.projects)
            })
            .catch(err => console.log(err))
    }

    changeParam = (x) => this.setState({param: x})

    handleModalOpenTrends = () => this.setState({ showModalTrends: true })
    handleModalCloseTrends = () => this.setState({ showModalTrends: false })


    render() {

        return (
            <>
                <div className="container">

                <Modal show={this.state.showModalTrends} onHide={this.handleModalCloseTrends}>

                    <Modal.Body>
                        <ProjectTrendsForm closeModalTrends={this.handleModalCloseTrends} userInSession = {this.props.userInSession}/>
                    </Modal.Body>

                </Modal>

                    <h1>Listado de projectos de visualización de datos</h1>

                    {this.props.userInSession && <button className="btn btn-dark btn-big" onClick={this.handleModalOpenTrends}>Nueva trends project</button>} 

                    <div className="row">

                        {/* {this.state.projects.map(coaster => <CoasterCard key={coaster._id} {...coaster} />)} */}
                        {/* {this.state.projects.map(project => <p key = {project._id}>{project.title}</p>)} */}
                        {this.state.projects.map(project => <ProjectCard key={project._id} {...project} />)}
                    </div>
                    <Link to = "/newProject"> New project </Link>
                    <Link to = "/by-topic"> See by trends </Link>
                </div>
            </>
        )
    }
}


export default ProjectList