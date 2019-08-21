import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ProjectServices from '../services/project.services'
import ChartTrends from './Chart-trends'
// import '../styles/project-details.css'


class ProjectDetails extends Component {

    constructor(props) {
        super(props)
        this.state = { project: {} }
        this.service = new ProjectServices()
    }

    componentDidMount() {
        this.service.getOneProject(this.props.match.params.id)
            .then(response => {
                this.setState({ project: response.data })
                console.log(this.state)
            })
            .catch(err => console.log('err', err))
    }

    render() {
        return (
            <div className="container">
                <article className="coaster-detail">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <h1>Detalles de {this.state.project.title}</h1>
                            <p><strong>Descripción:</strong> {this.state.project.description}</p>
                            <hr></hr>
                            <p><small>Topic:</small> {this.state.project.topic}</p>
                            <Link className="btn btn-big btn-dark" to="/projects">Volver</Link>
                        </div>
                        <div className="col-md-4">
                            <img src={this.state.project.imageUrl} alt={this.state.project.title}></img>
                        </div>
                    </div>
                </article>
                    <ChartTrends info ={this.state.project.trendsArray}/>
            </div>
        )
    }

}

export default ProjectDetails
