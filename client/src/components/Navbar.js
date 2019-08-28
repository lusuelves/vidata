import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import '../styles/navbar.scss'
import AuthServices from '../services/auth.services'
import {Container, Row, Col} from 'react-bootstrap'
import Login from './auth/login'
import Signup from './auth/signup'
import TrendsForm from './Project-trends-form'
import {Modal} from 'react-bootstrap'

class NavBar extends Component {

    constructor(props) {
        super(props)
        this.authServices = new AuthServices()
        this.state = {dropdownOpen: false, showModalLogin: false, showModalSignup: false, showModalTrends: false}
        this.toggle = this.toggle.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    handleModalOpenLogin = () => this.setState({ showModalLogin: true })
    handleModalCloseLogin = () => this.setState({ showModalLogin: false })

    handleModalOpenTrends = () => this.setState({ showModalTrends: true, dropdownOpen: false })


    handleModalCloseTrends = () => this.setState({ showModalTrends: false })

    handleModalOpenSignup = () => this.setState({ showModalSignup: true })
    handleModalCloseSignup = () => this.setState({ showModalSignup: false })

    toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }))
      }
    
      onMouseEnter() {
        this.setState({dropdownOpen: true});
      }
    
      onMouseLeave() {
        this.setState({dropdownOpen: false});
      }
    toggleMenu = () => document.querySelector('.menu').classList.toggle('abierto')

    logout = () => {
        this.authServices.logout()
            .then(x => {
                this.props.setUser(null)
            })
            .catch(err => console.log(err))
    }


    render() {

    const saludo = this.props.userInSession ? this.props.userInSession.data.username : 'invitado'
    // return (
                //     <>
                //         <div className="toggle-menu" onClick={this.toggleMenu}>&equiv; </div>
                //         <header className="menu">
                //             <h1>Vidata</h1>
                //             <nav>
                //                 <ul>
                //                     <li><Link to="/">Inicio</Link></li>
                //                     <li><Link to="/profile">Perfil</Link></li>
                //                     <li><Link to="/projects">Proyectos</Link></li>
                //                     <li><Link to="/login">Inicio de sesión</Link></li>
                //                     <li><Link to="/signup">Registrate</Link></li>
                //                     <li><div onClick={this.logout}>Cerrar sesión</div></li>
                //                     <li><small>Bienvenid@ </small></li>
                //                 </ul>
                //             </nav>
                //         </header>
                //     </>
                // )

        if (this.props.userInSession) {
            return (
                <>
                    <div className="toggle-menu" onClick={this.toggleMenu}>&equiv; </div>
                    <header className="menu">
                        <nav className = "navbar">
                                <Dropdown className="d-inline-block" onMouseOver={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onClick = {this.onMouseLeave} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                        <Container className = "barra">
                                            <Row className = "barra justify-content-md-center">
                                                <Col  md = {3} className = " barra justify-content-md-center" style = {{borderTop: 0}}>
                                                    <Link to = "/" className = "nav-btn">Vidata</Link>                                              
                                                </Col>
                                                <Col  md = {3} className = "barra">
                                                    <Link to="/projectsAll" className = "nav-btn">Visualizaciones</Link>
                                                </Col>
                                                <Col  md = {3} className = "barra">
                                                    <Link to="/profile" userInSession = {this.props.userInSession} className = "nav-btn">Perfil</Link>
                                                </Col>
                                                <Col  md = {3} style = {{border:0}} className = "barra">
                                                     <DropdownToggle className ="boton-raro" >
                                                    </DropdownToggle>
                                                    <Link className = "nav-btn" onClick={this.logout}>Cerrar sesión</Link>  
                                                </Col>
                                            </Row>
                                        </Container>
                                    <DropdownMenu className= "dropdown-menu" style = {{marginRight: 20}}>
                                        <Container>
                                            <Row>
                                                <Col md = {3}>
                                                hola
                                                </Col>
                                                <Col  md = {3}>
                                                    <DropdownItem disabled  style = {{color: 'black'}}>Topics</DropdownItem>
                                                    <DropdownItem divider />
                                                    <DropdownItem className = "nav-button"><Link to={`/projects/${'Politics'}`} className = "nav-btn" >Politics</Link></DropdownItem>
                                                    <DropdownItem className = "nav-button"><Link to={`/projects/${'Sports'}`} className = "nav-btn" >Sports</Link></DropdownItem>                                                    
                                                    <DropdownItem className = "nav-button"><Link to={`/projects/${'Culture'}`} className = "nav-btn" >Culture</Link></DropdownItem>                                                    
                                                    <DropdownItem className = "nav-button"><Link to={`/projects/${'Moral'}`} className = "nav-btn" >Moral</Link></DropdownItem>                                                    
                                                    <DropdownItem className = "nav-button"><Link to={`/projects/${'Knowledge'}`} className = "nav-btn" >Knowledge</Link></DropdownItem>                                                    
                                                    <DropdownItem className = "nav-button"><Link to={`/projects/${'Other'}`} className = "nav-btn" >Other</Link></DropdownItem>                                                    
                                                </Col>
                                                <Col  md = {3}>
                                                    <DropdownItem disabled style = {{color: 'black'}}>Options</DropdownItem>
                                                    <DropdownItem divider style = {{color: 'black'}} />
                                                    <DropdownItem className = "nav-button">
                                                        <Link to = "/trends-form"className = "nav-btn">Crear trends</Link>
                                                    </DropdownItem>        
                                                    <DropdownItem className = "nav-button"><Link className = "nav-btn">Crear words</Link></DropdownItem>
                                                    <DropdownItem className = "nav-button"><Link className = "nav-btn">Crear User</Link></DropdownItem>   
                                                    <DropdownItem className = "nav-button"><Link className = "nav-btn">Explore</Link></DropdownItem>           
                                                </Col>
                                                <Col  md = {3} style = {{borderRight: 0}}>
                                                
                                                </Col>
                                            </Row>
                                        </Container>
                                    </DropdownMenu>
                        </Dropdown>
                        </nav>
                    </header>
                </>
            )
        } else {
            return (
                <>
                    <div className="toggle-menu" onClick={this.toggleMenu}>&equiv; </div>
                    <header className="menu">
                        <h1>Vidata</h1>
                        <nav>
                            <ul>
                                <li><Link to="/">Inicio</Link></li>
                                <li><Link to="/profile">Perfil</Link></li>
                                <li><Link to="/projectsAll">Visualizaciones</Link></li>
                                <Modal show={this.state.showModalLogin} onHide={this.handleModalCloseLogin}>

                                    <Modal.Body>
                                        <Login setUser = {this.props.setUser} closeModalLogin={this.handleModalCloseLogin} />
                                    </Modal.Body>

                                </Modal>
                                <button className="btn btn-dark btn-big" onClick={this.handleModalOpenLogin}>Login</button>
                                <Modal show={this.state.showModalSignup} onHide={this.handleModalCloseSignup}>

                                    <Modal.Body>
                                        <Signup closeModalSignup={this.handleModalCloseSignup} />
                                    </Modal.Body>

                                </Modal>
                                <button className="btn btn-dark btn-big" onClick={this.handleModalOpenSignup}>SignUp</button>
                                <li><small>Bienvenid@, {saludo}</small></li>
                            </ul>
                        </nav>
                    </header>
                </>
            )
        }

     }
}
export default NavBar