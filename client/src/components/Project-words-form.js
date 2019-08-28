import React, { Component } from 'react'
import ProjectWordsServices from '../services/project.services'
import Map from './Map'
import '../styles/forms.css'

const axios = require('axios')


class ProjectWordsForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            topic: '',
            public: false,
            creatorId: '',
            word: '',
            textsArray: '',
            placesArray: [],
            likessArray:'',
            retweetsArray: ''
        }
        this.service = new ProjectWordsServices()
    }


    handleChangeInput = e => {
        this.setState({ [e.target.name]: e.target.value, creatorId: this.props.userInSession.data._id })
    }

    handleFormSubmit = e => {
        e.preventDefault()
        let coords = []
        let lat 
        let lng
        this.service.postProjectWords(this.state)
            .then(x => {
                x.data.placesArray.forEach(elm => {
                axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${elm}&key=AIzaSyAQn79ofulVcJxbKOb1tGmPG6GuA7bPojM`) 
                .then(response => {
                if(response.data.results[0]!=undefined){
                lat = response.data.results[0].geometry.location.lat
                lng = response.data.results[0].geometry.location.lng 
                coords.push({lat, lng})}
                }).then(() => {
                    this.setState({placesArray: coords, showModalWords: false})
                    this.service.updateProjectWords({title: this.state.title, placesArray: coords})
                })
                })
                this.setState({
                    textsArray: x.data.textsArray,
                    likesArray: x.data.likesArray,
                    retweetsArray: x.data.retweetsArray
                        })
                })
                .then(() => this.props.closeModalWords())
                .then(x => this.setState({
                title: '',
                description: '',
                topic: '',
                public: false,
                creatorId: '',
                word: '',
                textsArray: '',
                placesArray: [],
                likessArray:'',
                retweetsArray: ''
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
                                <label htmlFor="input-word">Word</label>
                                <input name="word" type="text" className="form-control" id="input-word" onChange={this.handleChangeInput} />
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
                            <button className="btn btn-dark btn-sm" onClick={this.props.closeModalWords}>Cerrar</button>
                        </form>
                    </div>
                </div>
                    <Map places = {this.state.placesArray}/>
            </div>
        )
    }

}

export default ProjectWordsForm