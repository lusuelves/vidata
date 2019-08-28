import React, { Component }  from 'react'

class ProfilePic extends Component{
    constructor(props){
        super(props)
        this.state = {
            showModalProfilePic: false
        }
    }

    handleFileUpload = e => {

        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);
        this.profileServices.handleUpload(uploadData)
            .then(response => this.setState({ imageUrl: response.data.secure_url }))
            .then(()=> this.props.closeModalProfilePic())
            .catch(err => console.log(err))
    }
    
    // handleFormSubmit = (e) =>{
    //     e.preventDefault()
    // }

    render() {
        return <form>
                    <div className="form-group">
                        <label htmlFor="input-img">URL imagen</label>
                        <input name="imageUrl" type="file" className="btn-profile input-image" id="input-img" onChange={this.handleFileUpload} />
                    <button type="submit" className="btn-profile btn-profile input-image">Subir foto</button>
                    </div>
                </form>
    }
}

export default ProfilePic