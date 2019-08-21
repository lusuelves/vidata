import React, { Component } from 'react'
import ProjectServices from '../services/project.services'
import {VictoryScatter} from 'victory'
import ChartTrends from './Chart-trends'

class ProjectForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            topic: '',
            public: false,
            imageUrl: '',
            creatorId: ''
        }
        this.service = new ProjectServices()
    }


    handleChangeInput = e => {
        this.setState({ [e.target.name]: e.target.value, creatorId: this.props.userInSession.data._id})
    }
    
    handleFormSubmit = e => {
        e.preventDefault()
        this.service.postProject(this.state)
            .then(x => {
               window.location.assign('/projects')
            })
            .catch(err => console.log('error', err))
    }

    handledata = () => {
        let arr = [12,32,123,13,123,23,32]
        let lista = []
        arr.forEach((elm,idx) => lista.push({x:idx, y: idx+1, amount: elm, label: "first", fill: "blue", opacity: 0.1}))
        return lista
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
                                <label htmlFor="input-img">URL imagen</label>
                                <input name="imageUrl" type="text" className="form-control" id="input-img" onChange={this.handleChangeInput} />
                            </div>
                            <button type="submit" className="btn btn-primary">Crear Proyecto</button>
                        </form>
                    </div>
                    {/* <VictoryScatter
                        style={{ 
                            data: { fill: (d) => d.fill, 
                                    opacity: (d) => d.opacity
                            }
                        }}
                        bubbleProperty="amount"
                        maxBubbleSize={25}
                        minBubbleSize={5}
                         // data={[
                        //     { x: 1, y: 2, amount: 30 },
                        //     { x: 2, y: 3, amount: 40 },
                        //     { x: 3, y: 5, amount: 25 },
                        //     { x: 4, y: 4, amount: 10 },
                        //     { x: 5, y: 7, amount: 45 }
                        // ]}
                        data = {this.handledata()}

                        /> */}
                        <ChartTrends info = {this.state.trendsArray} />
                    {/* </VictoryScatter> */}
                </div>
            </div>
        )
    }

}

export default ProjectForm