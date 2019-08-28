import React, { Component } from 'react'
import AuthServices from '../../services/auth.services'

class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            profilePic: '',
            posts: [],
            postsTopics: [],
            showModalSignup: false
        }
        this.authServices = new AuthServices()
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {
        e.preventDefault()
        const { username, password } = this.state
        this.authServices.signup(username, password)
            .then(theNewUser => {
                this.setState({
                    username: '',
                    password: '',
                    profilePic: '',
                    posts: [],
                    postsTopics: []
                })
                this.props.setUser(theNewUser)
                this.props.history.push('/projects')
            })
            .then(() => this.props.closeModalSignup())
            .catch(err => console.log(err))
    }

    render() {

        return (
            <div className="container">
                <h1>Registro de usuario</h1>
                <form onSubmit={this.handleFormSubmit}>
                    Usuario: <input name="username" type="text" value={this.state.username} onChange={this.handleInputChange} /> <br></br>
                    Contraseña: <input name="password" type="password" value={this.state.password} onChange={this.handleInputChange} /> <br></br>

                    <input type="submit" value="Registrar" />
                </form>
            </div>

        )
    }
}

export default Signup
