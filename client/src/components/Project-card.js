import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import ChartTrends from './Chart-trends'
import Map from './Map'
import BarChart from './Chart-bar';


import {MDBView, MDBMask, MDBContainer, MDBRow, MDBCol } from 'mdbreact'

import '../styles/button.css'


class ProjectCard extends Component {
    constructor(props){
        super(props)
    }

    render(){
    return (
    <Link className="button" to={`/project/${this.props._id}`}>
        <MDBContainer style = {{width: 480, height: 723}}>
            <MDBRow style = {{width: 480, height: 723}}>
                <MDBCol style = {{width: 480, height: 723}}>
                    <MDBView hover style = {{width: 400, height: 400, padding: 10}} >
                        {this.props.trendsArray ? <ChartTrends info = {this.props.trendsArray}/> : null}
                        {this.props.placesArray ? <Map places = {this.props.placesArray}/> : null}
                        {this.props.tweetsArray ? <BarChart info = {this.props.tweetsArray}/> : null}
                        <MDBMask className="flex-center" overlay="black-strong">
                            <article >
                                <h4 className="white-text">{this.props.title}</h4>
                                <h5 className="white-text">{this.props.topic}</h5>
                                <p className="white-text">{this.props.description}</p>
                                {/* <small>{creatorId._id}</small> */}
                            </article>
                        </MDBMask>
                    </MDBView>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
     </Link>
    )
    }
}

export default ProjectCard