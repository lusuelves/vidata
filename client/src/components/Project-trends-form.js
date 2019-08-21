import React, { Component } from 'react'
import ProjectTrendsServices from '../services/project.services'
import ChartTrends from './Chart-trends'

class ProjectTrendsForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            topic: '',
            public: false,
            imageUrl: '',
            creatorId: '',
            trendsArray: [0],
            place: '' 
        }
        this.service = new ProjectTrendsServices()
    }


    handleChangeInput = e => {
        this.setState({ [e.target.name]: e.target.value, creatorId: this.props.userInSession.data._id })
    }

    handleFormSubmit = e => {
        e.preventDefault()
        this.service.postProjectTrends(this.state)
        
            .then(x => {
                let lista = []
                x.data.trendsArray.forEach((elm,idx) => lista.push({x:idx, y: idx+1, amount: elm[1], label: elm[0], fill: "blue", opacity: 0.1}))
                this.setState({trendsArray: lista})
               //window.location.assign('/projects')
            })
            .then(x => this.service.updatePostTrends(this.state))
                    .then(x => this.setState({
                    title: '',
                    description: '',
                    topic: '',
                    public: false,
                    imageUrl: '',
                    creatorId: '',
                    place: '' 
                }))
            .catch(err => console.log('error', err))
    }

    render() {
        return (
            <div className="container">

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
                            <div className="form-group">
                                <label htmlFor="input-img">URL imagen</label>
                                <input name="imageUrl" type="text" className="form-control" id="input-img" onChange={this.handleChangeInput} />
                            </div>
                            <button type="submit" className="btn btn-primary">Crear Proyecto</button>
                        <ChartTrends info = {this.state.trendsArray} />
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

export default ProjectTrendsForm