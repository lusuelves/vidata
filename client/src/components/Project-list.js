import React, { Component } from 'react'
import ProjectServices from '../services/project.services'
import { Link } from 'react-router-dom'


import ProjectCard from './Project-card'
//import CoasterForm from './Coaster-form'

//import Dialog from '@material-ui/core/Dialog';


class ProjectList extends Component {

    constructor() {
        super()
        this.state = { projects: [], showModal: false }
        this.services = new ProjectServices()
    }

    componentDidMount = () => this.updateList()

    updateList = () => {
        this.services.getProjects()
            .then(response => {
                this.setState({ projects: response.data })
                console.log(this.state.projects)
            })
            .catch(err => console.log(err))
    }

    // handleModalOpen = () => this.setState({ showModal: true })
    // handleModalClose = () => this.setState({ showModal: false })


    render() {

        return (
            <>
                <div className="container">

                    {/* <Dialog onClose={this.handleModalClose} open={this.state.showModal} className="modal-form">
                        <CoasterForm closeModal={this.handleModalClose} updateCoasterList={this.updateList} />
                    </Dialog> */}

                    <h1>Listado de projectos de visualización de datos</h1>

                    {/* {this.props.userInSession && <button className="btn btn-dark btn-big" onClick={this.handleModalOpen}>Nueva montaña rusa</button>} */}

                    <div className="row coasters-list">

                        {/* {this.state.projects.map(coaster => <CoasterCard key={coaster._id} {...coaster} />)} */}
                        {/* {this.state.projects.map(project => <p key = {project._id}>{project.title}</p>)} */}
                        {this.state.projects.map(project => {
                            console.log(project)
                        return <ProjectCard key={project._id} {...project} />})}
                    </div>
                    <Link to = "/newProject"> New project </Link>
                </div>
            </>
        )
    }
}


export default ProjectList