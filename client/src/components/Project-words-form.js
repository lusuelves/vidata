import React, { Component } from 'react'
import ProjectWordsServices from '../services/project.services'
import Map from './Map'
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
                console.log(x.data)
                x.data.placesArray.forEach(elm => {
                axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${elm}&key=AIzaSyAQn79ofulVcJxbKOb1tGmPG6GuA7bPojM`) 
                .then(response => {
                //console.log(response.data.results[0].address_components[0].short_name)
                if(response.data.results[0]!=undefined){
                lat = response.data.results[0].geometry.location.lat
                lng = response.data.results[0].geometry.location.lng 
                coords.push({lat, lng})}
                }).then(() => this.setState({placesArray: coords}))
                })
                this.setState({
                    textsArray: x.data.textsArray,
                    // placesArray: x.data.placesArray,
                    likessArray: x.data.likesArray,
                    retweetsArray: x.data.retweetsArray
                })
               //window.location.assign('/projects')
            })
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
                                <label htmlFor="input-topic">Topic</label>
                                <input name="topic" type="text" className="form-control" id="input-topic" onChange={this.handleChangeInput} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="word-topic">Word</label>
                                <input name="word" type="text" className="form-control" id="word-topic" onChange={this.handleChangeInput} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="input-img">URL imagen</label>
                                <input name="imageUrl" type="text" className="form-control" id="input-img" onChange={this.handleChangeInput} />
                            </div>
                            <button type="submit" className="btn btn-primary">Crear Proyecto</button>
                        {/* <ChartTrends info = {this.state.trendsArray} /> */}
                        </form>
                    </div>
                </div>
                    <Map places = {this.state.placesArray}/>
            </div>
        )
    }

}

export default ProjectWordsForm