import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../../styles/profile.css'

import ProfileServices from '../../services/profile.services'

class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            imageUrl: ''
        }
        this.profileServices = new ProfileServices()
    }

handleFileUpload = e => {

    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    console.log(uploadData)
    console.log(e.target.files[0])
    this.profileServices.handleUpload(uploadData)
    //this.profileServices.handleUpload(uploadData, this.props.userInSession.data._id)
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
</>
}
}

export default Profile