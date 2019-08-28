import React, { Component } from 'react'
import ProjectUserServices from '../services/project.services'
import BarChart from './Chart-bar'

import '../styles/forms.css'

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
                                <label htmlFor="input-user">User</label>
                                <input name="user" type="text" className="form-control" id="input-user" onChange={this.handleChangeInput} />
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