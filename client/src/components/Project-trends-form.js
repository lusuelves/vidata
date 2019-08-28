import React, { Component } from 'react'
import ProjectTrendsServices from '../services/project.services'
import ChartTrends from './Chart-trends'

import '../styles/forms.css'
class ProjectTrendsForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            topic: '',
            public: false,
            creatorId: '',
            trendsArray: [0],
            place: '',
            showModalTrends: false 
        }
        this.service = new ProjectTrendsServices()
    }

   
    handleChangeInput = e => {
        this.setState({ [e.target.name]: e.target.value, creatorId: this.props.userInSession.data._id })
    }

    handleFormSubmit = e => {
        e.preventDefault()
        this.service.postProjectTrends(this.state)
        .then(response => {
            this.setState({trendsArray: response.data.trendsArray})})
        .then(() => this.props.closeModalTrends())
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="container form-body">
                <h1>Nuevo proyecto</h1>

                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form onSubmit={this.handleFormSubmit}>
                            <div className="form-group">
                                <label htmlFor="input-nombre">Nombre</label>
                                <input name="title" type="text" className="form-control" id="input-nombre" onChange={this.handleChangeInput} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="input-descripcion">Descripción</label>
                                <input name="description" type="text" className="form-control" id="input-descripcion" onChange={this.handleChangeInput} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="input-topic">Topic</label>
                                <input name="topic" type="text" className="form-control" id="input-topic" onChange={this.handleChangeInput} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="place-topic">Place</label>
                                <input name="place" type="text" className="form-control" id="place-topic" onChange={this.handleChangeInput} />
                            </div>
                            <div class="form-group">
                                <label for="topic">Topic:</label>
                                <select name="topic" className="form-control" id="topic">
                                    <option>Seleccionar</option>
                                    <option value='Culture'>Culture</option>
                                    <option value='Knowledge'>Knowledge</option>
                                    <option value='Politics/Economics'>Politics/Economics</option>
                                    <option value='Moral'>Moral</option>
                                    <option value='Sports'>Sports</option>
                                    <option value='Other'>Other</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Crear Proyecto</button>
                            <button className="btn btn-dark btn-sm" onClick={this.props.closeModalTrends}>Cerrar</button>
                        <ChartTrends info = {this.state.trendsArray} />
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

export default ProjectTrendsForm