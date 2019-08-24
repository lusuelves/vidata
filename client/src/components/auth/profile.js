import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Modal, Toast } from 'react-bootstrap'
import ProjectTrendsForm from '../Project-trends-form'
import ProjectWordsForm from '../Project-words-form'
import ProjectUserForm from '../Project-user-form'

import '../../styles/profile.css'

import ProfileServices from '../../services/profile.services'

class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            imageUrl: '', showModalTrends: false, showModalWords: false, showModalUser: false
        }
        this.profileServices = new ProfileServices()
    }

handleModalOpenTrends = () => this.setState({ showModalTrends: true })
handleModalCloseTrends = () => this.setState({ showModalTrends: false })

handleModalOpenWords = () => this.setState({ showModalWords: true })
handleModalCloseWords = () => this.setState({ showModalWords: false })

handleModalOpenUser = () => this.setState({ showModalUser: true })
handleModalCloseUser = () => this.setState({ showModalUser: false })

handleFileUpload = e => {

    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    this.profileServices.handleUpload(uploadData)
        .then(response => this.setState({ imageUrl: response.data.secure_url }))
        .catch(err => console.log(err))
}

render(){
    return <>
    <div>Soy tu perfil</div>
    <img src = {this.props.userInSession.data.profilePic} />
    <form>
    <div className="form-group">
    <label htmlFor="input-img">URL imagen</label>
    <input name="imageUrl" type="file" className="form-control" id="input-img" onChange={this.handleFileUpload} />
    </div>
    <button type="submit" className="btn btn-dark btn-sm">Subir foto</button>
</form>

<Modal show={this.state.showModalTrends} onHide={this.handleModalCloseTrends}>

<Modal.Body>
    <ProjectTrendsForm closeModal={this.handleModalCloseTrends} userInSession = {this.props.userInSession}/>
</Modal.Body>

</Modal>

{this.props.userInSession && <button className="btn btn-dark btn-big" onClick={this.handleModalOpenTrends}>Nueva trends project</button>} 

<hr></hr>

<Modal show={this.state.showModalWords} onHide={this.handleModalCloseWords}>

<Modal.Body>
    <ProjectWordsForm closeModal={this.handleModalCloseWords} />
</Modal.Body>

</Modal>

{this.props.userInSession && <button className="btn btn-dark btn-big" onClick={this.handleModalOpenWords}>Nueva Words project</button>} 

<hr></hr>
<Modal show={this.state.showModalUser} onHide={this.handleModalCloseUser}>

<Modal.Body>
    <ProjectUserForm closeModal={this.handleModalCloseUser} />
</Modal.Body>

</Modal>

{this.props.userInSession && <button className="btn btn-dark btn-big" onClick={this.handleModalOpenUser}>Nueva User project</button>} 

<hr></hr>
    <Link to="/words-form">Create Words Project</Link><br></br><hr></hr>
    <Link to="/trends-form">Create trends Project</Link><br></br><hr></hr>
    <Link to="/user-form">Create user Project</Link><br></br><hr></hr>
</>
}
}

export default Profile