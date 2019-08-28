import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ProjectServices from '../services/project.services'
import ChartTrends from './Chart-trends'
import BarChart from './Chart-bar'
import Map from './Map'
import Button from './Button'
import '../styles/button.css'
// import { threadId } from 'worker_threads';


class ProjectDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {project: {}, disabledButton: false, params:this.props.match.params, comment: '' }
        this.service = new ProjectServices()
    }

    componentDidMount() {
      
        this.service.getOneProject(this.props.match.params.id)
            .then(response => {
                response.data.map(elm => elm != null ? this.setState({ project: elm }) : null)
                console.log(this.state)
            })
            .catch(err => console.log('err', err))
    }

    like = () => {
        this.service.likeOneProject(this.state.project)
        .then(() => this.props.match.params === this.state.params ? this.setState({disabledButton: true}) : null)
    }

    handleFormChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.service.commentOneProject(this.state)
        .then(() => null)
        .catch(err => console.log(err))
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
                            <Link className="button" to="/projects">Volver</Link>
                        </div>
                    </div>
                </article>
                {this.state.project.trendsArray ? <ChartTrends info ={this.state.project.trendsArray}/> : null}
                {this.state.project.placesArray ? <Map places = {this.state.project.placesArray}/> : null}
                {this.state.project.tweetsArray ? <BarChart info = {this.state.project.tweetsArray}/> : null}
                <div className = "row">
                    {console.log(this.state.project.coments)}
                    {/* {this.state.project.coments.map(comment => <p>{comment}</p>)}  */}
                </div>
                <form onSubmit = {this.handleFormSubmit}>
                    <label for="comment-input">Comment</label>
                        <input type="textarea" name ="comment" class = "form-control" id = "comment-input" onChange = {this.handleFormChange}/>
                        <input type="submit" value="comment" />
                </form>
                <button onClick = {this.like} > Like </button>
            </div>
        )
    }

}

export default ProjectDetails
