import React, { Component } from 'react'
import ProjectUserServices from '../services/project.services'
import BarChart from './Chart-bar'

class ProjectUserForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            topic: '',
            public: false,
            creatorId: '',
            tweetsArray: [0],
            user: '' ,
            showModalUser: false
        }
        this.service = new ProjectUserServices()
    }


    handleChangeInput = e => {
        this.setState({ [e.target.name]: e.target.value, creatorId: this.props.userInSession.data._id })
    }

    handleFormSubmit = e => {
        e.preventDefault()
        this.service.postProjectUser(this.state)
        .then(response => this.setState({tweetsArray: response.data[1].tweetsArray}))
        .then(()=> this.props.closeModalUser())
        .catch(err => console.log(err))
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
                                <label htmlFor="user-topic">User</label>
                                <input name="user" type="text" className="form-control" id="user-topic" onChange={this.handleChangeInput} />
                            </div>
                            <button type="submit" className="btn btn-primary">Crear Proyecto</button>
                            <button className="btn btn-dark btn-sm" onClick={this.props.closeModalUser}>Cerrar</button>
                        <BarChart info = {this.state.tweetsArray} />
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

export default ProjectUserForm