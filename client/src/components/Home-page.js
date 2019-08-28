import React, { Component } from 'react'
import ProjectServices from '../services/project.services'
import {Carousel, Container, Col, Row} from 'react-bootstrap'
import ChartTrends from './Chart-trends'
import Map from './Map'
import BarChart from './Chart-bar'
import Button from './Button'
import { Link } from 'react-router-dom'
import '../styles/home-page.css'

class HomePage extends Component{
    constructor(){
        super()
        this.state = {
            projects: [[0], [1], [2]]
        }
        this.services = new ProjectServices()
    }

    componentDidMount = () => this.updateList()

    updateList = () => {
        this.props.function()
            .then(response => this.setState({ projects: response.data }))
            .catch(err => console.log(err))
    }

    render(){
        return <>
         <h1>Homepage</h1>
         <Carousel className ="caru">
         {this.state.projects[0].map((elm, idx) => {
            if(idx < 3) return    <Carousel.Item key = {idx} className = "caru">
                 <ChartTrends info = {elm.trendsArray}/>
                 <Carousel.Caption>
                 <h3>First slide label</h3>
                 <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                 </Carousel.Caption>
             </Carousel.Item>
         })}

         {this.state.projects[1].map((elm, idx) => {
            if(elm.placesArray && idx <3) return<Carousel.Item key = {idx} style = {{width: 600, height: 600}}>
                 <Map places = {elm.placesArray}/>
                 <Carousel.Caption>
                 <h3>First slide label</h3>
                 <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                 </Carousel.Caption>
             </Carousel.Item>
         })}

         {this.state.projects[2].map((elm, idx) => {
            if(elm.tweetsArray && idx < 3) return<Carousel.Item key = {idx}>
                <BarChart info = {elm.tweetsArray} />             
                 <Carousel.Caption>
                 <h3>First slide label</h3>
                 <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                 </Carousel.Caption>
             </Carousel.Item>}
         )}

             </Carousel>
        <Container style = {{marginTop: 100}}>
            <Row className = "justify-content-center">
                <Col md = {3} className = "home-page-button">
                    <Link className = "home-page-button" to={`/projects/${'Politics'}`} className = "nav-btn" >Politics</Link>
                </Col>
                <Col md = {3} className = "home-page-button">
                     <Link to={`/projects/${'Sports'}`} className = "nav-btn" >Sports</Link>             
                </Col>
                <Col md = {3} className = "home-page-button">
                   <Link to={`/projects/${'Culture'}`} className = "nav-btn" >Culture</Link>                     
                </Col>
            </Row>
            <Row className = "justify-content-center">
                <Col md = {3}  className = "home-page-button">
                  <Link to={`/projects/${'Moral'}`} className = "nav-btn" >Moral</Link>
                </Col>
                <Col md = {3}  className = "home-page-button">
                    <Link to={`/projects/${'Knowledge'}`} className = "nav-btn" >Knowledge</Link>                
                </Col>
                <Col md = {3}  className = "home-page-button">
                   <Link to={`/projects/${'Other'}`} className = "nav-btn" >Other</Link>                 
                </Col>
            </Row>
        </Container>
        </>

    }
}

export default HomePage